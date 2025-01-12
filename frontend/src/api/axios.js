import axios from 'axios';

// Axios 기본 설정
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api', // 환경 변수에서 Base URL 가져오기
  headers: {
    'Content-Type': 'application/json', // JSON 데이터
  },
});

// 요청 인터셉터 (선택)
apiClient.interceptors.request.use(
  (config) => {
    // 인증 토큰 추가 예시
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (선택)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 요청 오류:', error);
    throw error;
  }
);

export default apiClient;
