import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './WineInfo.css';

const WineInfo = () => {
    const { wineName } = useParams(); // URL에서 와인 이름을 가져옴
    const [wineDetails, setWineDetails] = useState(null); // 와인 상세 정보
    const [reviews, setReviews] = useState([]); // 리뷰 목록
    const [newReview, setNewReview] = useState({ score: "", comment: "" }); // 새 리뷰 입력 상태
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();

    const fetchWineDetails = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:8080/api/wine/${wineName}`);
          setWineDetails(response.data);
        } catch (error) {
          console.error("와인 상세 정보 요청 실패:", error);
          // 테스트 데이터를 기본 값으로 사용
          setWineDetails(mockWineDetails);
        } finally {
          setIsLoading(false); 
        }
      };
    
    // 리뷰 목록 가져오기
    const fetchReviews = async () => {
      try {
          const response = await axios.get(`http://localhost:8080/api/reviews/${wineName}`);
          setReviews(response.data);
      } catch (error) {
          console.error("리뷰 데이터 요청 실패:", error);
          // 테스트 데이터로 대체
          setReviews(mockWineDetails.reviews);
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



     // 리뷰 작성 이벤트 처리
    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
          alert('리뷰를 작성하려면 로그인이 필요합니다.');
          navigate('../login');
          return;
        }
        if (!newReview.score || !newReview.comment) {
        alert("점수와 코멘트를 입력해주세요.");
        return;
        }
        if (newReview.score < 1 || newReview.score > 5) {
          alert("점수는 1~5 사이의 값이어야 합니다.");
          return;
        }

        try {
        const response = await axios.post(`http://localhost:8080/api/reviews/${wineName}`, {
            ...newReview,
        });

        // 리뷰 추가
        setReviews([...reviews, response.data]);

        // 폼 초기화
        setNewReview({ score: "", comment: "" });
        } catch (error) {
        console.error("리뷰 전송 중 오류 발생:", error);
        alert("리뷰 전송에 실패했습니다.");
        }
    };

    useEffect(() => {
        fetchWineDetails();
        fetchReviews();
      }, [wineName]);

    if (isLoading) {
    return <p>로딩 중...</p>;
    }

    if (!wineDetails) {
    return <p>와인 정보를 가져올 수 없습니다.</p>;
    }

    return (
        <div className="wine-info-container">
        <h1>{wineDetails.eng_name}</h1>
        <p>{wineDetails.kor_name}</p>
        <p>와인 종류: {wineDetails.type}</p>
        <p>생산지: {wineDetails.country} / {wineDetails.region}</p>
        <p>와이너리: {wineDetails.winery}</p>
        <p>포도 품종: {wineDetails.grapeName}</p>
        <p>평점: {wineDetails.rating}</p>
        <p>가격: {wineDetails.price} 원</p>
        
        <h2>부가 정보</h2>
        {/*페어링 한식으로 생성하는 거 잊지 말기*/}
        <p><strong>페어링 음식:</strong> {wineDetails.pairing || "기본 페어링 정보"}</p>
        <p><strong>향:</strong> {wineDetails.aroma || "향 정보 없음"}</p>
        <p><strong>도수:</strong> {wineDetails.alcohol_content ? `${wineDetails.alcohol_content}%` : "도수 정보 없음"}</p>
        {/*당도/산도/바디/타닌 string으로 할지 1~5 int로 할지 결정해야 함*/}
        <p><strong>당도:</strong> {wineDetails.sweetness || "정보 없음"}</p>
        <p><strong>산도:</strong> {wineDetails.acidity || "정보 없음"}</p>
        <p><strong>바디:</strong> {wineDetails.body || "정보 없음"}</p>
        <p><strong>타닌:</strong> {wineDetails.tanin || "정보 없음"}</p>
        <p><strong>빈티지:</strong> {wineDetails.vintage ? `${wineDetails.vintage}년` : "빈티지 정보 없음"}</p>
        
        <h2>{wineDetails.region} 와인의 특징</h2>
        <p><strong>{wineDetails.regionEx}</strong></p>

        <h2>{wineDetails.grapeName} 품종의 특징</h2>
        <p><strong>{wineDetails.grapeEx}</strong></p>

        <h2>리뷰</h2>
        {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>{review.date}</strong></p>
            <p><strong>{review.user}</strong>: {review.rating}점</p>
            <p>{review.comment}</p>
          </div>
        ))
        ) : (
            <p>등록된 리뷰가 없습니다.</p>
        )}

        {/* 리뷰 작성 폼 */}
        <h3>리뷰 작성하기</h3>
        <form onSubmit={handleReviewSubmit}>
            <div>
                <label>점수: </label>
                <input
                    type="number"
                    name="score"
                    value={newReview.score}
                    onChange={handleReviewChange} 
                    placeholder="(1~5)"
                    min="1"
                    max="5"
                    style={{ width: "60px", height: "20px", fontSize: "14px" }} 
            />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label htmlFor="review">리뷰 내용:</label>
                <textarea
                    id="review"
                    name="comment"
                    value={newReview.comment}
                    onChange={handleReviewChange}
                    placeholder="리뷰를 작성하세요"
                    style={{ width: "300px", height: "40px", fontSize: "14px"}}
                />
            </div>

            <button type="submit">리뷰 제출</button>
        </form>
        <div className="last-element">
        </div>
    </div>
    );
};

export default WineInfo;

// Test Dataset
const mockWineDetails = {
    eng_name: "Chateau Margaux",
    kor_name: "샤토 마고",
    type: "Red",
    country: "France",
    region: "Bordeaux",
    winery: "Chateau Margaux Winery",
    grapeName: "Cabernet Sauvignon",
    rating: 4.8,
    price: 500000,
    pairing: "스테이크, 치즈",
    aroma: "블랙베리, 바닐라",
    alcohol_content: 13.5,
    sweetness: "Medium",
    acidity: "High",
    body: "Full",
    tanin: "High",
    vintage: 2015,
    reviews: [
      {
        id: 1,
        user: "John Doe",
        comment: "환상적인 와인입니다. 바디감과 향이 뛰어납니다!",
        rating: 5,
        date: "2024-11-01",
      },
      {
        id: 2,
        user: "Jane Smith",
        comment: "조금 비싸지만, 특별한 날에 어울리는 선택이에요.",
        rating: 4.5,
        date: "2024-11-15",
      },
      {
        id: 3,
        user: "WineLover",
        comment: "타닌이 강하고 블랙베리 향이 좋아요. 다시 구매할 예정입니다.",
        rating: 4.8,
        date: "2024-11-20",
      },
    ],
  };