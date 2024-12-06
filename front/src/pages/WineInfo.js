import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './WineInfo.css';
import wineImage from '../assets/wine.svg';
import styled from 'styled-components';

const WineInfo = () => {
  const { eng_name } = useParams(); // URL에서 와인 이름 가져옴
  const decodedEngName = decodeURIComponent(eng_name); // 공백 처리
  const [wineDetails, setWineDetails] = useState(null); // 와인 상세 정보
  const [reviews, setReviews] = useState([]); // 리뷰 목록
  const [newReview, setNewReview] = useState({ wineId: '', rating: '', comment: '' }); // 새 리뷰 입력 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate();

  const fetchWineDetails = async () => {
    setIsLoading(true);
    console.log("eng_name from URL:", eng_name);
    console.log("Decoded eng_name:", decodedEngName);
    try {
      const response = await axios.get(`http://localhost:8080/api/wines/${decodedEngName}`);
      console.log("Wine details response:", response.data); // 응답 데이터 출력
      setWineDetails(response.data);
    } catch (error) {
      console.error('와인 상세 정보 요청 실패:', error);
      setWineDetails(mockWineDetails); // 테스트 데이터를 기본 값으로 사용
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reviews/${wineDetails.wineId}`);
      console.log("Wine details response:", response.data); // 응답 데이터 출력
      setReviews(response.data);
    } catch (error) {
      console.error('리뷰 데이터 요청 실패:', error);
      setReviews(mockWineDetails.reviews); // 테스트 데이터로 대체
    }
  };

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/check_login', {
        withCredentials: true,
      });
      setIsLoggedIn(response.status === 200);
    } catch (error) {
      console.error('로그인 상태 확인 실패:', error);
      setIsLoggedIn(false);
    }
  };

  const handleReviewChange = (e) => {
    const { wineId, name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
      wineId: wineDetails.wineId, // wineId 추가
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('리뷰를 작성하려면 로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (!newReview.rating || !newReview.comment) {
      alert('점수와 코멘트를 입력해주세요.');
      return;
    }

    if (newReview.rating < 1 || newReview.rating > 5) {
      alert('점수는 1~5 사이의 값이어야 합니다.');
      return;
    }

    try {
      console.log("Request newreview:", newReview); // 요청 데이터 확인
      const response = await axios.post(`http://localhost:8080/api/reviews/${wineDetails.wineId}`, newReview);
      console.log("review Data:", response.data); // 응답 데이터 확인
      setReviews([...reviews, response.data]); // 새 리뷰 추가
      setNewReview({ rating: '', comment: '' }); // 폼 초기화
    } catch (error) {
      console.error('리뷰 전송 중 오류 발생:', error.response?.data || error.message);
      alert('리뷰 전송에 실패했습니다.');
    }
  };

  useEffect(() => {
    checkLoginStatus();
    fetchWineDetails();
  }, [decodedEngName]);

  useEffect(() => {
    if (wineDetails && wineDetails.wineId) {
      fetchReviews();
    }
  }, [wineDetails]); // wineDetails가 변경될 때 fetchReviews 실행

  if (isLoading) {
    return <div className="loading-message">로딩 중...</div>;
  }

  if (!wineDetails) {
    return <div className="error-message">와인 정보를 가져올 수 없습니다.</div>;
  }

  return (
    <div className="wine-info-container">
      <h1>{wineDetails.engName}</h1>
      <div className="wine-header">
        <div className="wine-image">
          <WineImage src={wineImage} alt="와인 이미지" />
        </div>
        <div className="wine-basic-info">
          <p>{wineDetails.korName}</p>
          <p><strong>와인 종류:</strong> {wineDetails.type}</p>
          <p><strong>평점:</strong> {wineDetails.rating} / 5</p>
          <p><strong>가격:</strong> {wineDetails.price.toLocaleString()} 원</p>
        </div>
      </div>

      <div className="wine-details">
        <h2>상세 정보</h2>
        <p><strong>생산국가:</strong> {wineDetails.producer.origin}</p>
        <p><strong>생산지역:</strong> {wineDetails.producer.region}</p>
        <p><strong>포도 품종:</strong> {wineDetails.grape.grapeName}</p>
        <p><strong>도수:</strong> {wineDetails.alcoholContent ? `${wineDetails.alcoholContent}%` : '정보 없음'}</p>
        <p><strong>향:</strong> {wineDetails.aroma || '정보 없음'}</p>
        <p><strong>당도:</strong> {wineDetails.sweetness || '정보 없음'}</p>
        <p><strong>산도:</strong> {wineDetails.acidity || '정보 없음'}</p>
        <p><strong>타닌:</strong> {wineDetails.tanin || '정보 없음'}</p>
        <p><strong>바디:</strong> {wineDetails.body || '정보 없음'}</p>
        <p><strong>빈티지:</strong> {wineDetails.vintage ? `${wineDetails.vintage}년` : "빈티지 정보 없음"}</p>
        <p><strong>페어링 음식:</strong> {wineDetails.pairing || '정보 없음'}</p>
      </div>

      <div className='wine-dic'>
        <h2>와인 사전</h2>
      </div>

      <div className='grape-name'>
        <h3>품종 : {wineDetails.grape.grapeName}</h3>
        <p>{wineDetails.grape.grapeEx}</p>
      </div>

      <div className='region-name'>
        <h3>지역 : {wineDetails.producer.region}</h3>
        <p>{wineDetails.producer.regionEx}</p>
      </div>


      <div className="reviews">
        <h2>리뷰</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p><strong>{review.userName}</strong> - {review.date}</p>
              <p>평점: {review.rating} / 5</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>등록된 리뷰가 없습니다.</p>
        )}
      </div>

      <div className="review-form">
        <h3>리뷰 작성하기</h3>
        <form onSubmit={handleReviewSubmit}>
          <label>점수 (1~5):</label>
          <input
            type="number"
            name="rating"
            value={newReview.rating}
            onChange={handleReviewChange}
            min="1"
            max="5"
            required
          />
          <label>리뷰 내용:</label>
          <textarea
            name="comment"
            value={newReview.comment}
            onChange={handleReviewChange}
            placeholder="리뷰를 작성하세요"
            required
          />
          <button type="submit">리뷰 제출</button>
        </form>
      </div>
    </div>
  );
};

export default WineInfo;

// Test Dataset
const mockWineDetails = {
  eng_name: 'Chateau Margaux',
  kor_name: '샤토 마고',
  type: 'Red',
  origin: 'France',
  region: 'Bordeaux',
  regionEx: '베리베리굿',
  grapeName: 'Cabernet Sauvignon',
  grapeEx: '포도 맛있당',
  rating: 4.8,
  price: 500000,
  pairing: '스테이크, 치즈',
  aroma: '블랙베리, 바닐라',
  alcohol_content: 13.5,
  image: '../assets/wine.svg',
  reviews: [
    {
      id: 1,
      user: 'John Doe',
      comment: '환상적인 와인입니다!',
      rating: 5,
      date: '2024-11-01',
    },
    {
      id: 2,
      user: 'Jane Smith',
      comment: '특별한 날에 좋은 선택입니다.',
      rating: 4.5,
      date: '2024-11-15',
    },
  ],
};

const WineImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 20px;
  object-fit: cover;
`;