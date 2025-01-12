# ECO_QUEST 실행 가이드

## 1. 사전 준비
1) **Node.js** (16 이상)
2) **npm** 또는 **yarn**
3) **PostgreSQL** (13 이상 권장)
4) **Git** (프로젝트 클론을 위해)

## 2. 환경 변수 설정
- **백엔드** 폴더(`backend/`)에 `.env` 파일 생성:
DB_HOST=localhost
DB_USER=postgres
DB_PASS=postgres
DB_NAME=eco_quest
JWT_SECRET=yourSecretKey
PORT=3000

- 실제 값은 환경에 맞게 수정

## 3. 데이터베이스 초기화
- `database/init.sql` 또는 `docs/db_schema.md` 참고
- PostgreSQL 콘솔에서:
createdb eco_quest
psql -d eco_quest -f database/init.sql


## 4. 백엔드 서버 구동
cd backend
npm install
npm run start

- 기본적으로 `http://localhost:3000`

## 5. 프론트엔드 개발 서버
cd frontend
npm install
npm run serve

- 기본적으로 `http://localhost:8080`

## 6. 정상 동작 확인
1) 브라우저에서 `http://localhost:8080` 접속
2) 회원가입 → 로그인
3) 새 게임 생성 → 참여
4) 공장/정수 시설 테스트

## 7. 추가 옵션
- **npm run dev**: nodemon 등 실시간 빌드(백엔드)
- **npm run build**: 프론트엔드 릴리스 빌드
- Dockerfile이나 AWS 배포 스크립트는 필요 시 추가
</details>