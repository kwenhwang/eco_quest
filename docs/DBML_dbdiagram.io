// Users & Players
Table users {
  userId int [pk, increment]
  username varchar(255) [unique, not null]
  password varchar(255) [not null]
  email varchar(255) [unique]
  nickname varchar(255)
  created_at timestamp [default: `now()`]
}

Table players {
  playerId int [pk, increment]
  userId int [ref: > users.userId, not null]
  name varchar(255)
  created_at timestamp [default: `now()`]
}

// Game Related
Table games {
  gameId int [pk, increment]
  gameMode varchar(255)
  maxPlayers int
  map varchar(255)
  status varchar(255) // 예: 대기 중, 진행 중, 종료
  created_at timestamp [default: `now()`]
}

Table game_participation {
  gameId int [ref: > games.gameId, not null]
  playerId int [ref: > players.playerId, not null]
  joined_at timestamp [default: `now()`]
  indexes {
    (gameId, playerId) [pk]
  }
}

// Locations
Table locations {
  locationId int [pk, increment]
  x int
  y int
}

// Buildings & Building Attributes
Table buildings {
  buildingId int [pk, increment]
  playerId int [ref: > players.playerId, not null]
  locationId int [ref: > locations.locationId, not null]
  type varchar(255) // 건물 유형 (factory, purification_facility, etc.)
  level int [default: 1]
  created_at timestamp [default: `now()`]
}

Table factory_attributes {
  buildingId int [pk, ref: > buildings.buildingId]
  productionRate float
  pollutionRate float
}

Table purification_facility_attributes {
  buildingId int [pk, ref: > buildings.buildingId]
  purificationRate float
}

// Resources & Trading
Table resource_types { // Added for better normalization
    resourceTypeId int [pk, increment]
    name varchar(255) [unique, not null]
}

Table resources {
  resourceId int [pk, increment]
  resourceTypeId int [ref: > resource_types.resourceTypeId, not null]
  name varchar(255)
}

Table player_resources {
  playerId int [ref: > players.playerId, not null]
  resourceId int [ref: > resources.resourceId, not null]
  quantity int [default: 0]
  indexes {
    (playerId, resourceId) [pk]
  }
}

Table building_resources {
  buildingId int [ref: > buildings.buildingId, not null]
  resourceId int [ref: > resources.resourceId, not null]
  quantity int [default: 0]
  indexes {
    (buildingId, resourceId) [pk]
  }
}

Table trades {
  tradeId int [pk, increment]
  senderId int [ref: > players.playerId, not null]
  receiverId int [ref: > players.playerId, not null]
  status varchar(255) [default: 'pending'] // 예: 요청, 수락, 거절, 완료
  created_at timestamp [default: `now()`]
}

Table trade_items {
  tradeItemId int [pk, increment]
  tradeId int [ref: > trades.tradeId, not null]
  resourceId int [ref: > resources.resourceId, not null]
  quantity int
}

// Game Systems
Table votes {
  voteId int [pk, increment]
  gameId int [ref: > games.gameId, not null]
  voteType varchar(255)
  status varchar(255) // 예: 진행 중, 종료
  created_at timestamp [default: `now()`]
}

Table vote_options {
  optionId int [pk, increment]
  voteId int [ref: > votes.voteId, not null]
  optionText varchar(255)
  voteCount int [default: 0]
}

Table leaderboard {
  leaderboardId int [pk, increment]
  gameId int [ref: > games.gameId, not null]
  leaderboardType varchar(255) // Added for multiple leaderboards
  playerId int [ref: > players.playerId, not null]
  score int [default: 0]
  rank int
  updated_at timestamp [default: `now()`]
  indexes {
    (gameId, leaderboardType)
  }
  }