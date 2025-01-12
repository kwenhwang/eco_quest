# ECO_QUEST

## 소개
ECO_QUEST는 환경 보호와 경제 경영을 동시에 체험할 수 있는 **웹 기반 시뮬레이션 게임**입니다. 중학생 이상의 사용자에게 환경 문제와 경제 시스템의 기본 개념을 교육하는 것을 목표로 합니다.

## 주요 기능
- 공장 건설 및 운영
- 오염도 관리 및 정화 시설 운영
- 자원 거래 및 경제 시스템
- 실시간 멀티플레이어 상호작용
- RESTful API 및 WebSocket을 통한 실시간 업데이트

## 폴더 구조
- **backend/**: 서버 로직, DB 연동, API
- **frontend/**: Vue.js 기반 프론트엔드 코드
- **assets/**: 공용 이미지/사운드 리소스
- **docs/**: 게임 기획서, API 명세, DB 스키마 정의 등 문서
- **tests/**: 단위/통합/엔드투엔드 테스트 코드

## 빠른 시작
1. **Node.js** 설치 (버전 16 이상)
2. **PostgreSQL** 설치 후 DB 스키마 생성 (`docs/db_schema.md` 참고)
3. **백엔드 실행**:
    ```
    cd backend
    npm install
    npm run start
    ```
4. **프론트엔드 실행**:
    ```
    cd frontend
    npm install
    npm run serve
    ```
5. 브라우저에서 `http://localhost:8080` 접속

자세한 내용은 [docs/how_to_run.md](./docs/how_to_run.md) 참고.
