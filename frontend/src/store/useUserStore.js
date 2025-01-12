// src/store/useUserStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: null,
    userId: null,
    username: '',
    isLoggedIn: false,
  }),
  actions: {
    async login(username, password) {
      try {
        const res = await axios.post('/api/users/login', { username, password });
        this.token = res.data.token;
        this.userId = res.data.userId;
        this.username = username;
        this.isLoggedIn = true;

        // 요청 헤더에 토큰 설정
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      } catch (err) {
        console.error('로그인 실패:', err.response?.data?.error);
        throw err;
      }
    },
    async logout() {
      try {
        await axios.post('/api/users/logout'); // 서버가 토큰 무효화 처리
      } catch (err) {
        console.warn('로그아웃 중 에러:', err);
      } finally {
        // 클라이언트 상태 초기화
        this.token = null;
        this.userId = null;
        this.username = '';
        this.isLoggedIn = false;
        delete axios.defaults.headers.common.Authorization;
      }
    },
    async register({ username, password, email }) {
      const res = await axios.post('/api/users/register', {
        username,
        password,
        email
      });
      // 회원가입 후 자동 로그인 로직이 필요하다면 여기서 login() 호출
      return res.data;
    }
  }
});
