import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import userIcon from '../assets/profile_icon.svg';

const MyInfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user_info', {
          withCredentials: true, // 쿠키 포함
        });

        if (response.status === 200) {
          setUserInfo(response.data);
        } else if (response.status === 401) {
          alert('로그인이 필요합니다.');
          navigate('/login');
        } else {
          console.error('사용자 정보를 가져오지 못했습니다.');
          alert('사용자 정보를 가져오지 못했습니다.');
          navigate('/');
        }
      } catch (error) {
        if (error.response) {
          // 서버가 응답했지만 상태 코드가 2xx가 아닌 경우
          console.error('사용자 정보 요청 실패 상태: ', error.response.status);
          console.error('사용자 정보 요청 실패 응답 데이터: ', error.response.data);
          alert('사용자 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
        } else if (error.request) {
          // 서버에 요청했지만 응답이 없는 경우 (네트워크 문제)
          console.error('서버 응답 없음: ', error.request);
          alert('서버와의 연결에 문제가 발생했습니다. 네트워크를 확인하고 다시 시도해 주세요.');
        } else {
          // 기타 에러 (코드 오류 등)
          console.error('사용자 정보 요청 중 에러: ', error.message);
          alert('알 수 없는 문제가 발생했습니다. 다시 시도해 주세요.');
        }
        navigate('/'); // 에러 발생 시 홈으로 이동
      }
    };
    fetchUserInfo();
  }, [navigate]);

  /* 
    //테스트 코드   
    useEffect(() => {
    // 로그인 상태와 사용자 정보를 localStorage에서 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      alert('로그인이 필요합니다.');
      navigate('/login'); // 로그인 페이지로 리다이렉트
      return;
    } 
 
    // localStorage에서 사용자 정보 불러오기
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) 
      setUserInfo(JSON.parse(storedUserInfo)); // JSON 문자열을 객체로 변환하여 저장
    }
  }, [navigate]);*/



  if (!userInfo) {
    return <LoadingMessage>로딩 중...</LoadingMessage>;
  }

  return (
    <Container>
      <UserIcon src={userIcon} alt="사용자 아이콘" />
      <InfoContainer>
        <InfoRow>
          <Label>아이디:</Label>
          <Value>{userInfo.loginId}</Value>
        </InfoRow>
        <InfoRow>
          <Label>이름:</Label>
          <Value>{userInfo.userName}</Value>
        </InfoRow>
        <InfoRow>
          <Label>전화번호:</Label>
          <Value>{userInfo.phoneNumber}</Value>
        </InfoRow>
        <InfoRow>
          <Label>이메일:</Label>
          <Value>{userInfo.email}</Value>
        </InfoRow>
      </InfoContainer>
    </Container>
  );
};

export default MyInfo;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const UserIcon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span``;

const EditButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #555;
  }
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  margin-top: 50px;
`;