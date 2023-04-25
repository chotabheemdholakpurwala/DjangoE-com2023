import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = 'http://localhost:8000/';

axios.interceptors.request.use(function (config) {
  const access_token = localStorage.getItem('access_token');
  
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refresh_token = localStorage.getItem('refresh_token');

    if (refresh_token) {
      try {
        const { exp } = jwt_decode(refresh_token);
        const expirationTime = dayjs.unix(exp);

        if (expirationTime.diff(dayjs()) > 1) {
          const response = await axios.post('/token/refresh/', {
            refresh: refresh_token
          });

          localStorage.setItem('access_token', response.data.access);

          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

          return axios(originalRequest);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return Promise.reject(error);
});

export default axios;
