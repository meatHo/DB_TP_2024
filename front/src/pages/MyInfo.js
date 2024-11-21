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
        console.error('사용자 정보 요청 에러:', error);
        alert('서버와의 연결에 문제가 발생했습니다.');
        navigate('/');
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

  const handleEditInfo = () => {
    navigate('/edit_info');
  };

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
      <EditButton onClick={handleEditInfo}>정보 변경</EditButton>
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