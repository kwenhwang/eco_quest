require('dotenv').config(); // 환경 변수 로드
const express = require('express');
const app = express();

// 미들웨어 설정 (순서 중요!)
app.use(express.json());  // JSON 파싱 미들웨어를 먼저 설정

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} [${req.method}] ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

// 라우터 불러오기
const router = require('./routes'); // 전체 라우터 파일

// API 라우터 연결
app.use('/api', router); // 기본 경로로 설정

// DB 연결 확인
const db = require('./db');
db.raw('SELECT 1+1 AS result')
  .then((res) => console.log('DB 연결 성공:', res.rows))
  .catch((err) => console.error('DB 연결 실패:', err.message));

// 서버 실행 (테스트 환경에서는 동적으로 포트 할당)
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
  });
}

module.exports = app; // 테스트를 위해 app을 모듈로 내보냄
