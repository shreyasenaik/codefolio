import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor: automatically inject Bearer token into outgoing requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('codefolio_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: handle global 401 unauth
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token expired or invalid, clear local auth
      if (localStorage.getItem('codefolio_token')) {
        localStorage.removeItem('codefolio_token');
        localStorage.removeItem('codefolio_user');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
