// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/pages/HomeView.vue';
import LoginView from '@/pages/LoginView.vue';
import GameLobbyView from '@/pages/GameLobbyView.vue';
import GameView from '@/pages/GameView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/lobby', name: 'lobby', component: GameLobbyView },
  { path: '/game/:gameId', name: 'game', component: GameView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
