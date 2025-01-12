// src/store/useGameStore.js
import { defineStore } from 'pinia';
import {
  createGame,
  joinGame,
  leaveGame,
  fetchGameInfo,
  buildFactory,
} from '@/api/gameAPI'; // API 호출 모듈 임포트

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    currentGameId: null,
    pollutionLevel: 0,
    credits: 0,
    day: 1,
    lastActivity: null,
    players: [],
    factories: [],
    purificationFacilities: [],
  }),

  actions: {
    async createGame(payload) {
      try {
        const game = await createGame(payload);
        this.currentGameId = game.gameId;
        return game;
      } catch (error) {
        console.error('게임 생성 실패:', error);
        throw error;
      }
    },
    async joinGame(gameId, playerId) {
      try {
        const message = await joinGame(gameId, playerId);
        console.log(message);
      } catch (error) {
        console.error('게임 참여 실패:', error);
        throw error;
      }
    },
    async leaveGame(gameId, playerId) {
      try {
        const message = await leaveGame(gameId, playerId);
        console.log(message);
        if (this.currentGameId === gameId) {
          this.currentGameId = null;
        }
      } catch (error) {
        console.error('게임 나가기 실패:', error);
        throw error;
      }
    },
    async fetchGameInfo(gameId) {
      try {
        const data = await fetchGameInfo(gameId);
        this.currentGameId = data.gameId;
        this.pollutionLevel = data.pollutionLevel;
        this.credits = data.credits || 0;
        this.day = data.day;
        this.lastActivity = data.lastActivity;
        this.players = data.players;
        this.factories = data.factories;
        this.purificationFacilities = data.purificationFacilities;
      } catch (error) {
        console.error('게임 정보 조회 실패:', error);
        throw error;
      }
    },
    async buildFactory(gameId, factoryType, location) {
      try {
        const factory = await buildFactory(gameId, factoryType, location);
        this.factories.push(factory);
      } catch (error) {
        console.error('공장 건설 실패:', error);
        throw error;
      }
    },
    // ... 정수 시설, 자원 거래, 투표, 리더보드 등등, API 정의서에 따라 추가
  },
});
