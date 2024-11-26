import { Link } from 'react-router-dom';

// ... 생략

<ResultList>
  {results.map((result, index) => (
    <ResultCard key={index}>
      <WineImage src={wineImage} alt="와인 이미지" />
      <ResultContent>
        <WineTitle>
          <Link to={`/wine-info/${result.eng_name}`}>{result.eng_name}</Link>
        </WineTitle>
        <WineSubtitle>{result.name}</WineSubtitle>
        <WineInfo>
          <WineType type={result.type}>{result.type}</WineType> {/* 와인 종류에 따라 색상 변경 */}
          <Country>{result.country}</Country>
          <Rating>⭐ {result.rating}</Rating>
        </WineInfo>
      </ResultContent>
    </ResultCard>
  ))}
</ResultList>
        // 