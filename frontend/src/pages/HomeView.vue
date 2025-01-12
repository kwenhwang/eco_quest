<template>
  <div>
    <h1>Home</h1>
    <p>현재 오염도: {{ pollutionLevel }}%</p>
    <button @click="loadGame">게임 데이터 로드</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 간단한 테스트용 상태
const pollutionLevel = ref(50);

function loadGame() {
  console.log('게임 데이터를 로드합니다...');
  // 실제 API 호출 로직 추가 필요
}
</script>
