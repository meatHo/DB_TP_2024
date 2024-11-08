import React from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q'); // 검색어 가져오기

  return (
    <div>
      <h1>검색 결과</h1>
      <p>검색어: {query}</p>
      {/* 여기에서 검색 결과를 표시할 수 있습니다 */}
    </div>
  );
};

export default Search;