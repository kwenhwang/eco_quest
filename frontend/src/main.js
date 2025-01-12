// src/main.js
import { createApp } from 'vue';
import App from './App.vue';

// Pinia
import { createPinia } from 'pinia';

// Router
import router from './router';

// 전역 CSS
import '@/assets/styles/main.css';
//import '@/assets/styles/base.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
