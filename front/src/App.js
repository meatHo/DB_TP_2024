import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyReviews from './pages/MyReviews';
import Search from './pages/Search';
import MyInfo from './pages/MyInfo';
import WineInfo from './pages/WineInfo';
import homeIcon from './assets/home_icon.svg';
import reviewIcon from './assets/review_icon.svg';
import profileIcon from './assets/profile_icon.svg';
import axios from 'axios';

const App = () => {
  return (
    <Router>
      <Container>
        <Header>
          <TopBar />
        </Header>
        <Footer>
          <NavBar>
            <NavItem>
              <NavLink to="/">
                <NavIcon src={homeIcon} alt="홈 아이콘" />
                <NavText>홈</NavText>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/reviews">
                <NavIcon src={reviewIcon} alt="리뷰 아이콘" />
                <NavText>내 리뷰</NavText>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/info">
                <NavIcon src={profileIcon} alt="프로필 아이콘" />
                <NavText>내 정보</NavText>
              </NavLink>
            </NavItem>
          </NavBar>
        </Footer>

        {/* 라우터 설정 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reviews" element={<MyReviews />} />
          <Route path="/info" element={<MyInfo />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wine/:eng_name" element={<WineInfo />} />
        </Routes>
      </Container>
    </Router>
  );
};

const TopBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 서버에 로그인 상태를 확인하는 요청
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/check_login', {
          withCredentials: true, // 쿠키를 포함하여 요청
        });
        if (response.status === 200) {
          setIsLoggedIn(true); // 로그인 상태로 설정
        } else {
          setIsLoggedIn(false); // 로그인 상태가 아니라고 설정
        }
      } catch (error) {
        if (error.response) {
          // 서버가 응답했지만 상태 코드가 2xx가 아닌 경우
          console.error('로그인 상태 확인 실패 상태: ', error.response.status);
          console.error('로그인 상태 확인 실패 응답 데이터: ', error.response.data);
          alert('로그인 상태를 확인하는 데 실패했습니다. 다시 시도해 주세요.');
        } else if (error.request) {
          // 서버에 요청했지만 응답이 없는 경우 (네트워크 문제)
          console.error('서버 응답 없음: ', error.request);
          alert('서버와의 연결에 문제가 발생했습니다. 네트워크를 확인하고 다시 시도해 주세요.');
        } else {
          // 기타 에러 (코드 오류 등)
          console.error('로그인 상태 확인 중 에러: ', error.message);
          alert('알 수 없는 문제가 발생했습니다. 다시 시도해 주세요.');
        }
        setIsLoggedIn(false); // 로그인 상태를 false로 설정
      }
    };

    checkLoginStatus();
  }, []);


  /*
    //테스트 코드   
    useEffect(() => {
      // 실제 서버 요청 대신 임시로 로그인 상태를 설정
      setIsLoggedIn(true); // 임시로 로그인된 상태로 설정
    }, []); */


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/logout', {}, {
        withCredentials: true, // 쿠키를 포함하여 요청
      });
      setIsLoggedIn(false); // 로그아웃 후 상태 업데이트
      navigate('/'); // 홈 페이지로 이동
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <TopBarContainer>
      {isLoggedIn ? (
        <StyledLink to="/" onClick={handleLogout}>
          로그아웃
        </StyledLink>
      ) : (
        <>
          <StyledLink to="/signup">회원가입</StyledLink>
          <StyledLink to="/login">로그인</StyledLink>
        </>
      )}
    </TopBarContainer>
  );
};

export default App;

// Styled Components
const Container = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: auto;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
`;

const Header = styled.header`
  width: 100%;
  position: absolute;
  top: 0;
`;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px;
  width: 100%;
  box-sizing: border-box;
`;

const StyledLink = styled(Link)`
  margin-left: 30px;
  text-decoration: none;
  color: black;
  font-size: 16px;
  cursor: pointer;
  
  &.button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: #f9f9f9;
  border-top: 1px solid #ccc;
  padding: 10px 0;
  z-index: 1000;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: auto;
  margin: 0 auto;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #888;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
`;

const NavText = styled.span`
  font-size: 14px;
`;