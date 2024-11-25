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
                    setReviews(response.data); // 리뷰 데이터 저장
                } else if (response.status === 401) {
                    alert('로그인이 필요합니다.');
                    navigate('/login'); // 로그인 페이지로 리다이렉트
                } else {
                    console.error('리뷰 데이터를 가져오지 못했습니다.');
                    alert('리뷰 데이터를 가져오지 못했습니다.');
                    navigate('/');
                }
            } catch (error) {
                console.error('리뷰 데이터 요청 에러:', error);
                alert('서버와의 연결에 문제가 발생했습니다.');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [navigate]);

    //테스트 코드
    /* useEffect(() => {
        // Mock 데이터 로드
        const mockReviews = [
            {
                loginId: 1,
                wineName: 'Chardonnay',
                rating: 5,
                date: '2024-11-20T14:00:00',
                content: '완벽한 와인이었습니다. 부드럽고 우아했어요.',
            },
            {
                loginId: 2,
                wineName: 'Merlot',
                rating: 4,
                date: '2024-11-18T12:30:00',
                content: '부드럽고 매력적이었습니다. 약간 달콤한 향이 좋았습니다.',
            },
            {
                loginId: 3,
                wineName: 'Cabernet Sauvignon',
                rating: 4.5,
                date: '2024-11-19T15:00:00',
                content: '풍부한 맛이 인상적이었습니다. 과일 향이 훌륭했어요.',
            },
        ];

        // 로딩 시뮬레이션
        setTimeout(() => {
            setReviews(mockReviews); // Mock 데이터를 상태로 설정
            setLoading(false); // 로딩 상태 종료
        }, 1000); // 로딩 상태를 확인하기 위해 1초 지연
    }, []); */

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
                    <ReviewCard key={review.loginId}>
                        <WineName>{review.wineName}</WineName>
                        <ReviewDetails>
                            <Rating>평점: {review.rating} / 5</Rating>
                            <Date>{review.date}</Date>
                        </ReviewDetails>
                        <ReviewContent>{review.content}</ReviewContent>
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