import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const Login = () => {
  const [loginId, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // 비밀번호 암호화
    const encryptedPassword = CryptoJS.SHA256(password).toString();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/login',
        { loginId, password: encryptedPassword }, // 암호화된 비밀번호 전송
        { withCredentials: true } // 쿠키 포함
      );

      if (response.status === 200) {
        console.log('로그인 성공:', response.data);
        window.location.href = '/';
        //navigate('/'); // 홈 페이지로 이동
      } else {
        console.error('로그인 실패');
        alert('로그인에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('로그인 요청 에러:', error);
      alert('서버와의 연결에 문제가 발생했습니다.');
    }
  };

  return (
    <LoginContainer>
      <h2>로그인</h2>
      <Form onSubmit={handleLogin}>
        <Input
          type="loginId"
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">로그인</Button>
      </Form>
    </LoginContainer>
  );
};

/* 
  //테스트 코드   
  const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 임시로 로그인 상태와 사용자 정보를 localStorage에 저장
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userInfo', JSON.stringify({
      loginId: 'user123',
      name: '홍길동',
      phone: '010-1234-5678',
      email: 'user@example.com',
      loginId: 'loapp'
    }));
    alert('로그인 성공!');
    navigate('/'); // 홈 페이지로 이동
  };

  return (
    <div>
      <h2>로그인 페이지</h2>
      <button onClick={handleLogin}>로그인 성공 (임시)</button>
    </div>
  );
}; */


export default Login;

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;