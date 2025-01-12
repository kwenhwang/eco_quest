import apiClient from './axios';

// 로그인
export const login = async (username, password) => {
  const response = await apiClient.post('/users/login', { username, password });
  return response.data;
};

// 회원가입
export const register = async (username, password, email) => {
  const response = await apiClient.post('/users/register', { username, password, email });
  return response.data;
};

// 로그아웃
export const logout = async () => {
  const response = await apiClient.post('/users/logout');
  return response.data;
};
