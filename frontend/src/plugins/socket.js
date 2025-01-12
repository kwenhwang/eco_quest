// src/plugins/socket.js (임의 파일명)
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  // withCredentials: true,
});

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

export default socket;
