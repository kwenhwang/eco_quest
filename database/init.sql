-- ENUM 타입 정의
CREATE TYPE game_status AS ENUM ('waiting', 'playing', 'finished');
CREATE TYPE vote_status AS ENUM ('active', 'completed', 'cancelled');
CREATE TYPE trade_status AS ENUM ('pending', 'completed', 'cancelled');
CREATE TYPE building_type AS ENUM ('factory', 'purification_facility');


-- 사용자 관련 테이블
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    nickname VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 게임 관련 테이블
CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    status game_status DEFAULT 'waiting' NOT NULL,
    game_mode VARCHAR(255),
    max_players INTEGER,
    map VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE game_participation (
    game_id INTEGER REFERENCES games(game_id) ON DELETE CASCADE,
    player_id INTEGER REFERENCES players(player_id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id, player_id)
);

-- 건물 관련 테이블
CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    x INTEGER CHECK (x >= 0),
    y INTEGER CHECK (y >= 0)
);

CREATE TABLE buildings (
    building_id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(player_id) ON DELETE CASCADE,
    location_id INTEGER REFERENCES locations(location_id) ON DELETE CASCADE,
    type building_type NOT NULL,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 자원 관련 테이블
CREATE TABLE resource_types (
    resource_type_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE resources (
    resource_id SERIAL PRIMARY KEY,
    resource_type_id INTEGER REFERENCES resource_types(resource_type_id) ON DELETE CASCADE,
    name VARCHAR(255)
);

CREATE TABLE player_resources (
    player_id INTEGER REFERENCES players(player_id) ON DELETE CASCADE,
    resource_id INTEGER REFERENCES resources(resource_id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 0,
    PRIMARY KEY (player_id, resource_id)
);

CREATE TABLE building_resources (
    building_id INTEGER REFERENCES buildings(building_id) ON DELETE CASCADE,
    resource_id INTEGER REFERENCES resources(resource_id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 0,
    PRIMARY KEY (building_id, resource_id)
);

-- 거래 관련 테이블
CREATE TABLE trades (
    trade_id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES players(player_id) ON DELETE CASCADE,
    receiver_id INTEGER REFERENCES players(player_id) ON DELETE CASCADE,
    status trade_status DEFAULT 'pending',
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trade_items (
    trade_item_id SERIAL PRIMARY KEY,
    trade_id INTEGER REFERENCES trades(trade_id) ON DELETE CASCADE,
    resource_id INTEGER REFERENCES resources(resource_id) ON DELETE CASCADE,
    quantity INTEGER
);

-- 투표 관련 테이블
CREATE TABLE votes (
    vote_id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(game_id) ON DELETE CASCADE,
    vote_type VARCHAR(255),
    status vote_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vote_options (
    option_id SERIAL PRIMARY KEY,
    vote_id INTEGER REFERENCES votes(vote_id) ON DELETE CASCADE,
    option_text VARCHAR(255),
    vote_count INTEGER DEFAULT 0
);

-- 리더보드 테이블
CREATE TABLE leaderboard (
    game_id INTEGER REFERENCES games(game_id) ON DELETE CASCADE,
    leaderboard_type VARCHAR(255),
    player_id INTEGER REFERENCES players(player_id) ON DELETE CASCADE,
    score INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id, leaderboard_type, player_id)
);

-- 인덱스 생성
CREATE INDEX idx_players_user_id ON players(user_id);
CREATE INDEX idx_game_participation_game ON game_participation(game_id);
CREATE INDEX idx_game_participation_player ON game_participation(player_id);
CREATE INDEX idx_buildings_player ON buildings(player_id);
CREATE INDEX idx_buildings_location ON buildings(location_id);
CREATE INDEX idx_trades_sender ON trades(sender_id);
CREATE INDEX idx_trades_receiver ON trades(receiver_id);
CREATE INDEX idx_leaderboard_game_type ON leaderboard(game_id, leaderboard_type);
CREATE INDEX idx_votes_game ON votes(game_id);
