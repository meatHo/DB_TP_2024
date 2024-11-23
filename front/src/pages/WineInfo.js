import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './WineInfo.css';

const WineInfo = () => {
  const { wineName } = useParams(); // URL에서 와인 이름을 가져옴
  const [wineDetails, setWineDetails] = useState(null);
  const [newReview, setNewReview] = useState({
    score: "",
    comment: "",
  }); 
  const [loggedInUser] = useState({
    username: "John Doe", // 로그인된 사용자의 이름
    // 이름 가져오는 거 어케 할지는..기호한테 물어봐야 하나
  });


//   useEffect(() => {
//     // 서버에서 와인 상세 정보 가져오기
//     const fetchWineDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/wine/${wineName}`);
//         setWineDetails(response.data);
//       }  catch (error) {
//         console.error('와인 상세 정보 요청 실패:', error);
//       }
//     };

//     fetchWineDetails();
//   }, [wineName]);

  //백엔드 구현 전 Test Dataset
  const mockWineDetails = {
    eng_name: "Chateau Margaux",
    kor_name: "샤토 마고",
    type: "Red",
    country: "France",
    region: "Bordeaux",
    winery: "Chateau Margaux Winery",
    grape: "Cabernet Sauvignon",
    rating: 4.8,
    price: 500000,
    pairing: "스테이크, 치즈",
    aroma: "블랙베리, 바닐라",
    alcohol_content: 13.5,
    sweetness: "Medium",
    acidity: "High",
    body: "Full",
    tannin: "High",
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

  useEffect(() => {
    setWineDetails(mockWineDetails);
  }, []);
//여기까지 Test Dataset

  //리뷰 작성 이벤트 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.score || !newReview.comment) {
      alert("점수와 코멘트를 입력해주세요.");
      return;
    }
  
  try {
    // Spring 백엔드로 POST 요청
    const response = await axios.post("http://localhost:8080/api/reviews", {
      wineName: wineDetails.eng_name,
      reviewer: loggedInUser.username, // 로그인된 사용자의 이름 자동 포함
      ...newReview,
    });

    // 서버로부터 받은 데이터로 리뷰 리스트 업데이트
    setWineDetails({
      ...wineDetails,
      reviews: [...wineDetails.reviews, response.data],
    });

    // 폼 초기화
    setNewReview({ score: "", comment: "" });
  } catch (error) {
    console.error("리뷰 전송 중 오류 발생:", error);
    alert("리뷰 전송에 실패했습니다.");
  }
  };

  return (
    <div className="wine-info-container">
      <h1>{wineDetails.eng_name}</h1>
      <p>{wineDetails.kor_name}</p>
      <p>와인 종류: {wineDetails.type}</p>
      <p>생산지: {wineDetails.country} / {wineDetails.region}</p>
      <p>와이너리: {wineDetails.winery}</p>
      <p>포도 품종: {wineDetails.grape}</p>
      <p>평점: {wineDetails.rating}</p>
      <p>가격: {wineDetails.price} 원</p>
      {/* 와인에 대한 추가 정보를 여기에 표시 */}
      {/* field 변수명 설정하고 그 다음에 추가 ㄱㄱ*/ }
      
      <h2>부가 정보</h2>
      <p><strong>페어링 음식:</strong> {wineDetails.pairing || "기본 페어링 정보"}</p>
      <p><strong>향:</strong> {wineDetails.aroma || "향 정보 없음"}</p>
      <p><strong>도수:</strong> {wineDetails.alcohol_content ? `${wineDetails.alcohol_content}%` : "도수 정보 없음"}</p>
      <p><strong>당도:</strong> {wineDetails.sweetness || "정보 없음"}</p>
      <p><strong>산도:</strong> {wineDetails.acidity || "정보 없음"}</p>
      <p><strong>바디:</strong> {wineDetails.body || "정보 없음"}</p>
      <p><strong>타닌:</strong> {wineDetails.tannin || "정보 없음"}</p>
      <p><strong>빈티지:</strong> {wineDetails.vintage ? `${wineDetails.vintage}년` : "빈티지 정보 없음"}</p>
    
      <h2>{wineDetails.country} 와인의 특징</h2>
      <p><strong>{wineDetails.countryDetails}</strong></p>

      <h2>{wineDetails.grape} 품종의 특징</h2>
      <p><strong>{wineDetails.grapeDetails}</strong></p>

      <h2>리뷰</h2>
      {wineDetails.reviews.map((review, index) => (
        <div key={index} className="review">
        <p><strong>{review.date}</strong></p>
        <p><strong>{review.user}</strong>:{review.rating}점</p>
        <p>{review.comment}</p>
      </div>
      ))}
      {/* 리뷰 작성 폼 */}
      <h3>리뷰 작성하기</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>점수:</label>
          <input
            type="number"
            name="score"
            value={newReview.score}
            onChange={handleChange}
            placeholder="점수 (1~5)"
            min="1"
            max="5"
          />
        </div>
        <div>
          <label>리뷰 내용:</label>
          <textarea
            name="comment"
            value={newReview.comment}
            onChange={handleChange}
            placeholder="리뷰를 작성하세요"
          />
        </div>
        <button type="submit">리뷰 제출</button>
      </form>
    </div>
  );
};

export default WineInfo;