import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/LOGO.png';
import { Range } from 'react-range';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [grapeNameFilter, setGrapeNameFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500000]); // 초기값을 최대 범위로 설정
  const [applyPriceFilter, setApplyPriceFilter] = useState(false); // 가격 필터 적용 여부
  const navigate = useNavigate();


  const handlePriceChange = (values) => {
    setPriceRange(values);
    setApplyPriceFilter(true);
  };


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

  const handleSearch = () => {
    const query = {
      q: searchTerm,
      origin: originFilter,
      region: regionFilter,
      type: typeFilter,
      grapeName: grapeNameFilter,
      ...(applyPriceFilter && { minPrice: priceRange[0], maxPrice: priceRange[1] }),
    };
    navigate(`/search?${new URLSearchParams(query).toString()}`);
  };

  const handleOriginChange = (e) => {
    setOriginFilter(e.target.value); // 원산지 선택 상태 설정
  };

  const handleRegionChange = (e) => {
    setRegionFilter(e.target.value);
  };

  const handletypeChange = (e) => {
    setTypeFilter(e.target.value);
  };
  const handleGrapeNameChange = (e) => {
    setGrapeNameFilter(e.target.value);
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

      <FilterContainer1>
        {/* 원산지 필터 */}
        <FilterGroup>
          <FilterSelect value={originFilter} onChange={handleOriginChange}>
            <option value="" disabled>국가</option> {/* 기본값으로 선택 불가 */}
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

        {/* 지역 필터 */}
        <FilterGroup>
          <FilterSelect value={regionFilter} onChange={handleRegionChange} disabled={!originFilter}>
            <option value="" disabled>지역 종류</option> {/* 기본값으로 선택 불가 */}
            {/* 선택된 국가의 지역 옵션만 표시 */}
            {originFilter && regionsByCountry[originFilter].map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </FilterSelect>
        </FilterGroup>
      </FilterContainer1>
      <FilterContainer2>

        {/* 와인 종류 필터 */}
        <FilterGroup>
          <FilterSelect value={typeFilter} onChange={handletypeChange}>
            <option value="" disabled>와인 종류</option> {/* 기본값으로 선택 불가 */}
            <option value="Sparkling">스파클링 와인</option>
            <option value="Red">레드 와인</option>
            <option value="White">화이트 와인</option>
          </FilterSelect>
        </FilterGroup>

        {/* 포도 종류 필터 */}
        <FilterGroup>
          <FilterSelect value={grapeNameFilter} onChange={handleGrapeNameChange}>
            <option value="" disabled>포도 종류</option> {/* 기본값으로 선택 불가 */}
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

      </FilterContainer2>
      <PriceFilter>

        <Range
          step={1000}
          min={0}
          max={500000}
          values={priceRange}
          onChange={handlePriceChange}
          renderTrack={({ props, children }) => (
            <Track {...props}>
              <TrackInner
                style={{
                  left: `${(priceRange[0] / 500000) * 100}%`,
                  width: `${((priceRange[1] - priceRange[0]) / 500000) * 100}%`,
                }}
              />
              {children}
            </Track>
          )}
          renderThumb={({ props, index }) => (
            <Thumb {...props}>
              <ThumbLabel>₩{priceRange[index].toLocaleString()}</ThumbLabel>
            </Thumb>
          )}
        />
        <PriceValues>
          <PriceValue>₩{priceRange[0].toLocaleString()}</PriceValue>
          <PriceValue>₩{priceRange[1].toLocaleString()}</PriceValue>
        </PriceValues>
      </PriceFilter>
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

const FilterContainer1 = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const FilterContainer2 = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const PriceFilter = styled.div`
  display: flex;
    margin-top: 0px;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;



const Track = styled.div`
  height: 8px;
  width: 300px;
  background: #ddd;
  border-radius: 4px;
  position: relative;
  margin-top: 50px;
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
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
`;

const ThumbLabel = styled.div`
  position: absolute;
  top: -30px;
  font-size: 14px;
  color: #fff;
  background: #c62828;
  padding: 5px 8px;
  border-radius: 4px;
  white-space: nowrap;
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
const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 180px;
`;