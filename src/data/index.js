import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.request.use(req => {
  req.headers.common['Accept'] = 'appilication/json';
  req.headers.common['Context-Type'] = 'appilication/json';

  return req;
});

axiosInstance.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401 && err.response.data.message !== 'login-failed') {
      localStorage.removeItem('user');
      window.location.reload();
    }

    Promise.reject(err);

  }
);

export default axiosInstance;
