// src/api/gameAPI.js
import apiClient from './axios';

// 게임 API 호출 함수들
export const createGame = async (payload) => {
  const response = await apiClient.post('/games', payload);
  return response.data;
};

export const joinGame = async (gameId, playerId) => {
  const response = await apiClient.post(`/games/${gameId}/players`, { playerId });
  return response.data;
};

export const leaveGame = async (gameId, playerId) => {
  const response = await apiClient.delete(`/games/${gameId}/players/${playerId}`);
  return response.data;
};

export const fetchGameInfo = async (gameId) => {
  const response = await apiClient.get(`/games/${gameId}`);
  return response.data;
};

export const buildFactory = async (gameId, factoryType, location) => {
  const response = await apiClient.post(`/games/${gameId}/factories`, {
    factoryType,
    location,
  });
  return response.data;
};
