# ECO_QUEST 백엔드

## 프로젝트 구조
```
backend/
├── src/
│   ├── controllers/    # 요청/응답 처리 컨트롤러
│   ├── models/        # 데이터베이스 모델
│   ├── routes/        # API 라우트 정의
│   ├── services/      # 비즈니스 로직 처리
│   └── utils/         # 유틸리티 함수
├── .env               # 환경 변수 설정
├── app.js            # Express 앱 설정
├── package.json      # 프로젝트 의존성 및 스크립트
├── README.md         # 프로젝트 문서
└── index.js         # 서버 시작점
```

## 설치 방법
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 서버 실행
npm start
```

## 주요 기능
- 사용자 인증 및 인가
- 게임 상태 관리
- 실시간 게임 데이터 처리
- WebSocket 통신
- 데이터베이스 연동

## 개발 가이드
### 환경 설정
1. `.env.example`을 복사하여 `.env` 파일 생성
2. 데이터베이스 및 서버 환경 변수 설정

### API 개발
1. `routes/`에 새로운 라우트 추가
2. `controllers/`에 해당 요청 처리 로직 구현
3. `services/`에 비즈니스 로직 구현
4. `models/`에 필요한 데이터 모델 정의

## 테스트
```bash
# 단위 테스트 실행
npm test

# 테스트 커버리지 확인
npm run test:coverage
```

## 문의사항
프로젝트 관련 문의는 이슈를 통해 등록해주세요.

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/31313424/d07c0e3f-8a04-4377-8471-389f073bea02/paste.txt