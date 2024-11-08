import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/LOGO.png';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`); // 검색어를 쿼리 파라미터로 전달
    }
  };

  return (
    <Main>
      <LogoContainer>
        <Logo src={logo} alt="Wine Tale Logo" />
        <Title>Wine Tale</Title>
      </LogoContainer>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="와인을 검색하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon onClick={handleSearch}>🔍</SearchIcon>
      </SearchBar>
    </Main>
  );
};

export default Home;

// Styled Components
const Main = styled.main`
  text-align: center;
  margin-top: 100px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px;
`;

const Title = styled.h1`
  font-size: 40px;
  color: #333;
  margin-top: 0px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 70vw; /* 뷰포트 너비의 90%를 차지 */
  max-width: 1000px;
  margin: 20px auto;
  display: flex;
  align-items: center;
`;


const SearchInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #888;
  cursor: pointer; /* 클릭 가능하도록 설정 */
`;