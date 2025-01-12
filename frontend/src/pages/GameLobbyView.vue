<!-- src/pages/GameLobbyView.vue -->
<template>
    <div>
      <h2>게임 로비</h2>
      <button @click="createNewGame">새 게임 생성</button>
      <ul>
        <li v-for="(game, index) in gameList" :key="index">
          <span>Game #{{ game.gameId }}</span>
          <button @click="join(game.gameId)">참여</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useGameStore } from '@/store/useGameStore';
  import { useRouter } from 'vue-router';
  
  const gameStore = useGameStore();
  const router = useRouter();
  const gameList = ref([]);
  
  async function createNewGame() {
    const newGameId = await gameStore.createGame({ mapWidth: 50, mapHeight: 50 });
    // 새 게임 생성 후 자동 참여 로직(?)
    // gameStore.joinGame(newGameId, userStore.userId);
    router.push(`/game/${newGameId}`);
  }
  
  async function join(gameId) {
    // playerId는 백엔드 API 스펙에 맞춰 필요
    // const userId = userStore.userId;
    // await gameStore.joinGame(gameId, userId);
    router.push(`/game/${gameId}`);
  }
  
  async function fetchGames() {
    // 임시: API 스펙에 맞춰 /games 목록 가져오기
    const res = await axios.get('/api/games'); // 만약에 GET /games가 전체 목록을 반환하기로 되어 있으면
    gameList.value = res.data; // [{ gameId: 1, ...}, { gameId:2, ...}, ...]
  }
  
  onMounted(() => {
    fetchGames();
  });
  </script>
  