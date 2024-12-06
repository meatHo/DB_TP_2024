import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import wineImage from '../assets/wine.svg';
import { Range } from 'react-range';

const SearchResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchTerm, setSearchTerm] = useState(queryParams.get('q') || '');
  const [originFilter, setOriginFilter] = useState(queryParams.get('origin') || '');
  const [regionFilter, setRegionFilter] = useState(queryParams.get('region') || '');
  const [typeFilter, setTypeFilter] = useState(queryParams.get('type') || '');
  const [grapeNameFilter, setGrapeNameFilter] = useState(queryParams.get('grapeName') || '');
  const [results, setResults] = useState([]); // 검색 결과 상태

  const [minPrice, setMinPrice] = useState(queryParams.get('minPrice') || 0);
  const [maxPrice, setMaxPrice] = useState(queryParams.get('maxPrice') || 500000);

  const regionsByCountry = {
    France: ['Bordeaux', 'Burgundy', 'Champagne', 'Loire Valley', 'Rhône Valley'],
    Italy: ['Tuscany', 'Piedmont', 'Veneto', 'Sicily'],
    Spain: ['Rioja', 'Priorat', 'Ribera del Duero', 'Rías Baixas'],
    Portugal: ['Douro', 'Alentejo', 'Dão'],
    Germany: ['Mosel', 'Rheingau', 'Pfalz'],
    USA: ['Napa Valley', 'Sonoma', 'Willamette Valley'],
    'New Zealand': ['Marlborough', 'Hawke\'s Bay'],
    Australia: ['Barossa Valley', 'Yarra Valley'],
    Chile: ['Maipo Valley', 'Colchagua Valley', 'Leyda Valley'],
    Argentina: ['Mendoza', 'Salta'],
  };

  const handlePriceChange = (values) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const handleSearch = () => {
    const query = {
      q: searchTerm,
      origin: originFilter,
      region: regionFilter,
      type: typeFilter,
      grapeName: grapeNameFilter,
      minPrice,
      maxPrice,
    };
    navigate(`/search?${new URLSearchParams(query).toString()}`);
  };



  // 서버로부터 검색 결과 데이터를 가져오는 함수
  // 서버로부터 검색 결과 데이터를 가져오는 함수
  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/wines', {
        params: {
          q: searchTerm,
          origin: originFilter,
          region: regionFilter,
          type: typeFilter,
          grapeName: grapeNameFilter,
          minPrice, // 가격 필터 추가
          maxPrice, // 가격 필터 추가
        },
      });
      setResults(response.data); // 서버로부터 받은 데이터를 검색 결과로 설정
    } catch (error) {
      if (error.response) {
        // 서버가 응답했지만 상태 코드가 2xx가 아닌 경우
        console.error('검색 결과 요청 실패 상태: ', error.response.status);
        console.error('검색 결과 요청 실패 응답 데이터: ', error.response.data);
        alert('검색 결과를 불러오는 데 실패했습니다. 입력 조건을 확인하고 다시 시도해 주세요.');
      } else if (error.request) {
        // 서버에 요청했지만 응답이 없는 경우 (네트워크 문제)
        console.error('서버 응답 없음: ', error.request);
        alert('서버와의 연결에 문제가 발생했습니다. 네트워크를 확인하고 다시 시도해 주세요.');
      } else {
        // 기타 에러 (코드 오류 등)
        console.error('검색 결과 요청 중 에러: ', error.message);
        alert('알 수 없는 문제가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  useEffect(() => {
    fetchResults();
  }, [searchTerm, originFilter, regionFilter, typeFilter, grapeNameFilter]);

  /* 
    // 테스트
    useEffect(() => {
      // Mock 데이터
      const mockResults = [
        {
          engName: 'Polperro and Even Keel Wines',
          korName: '폴페로 앤 이븐 킬 와인',
          type: '레드',
          origin: '프랑스',
          rating: 4.3,
        },
        {
          engName: 'Castello di Ama',
          korName: '카스텔로 디 아마',
          type: '레드',
          origin: '이탈리아',
          rating: 4.5,
        },
        {
          engName: 'Bodegas Vega Sicilia',
          korName: '베가 시실리아 와인',
          type: '화이트',
          origin: '스페인',
          rating: 4.7,
        },
      ];
      // Mock 데이터를 results 상태로 설정
      setResults(mockResults);
    }, []); */

  return (
    <Main>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="와인을 검색하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon onClick={handleSearch}>🔍</SearchIcon>
      </SearchBar>

      <FilterContainer>
        <FilterGroup>
          <FilterSelect value={originFilter} onChange={(e) => setOriginFilter(e.target.value)}>
            <option value="" disabled>국가</option>
            <option value="France">프랑스</option>
            <option value="Italy">이탈리아</option>
            <option value="Spain">스페인</option>
            <option value="Portugal">포르투갈</option>
            <option value="Germany">독일</option>
            <option value="US">미국</option>
            <option value="New Zealand">뉴질랜드</option>
            <option value="Australia">호주</option>
            <option value="Chile">칠레</option>
            <option value="Argentina">아르헨티나</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterSelect
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            disabled={!originFilter}
          >
            <option value="" disabled>지역 종류</option>
            {originFilter && regionsByCountry[originFilter].map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterSelect value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="" disabled>와인 종류</option>
            <option value="Sparkling">스파클링 와인</option>
            <option value="Red">레드 와인</option>
            <option value="White">화이트 와인</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterSelect value={grapeNameFilter} onChange={(e) => setGrapeNameFilter(e.target.value)}>
            <option value="" disabled>포도 종류</option>
            <option value="Cabernet Sauvignon">카베르네 소비뇽</option>
            <option value="Pinot Noir">피노 누아</option>
            <option value="Syrah/Shiraz">시라/쉬라즈</option>
            <option value="Merlot">메를로</option>
            <option value="Sangiovese">산지오베제</option>
            <option value="Tempranillo">템프라니요</option>
            <option value="Malbec">말벡</option>
            <option value="Chardonnay">샤르도네</option>
            <option value="Sauvignon Blanc">소비뇽 블랑</option>
            <option value="Riesling">리슬링</option>
            <option value="Chenin Blanc">슈냉 블랑</option>
            <option value="Moscato">모스카토</option>
          </FilterSelect>
        </FilterGroup>
      </FilterContainer>

      <PriceFilter>
        <Range
          step={1000}
          min={0}
          max={500000}
          values={[minPrice, maxPrice]}
          onChange={handlePriceChange}
          renderTrack={({ props, children }) => (
            <Track {...props}>
              <TrackInner
                style={{
                  left: `${(minPrice / 500000) * 100}%`,
                  width: `${((maxPrice - minPrice) / 500000) * 100}%`,
                }}
              />
              {children}
            </Track>
          )}
          renderThumb={({ props, index }) => (
            <Thumb {...props}>
              <ThumbLabel>₩{[minPrice, maxPrice][index].toLocaleString()}</ThumbLabel>
            </Thumb>
          )}
        />
        <PriceValues>
          <PriceValue>₩{minPrice.toLocaleString()}</PriceValue>
          <PriceValue>₩{maxPrice.toLocaleString()}</PriceValue>
        </PriceValues>
      </PriceFilter>

      {/* 검색 결과 리스트 */}
      <ResultList>
        {results.map((result, index) => (
          <ResultCard key={index}>
            <WineImage src={wineImage} alt="와인 이미지" />
            <ResultContent>
              {/*WineTitle 클릭하면 상세페이지(WineInfo 실행)로 이동*/}
              <WineTitle
                onClick={() => navigate(`/wines/${encodeURIComponent(result.engName)}`)}
                role="button"
              >
                {result.engName}
              </WineTitle>
              <WineSubtitle>{result.korName}</WineSubtitle>
              <WineInfo>
                <WineType type={result.type}>{result.type}</WineType> {/* 와인 종류에 따라 색상 변경 */}
                <Country>{result.origin}</Country>
                <Rating>⭐ {result.rating}</Rating>
              </WineInfo>
            </ResultContent>
          </ResultCard>
        ))}
      </ResultList>
    </Main>
  );
};


export default SearchResult;

// Styled Components for SearchResult
const Main = styled.main`
  text-align: center;
  margin-top: 100px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 70vw;
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
  cursor: pointer;
`;

const FilterContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WineImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 20px;
  object-fit: cover;
`;

const FilterSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 180px;
`;

const ResultList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultCard = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  margin-bottom: 10px;
`;

const ImagePlaceholder = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ccc;
  border-radius: 10px;
  margin-right: 20px;
`;

const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const WineTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const WineSubtitle = styled.p`
  font-size: 18px;
  margin: 5px 0;
`;

const WineInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WineType = styled.span`
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  background-color: ${({ type }) => {
    switch (type) {
      case '레드':
        return '#ff4d4d'; // 빨강
      case '스파클링':
        return '#80d4ff'; // 하늘
      case '화이트':
        return '#b3b3b3'; // 흰
      default:
        return '#ccc'; // 기본
    }
  }};
`;

const Country = styled.span`
  font-size: 12px;
`;

const Rating = styled.span`
  font-size: 12px;
  color: #888;
`;
const PriceFilter = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Track = styled.div`
  height: 8px;
  width: 300px;
  background: #ddd;
  border-radius: 4px;
  position: relative;
`;

const TrackInner = styled.div`
  height: 100%;
  background: #c62828;
  border-radius: 4px;
  position: absolute;
`;

const Thumb = styled.div`
  height: 24px;
  width: 24px;
  background-color: #fff;
  border: 2px solid #c62828;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ThumbLabel = styled.div`
  position: absolute;
  top: -30px;
  font-size: 14px;
  color: #fff;
  background: #c62828;
  padding: 5px 8px;
  border-radius: 4px;
`;

const PriceValues = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  margin-top: 10px;
`;

const PriceValue = styled.span`
  font-size: 16px;
  color: #333;
`;