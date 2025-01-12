<!-- src/pages/LoginView.vue -->
<template>
    <div>
      <h2>로그인</h2>
      <form @submit.prevent="onSubmit">
        <label>아이디</label>
        <input v-model="username" />
        <label>비밀번호</label>
        <input v-model="password" type="password" />
        <button type="submit">로그인</button>
      </form>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useUserStore } from '@/store/useUserStore';
  import { useRouter } from 'vue-router';
  
  const userStore = useUserStore();
  const router = useRouter();
  
  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');
  
  async function onSubmit() {
    try {
      await userStore.login(username.value, password.value);
      router.push('/lobby');  // 로그인 성공 시 로비 페이지로 이동
    } catch (err) {
      errorMessage.value = err.response?.data?.error || '로그인 실패';
    }
  }
  </script>
  