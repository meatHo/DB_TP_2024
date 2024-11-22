import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WineInfo = () => {
  const { wineName } = useParams(); // URL에서 와인 이름을 가져옴
  const [wineDetails, setWineDetails] = useState(null);

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

  const mockWineDetails = {
    eng_name: "Chateau Margaux",
    kor_name: "샤토 마고",
    type: "Red",
    country: "France",
    region: "Bordeaux",
    winery: "Chateau Margaux Winery",
    grape_variety: "Cabernet Sauvignon",
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
  };

  useEffect(() => {
    // 서버로부터 데이터 대신 mock 데이터를 사용
    setWineDetails(mockWineDetails);
  }, []);

  if (!wineDetails) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h1>{wineDetails.eng_name}</h1>
      <p>{wineDetails.kor_name}</p>
      <p>와인 종류: {wineDetails.type}</p>
      <p>생산지: {wine.country} / {wine.region}</p>
      <p>와이너리: {wine.winery}</p>
      <p>포도 품종: {wine.grape_variety}</p>
      <p>평점: {wineDetails.rating}</p>
      <p>가격: {wine.price} 원</p>
      {/* 와인에 대한 추가 정보를 여기에 표시 */}
      {/* field 변수명 설정하고 그 다음에 추가 ㄱㄱ*/ }
      
      <h2>추가 정보</h2>
      <p><strong>페어링 음식:</strong> {wineDetails.pairing || "기본 페어링 정보"}</p>
      <p><strong>향:</strong> {wineDetails.aroma || "향 정보 없음"}</p>
      <p><strong>도수:</strong> {wineDetails.alcohol_content ? `${wineDetails.alcohol_content}%` : "도수 정보 없음"}</p>
      <p><strong>당도:</strong> {wineDetails.sweetness || "정보 없음"}</p>
      <p><strong>산도:</strong> {wineDetails.acidity || "정보 없음"}</p>
      <p><strong>바디:</strong> {wineDetails.body || "정보 없음"}</p>
      <p><strong>타닌:</strong> {wineDetails.tannin || "정보 없음"}</p>
      <p><strong>빈티지:</strong> {wineDetails.vintage ? `${wineDetails.vintage}년` : "빈티지 정보 없음"}</p>
    </div>
  );
};

export default WineInfo;