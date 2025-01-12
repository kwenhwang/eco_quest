process.env.NODE_ENV = 'test';
process.env.PORT = 3001; // 테스트 환경에서 사용할 포트
jest.setTimeout(30000); // 테스트 타임아웃 30초