# ECO_QUEST API 사양서

## 1. 기본 정보
- **Base URL**: `http://localhost:3000/api`
- **인증 방식**: JWT (Bearer 토큰)

## 2. API 엔드포인트

### 2.1 사용자 관리
| 기능 | Method | 엔드포인트 | 설명 |
|------|---------|------------|------|
| 로그인 | POST | /users/login | 사용자 로그인 |
| 로그아웃 | POST | /users/logout | 사용자 로그아웃 |
| 회원가입 | POST | /users/register | 새 사용자 등록 |

### 2.2 게임 관리
| 기능 | Method | 엔드포인트 | 설명 |
|------|---------|------------|------|
| 게임 생성 | POST | /games | 새 게임 생성 |
| 게임 참여 | POST | /games/{gameId}/players | 게임 참여 |
| 게임 나가기 | DELETE | /games/{gameId}/players/{playerId} | 게임에서 나가기 |
| 게임 정보 조회 | GET | /games/{gameId} | 게임 상태 조회 |
| 게임 상태 조회 | GET | /games/{gameId}/status | 현재 게임 상태 조회 |

### 2.3 시설 관리
| 기능 | Method | 엔드포인트 | 설명 |
|------|---------|------------|------|
| 공장 건설 | POST | /games/{gameId}/factories | 공장 건설 |
| 공장 정보 조회 | GET | /games/{gameId}/factories | 전체 공장 정보 조회 |
| 특정 공장 조회 | GET | /games/{gameId}/factories/{factoryId} | 특정 공장 정보 조회 |
| 공장 업그레이드 | PUT | /games/{gameId}/factories/{factoryId} | 공장 업그레이드 |
| 공장 철거 | DELETE | /games/{gameId}/factories/{factoryId} | 공장 철거 |

### 2.4 정수 시설 관리
| 기능 | Method | 엔드포인트 | 설명 |
|------|---------|------------|------|
| 정수 시설 건설 | POST | /games/{gameId}/purification-facilities | 정수 시설 건설 |
| 정수 시설 조회 | GET | /games/{gameId}/purification-facilities | 전체 정수 시설 조회 |
| 특정 정수 시설 조회 | GET | /games/{gameId}/purification-facilities/{facilityId} | 특정 정수 시설 조회 |
| 정수 시설 업그레이드 | PUT | /games/{gameId}/purification-facilities/{facilityId} | 정수 시설 업그레이드 |
| 정수 시설 철거 | DELETE | /games/{gameId}/purification-facilities/{facilityId} | 정수 시설 철거 |

### 2.5 기타 기능
| 기능 | Method | 엔드포인트 | 설명 |
|------|---------|------------|------|
| 자원 거래 생성 | POST | /games/{gameId}/trades | 자원 거래 생성 |
| 거래 정보 조회 | GET | /games/{gameId}/trades | 거래 정보 조회 |
| 환경 정책 투표 | POST/PUT | /games/{gameId}/votes | 투표 시작/종료 |
| 투표 결과 조회 | GET | /games/{gameId}/votes/result | 투표 결과 조회 |
| 순위 정보 조회 | GET | /leaderboard | 전체 순위 정보 조회 |

## 3. WebSocket 이벤트
- **factoryBuilt**: 공장 건설 알림
- **pollutionUpdated**: 오염도 변화 알림
- **creditUpdated**: 크레딧 변화 알림
- **constructionStarted**: 건설 시작 알림
- **tradeCreated**: 거래 생성 알림

## 4. 공통 응답 형식
### 성공 응답
```json
{
  "data": {}, // 응답 데이터
  "message": "Success message"
}
```

### 에러 응답
```json
{
  "error": "에러 메시지",
  "code": 400 // HTTP 상태 코드
}
```

