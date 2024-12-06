import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const MyReviews = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/reviews/me', {
                    withCredentials: true, // 쿠키 포함
                });

                if (response.status === 200) {
                    const reviewsWithWineData = await Promise.all(
                        response.data.map(async (review) => {
                            // 리뷰 데이터에서 wineId로 와인 데이터를 추가 요청
                            const wineResponse = await axios.get(`http://localhost:8080/api/wines/id/${review.wineId}`);
                            return { ...review, wine: wineResponse.data }; // 리뷰 데이터에 와인 데이터 추가
                        })
                    );
                    setReviews(reviewsWithWineData); // 리뷰와 와인 데이터를 포함한 결과 저장
                } else if (response.status === 401) {
                    alert('로그인이 필요합니다.');
                    navigate('/login'); // 로그인 페이지로 리다이렉트
                } else {
                    console.error('리뷰 데이터를 가져오지 못했습니다.');
                    alert('리뷰 데이터를 가져오지 못했습니다.');
                    navigate('/');
                }
            } catch (error) {
                if (error.response) {
                    console.error('리뷰 데이터 요청 실패 상태: ', error.response.status);
                    console.error('리뷰 데이터 요청 실패 응답 데이터: ', error.response.data);
                    alert('리뷰 데이터를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
                } else if (error.request) {
                    console.error('서버 응답 없음: ', error.request);
                    alert('서버와의 연결에 문제가 발생했습니다. 네트워크를 확인하고 다시 시도해 주세요.');
                } else {
                    console.error('리뷰 데이터 요청 중 에러: ', error.message);
                    alert('알 수 없는 문제가 발생했습니다. 다시 시도해 주세요.');
                }
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [navigate]);

    if (loading) {
        return <LoadingMessage>로딩 중...</LoadingMessage>;
    }

    if (reviews.length === 0) {
        return <NoReviewsMessage>작성한 리뷰가 없습니다.</NoReviewsMessage>;
    }

    return (
        <Container>
            <Title>내가 작성한 리뷰</Title>
            <ReviewsContainer>
                {reviews.map((review) => (
                    <ReviewCard key={review.id}>
                        <WineName>
                            {review.wine.engName} ({review.wine.korName})
                        </WineName>
                        <ReviewDetails>
                            <Rating>평점: {review.rating} / 5</Rating>
                            <Date>{review.date}</Date>
                        </ReviewDetails>
                        <ReviewContent>{review.comment}</ReviewContent>
                    </ReviewCard>
                ))}
            </ReviewsContainer>
        </Container>
    );
};

export default MyReviews;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  max-width: 1000px;
`;

const ReviewCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  padding: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const WineName = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ReviewDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e9ecef;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Rating = styled.div`
  font-weight: bold;
  color: #6c757d;
`;

const Date = styled.div`
  font-size: 14px;
  color: #6c757d;
`;

const ReviewContent = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #555;
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  margin-top: 50px;
`;

const NoReviewsMessage = styled.div`
  font-size: 18px;
  margin-top: 50px;
  color: #555;
  text-align: center;
`;

const WineEnglishName = styled.div`
  font-size: 14px;
  color: #888;
  margin-top: 5px;
`;