import apiClient from './apiClient.js';

export const getPublicPortfolio = async (username) => {
  const response = await apiClient.get(`/users/${username}`);
  return response.data;
};

export const sendContactMessage = async (username, messageData) => {
  const response = await apiClient.post(`/contact/${username}`, messageData);
  return response.data;
};
