<!-- src/pages/GameView.vue -->
<template>
    <div>
      <h2>게임 화면 (ID: {{ gameId }})</h2>
      <p>오염도: {{ gameStore.pollutionLevel }}%</p>
      <p>현재 일자: {{ gameStore.day }}</p>
      <p>마지막 활동: {{ gameStore.lastActivity }}</p>
      <button @click="leaveThisGame">게임 나가기</button>
  
      <h3>공장 목록</h3>
      <ul>
        <li v-for="f in gameStore.factories" :key="f.factoryId">
          공장 #{{ f.factoryId }} ({{ f.factoryType }}, 레벨 {{ f.level }})
        </li>
      </ul>
  
      <button @click="buildBasicFactory">기본 공장 건설</button>
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useGameStore } from '@/store/useGameStore';
  
  const route = useRoute();
  const router = useRouter();
  const gameStore = useGameStore();
  
  // 라우트 파라미터 gameId
  const gameId = computed(() => route.params.gameId);
  
  onMounted(async () => {
    await gameStore.fetchGameInfo(gameId.value);
  });
  
  async function buildBasicFactory() {
    await gameStore.buildFactory(gameId.value, 'basic', { x:10, y:20 });
  }
  
  async function leaveThisGame() {
    // playerId가 필요 -> 실제로는 userStore에서 가져옴
    const playerId = 123; 
    await gameStore.leaveGame(gameId.value, playerId);
    router.push('/lobby');
  }
  </script>
  