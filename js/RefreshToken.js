import axios from 'axios';

//  base Requset 
const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2  with every request 
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config; 
      // _RETRAY  عامل زي استماره كد علشان نعلم كل ريسبونس هل انا حاولت قبل كده اني  اعمله اكسس توكن جديد وفشلت ؟ لو اه خلاص روح اعمل البروميس بتاع الايرورو لةو لاء نجينيريت ريفريش توكن 
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post('https://api.example.com/refresh', {
          token: refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } 
      catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;