// jest.config.js 혹은 테스트 초기에 명시
require('dotenv').config(); // 또는 .env.test 등 테스트용 환경파일 명시

module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['./tests/setup.js'], // 타임아웃 설정 파일 추가
  testTimeout: 10000,
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './html-report',
      filename: 'report.html',
      openReport: true,
      includeFailureMsg: true,
      expand: true,
    }],
  ],
};
