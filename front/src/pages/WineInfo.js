import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WineInfo = () => {
  const { wineName } = useParams(); // URL에서 와인 이름을 가져옴
  const [wineDetails, setWineDetails] = useState(null);

  useEffect(() => {
    // 서버에서 와인 상세 정보 가져오기
    const fetchWineDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/wine/${wineName}`);
        setWineDetails(response.data);
      }  catch (error) {
        console.error('와인 상세 정보 요청 실패:', error);
      }
    };

    fetchWineDetails();
  }, [wineName]);

  if (!wineDetails) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h1>{wineDetails.eng_name}</h1>
      <p>{wineDetails.name}</p>
      <p>와인 종류: {wineDetails.type}</p>
      <p>국가: {wineDetails.country}</p>
      <p>평점: {wineDetails.rating}</p>
      <p>설명: {wineDetails.description}</p>
      {/* 와인에 대한 추가 정보를 여기에 표시 */}
      {/* field 변수명 설정하고 그 다음에 추가 ㄱㄱ*/ }
    </div>
  );
};

export default WineInfo;