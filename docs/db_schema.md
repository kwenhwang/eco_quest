# ECO_QUEST 데이터베이스 스키마

## 1. 기본 정보
- **DBMS**: PostgreSQL
- **ORM**: Knex.js
- **기본 문자셋**: UTF-8

## 2. ENUM 타입 정의
```sql
CREATE TYPE game_status AS ENUM ('waiting', 'playing', 'finished');
CREATE TYPE vote_status AS ENUM ('active', 'completed', 'cancelled');
CREATE TYPE trade_status AS ENUM ('pending', 'completed', 'cancelled');
```

## 3. 테이블 구조

### 3.1 사용자 관련 테이블
```sql
-- 사용자 테이블
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    nickname VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 플레이어 테이블
CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.2 게임 관련 테이블
```sql
-- 게임 테이블
CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    status game_status NOT NULL DEFAULT 'waiting',
    game_mode VARCHAR(255),
    max_players INTEGER,
    map VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 게임 참여 테이블
CREATE TABLE game_participation (
    game_id INTEGER NOT NULL REFERENCES games(game_id) ON DELETE CASCADE,
    player_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id, player_id)
);
```

### 3.3 건물 및 위치 관련 테이블
```sql
-- 위치 테이블
CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    x INTEGER CHECK (x >= 0),
    y INTEGER CHECK (y >= 0)
);

-- 건물 테이블
CREATE TABLE buildings (
    building_id SERIAL PRIMARY KEY,
    player_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    location_id INTEGER NOT NULL REFERENCES locations(location_id) ON DELETE CASCADE,
    type VARCHAR(255),
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.4 거래 관련 테이블
```sql
CREATE TABLE trades (
    trade_id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    receiver_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    status trade_status DEFAULT 'pending',
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.5 리더보드 테이블
```sql
CREATE TABLE leaderboard (
    game_id INTEGER NOT NULL REFERENCES games(game_id) ON DELETE CASCADE,
    leaderboard_type VARCHAR(255),
    player_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    score INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id, leaderboard_type, player_id)
);
```

## 4. 인덱스
```sql
CREATE INDEX idx_players_user_id ON players(user_id);
CREATE INDEX idx_game_participation_game ON game_participation(game_id);
CREATE INDEX idx_leaderboard_game_type ON leaderboard(game_id, leaderboard_type);
CREATE INDEX idx_buildings_player ON buildings(player_id);
CREATE INDEX idx_trades_sender ON trades(sender_id);
CREATE INDEX idx_trades_receiver ON trades(receiver_id);
```

## 5. 제약조건
- 모든 외래 키에 ON DELETE CASCADE 적용
- locations 테이블의 x, y 좌표에 음수 값 제한
- 유니크 제약: users.username, users.email
- 복합 기본 키: game_participation(game_id, player_id)
- NOT NULL 제약: 필수 필드에 적용

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/31313424/d07c0e3f-8a04-4377-8471-389f073bea02/paste.txt