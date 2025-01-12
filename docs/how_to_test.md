# ECO_QUEST 테스트 가이드

## 1. 단위 테스트
- **도구**: Jest
- **실행 방법**:
    ```
    cd backend
    npm run test
    ```

## 2. 엔드투엔드 테스트
- **도구**: Cypress
- **실행 방법**:
    ```
    cd frontend
    npm run test:e2e
    ```

## 3. API 테스트
- **도구**: Postman, VS Code REST Client
- **사용 방법**:
    - Postman 컬렉션 임포트
    - 각 엔드포인트 테스트

## 4. WebSocket 테스트
- **도구**: Socket.IO Tester
- **검증 방법**:
    - 실시간 이벤트 수신 확인
    - 클라이언트 간 데이터 동기화 테스트
