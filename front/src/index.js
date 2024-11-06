import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // App.js 파일이 올바르게 불러와지고 있는지 확인

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);