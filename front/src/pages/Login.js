import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), //JSON 
      });

      if (response.ok) {//HTTP응답코드 200번대 코드 반환하면 됨
        const data = await response.json();
        //로그인 성공
        console.log('로그인 성공:', data);
        navigate('/'); //홈 페이지로 이동
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
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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