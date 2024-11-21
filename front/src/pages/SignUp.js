import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const handleSignUp = async (event) => {
  event.preventDefault();

  // 비밀번호와 비밀번호 재확인 일치 여부 확인
  if (password !== confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  // 아이디 중복 체크
  try {
    const idCheckResponse = await fetch(`http://localhost:8080/api/validate?loginId=${loginId}`, {
      method: 'POST',
    });

    if (idCheckResponse.status === 409) {
      alert('이미 존재하는 아이디입니다.');
      return;
    } else if (!idCheckResponse.ok) {
      alert('아이디 중복 확인 중 문제가 발생했습니다.');
      return;
    }
  } catch (error) {
    console.error('아이디 중복 확인 에러:', error);
    alert('서버와의 연결에 문제가 발생했습니다.');
    return;
  }

  // 비밀번호 암호화
  const encryptedPassword = CryptoJS.SHA256(password).toString();

  // 회원가입 요청
  try {
    const response = await fetch('http://localhost:8080/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, phoneNumber, email, loginId, password: encryptedPassword }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('회원가입 성공:', data);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } else {
      const errorMessage = await response.text();

      if (response.status === 409) {
        alert(errorMessage); // "이미 존재하는 이메일입니다." 또는 "이미 존재하는 전화번호입니다."
      } else {
        console.error('회원가입 실패');
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  } catch (error) {
    console.error('회원가입 요청 에러:', error);
    alert('서버와의 연결에 문제가 발생했습니다.');
  }
};

return (
  <SignUpContainer>
    <h2>회원가입</h2>
    <Form onSubmit={handleSignUp}>
      <Input
        type="text"
        placeholder="이름"
        value={userName}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="tel"
        placeholder="전화번호"
        value={phoneNumber}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="id"
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
      <Input
        type="password"
        placeholder="비밀번호 재확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button type="submit">회원가입</Button>
    </Form>
  </SignUpContainer>
);


export default SignUp;

// Styled Components
const SignUpContainer = styled.div`
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