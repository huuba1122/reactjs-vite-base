import axios from 'axios';
import LocalStorageService from '../utils/local-storage';

// refresh token
const refreshToken = async (retries) => {
  return new Promise((resolve, reject) => {
    const refreshUrl = '/auth/refresh/';
    const token = LocalStorageService.get('refreshToken');
    const request = (times) => {
      axios
        .post(refreshUrl, { refreshToken: token })
        .then((res) => resolve(res.data))
        .catch((error) => {
          if (times > 1) {
            console.log('refreshing time: ', times);
            const remainingTimes = times - 1;
            request(remainingTimes);
          } else {
            console.log('Error refreshing');
            reject(error);
          }
        });
    };

    request(retries);
  });
};

const setToken = (token) => {
  const { refreshToken, accessToken } = token ?? {};
  LocalStorageService.set('refreshToken', refreshToken);
  LocalStorageService.set('accessToken', accessToken);
};

const clearToken = () => {
  LocalStorageService.remove('refreshToken');
  LocalStorageService.remove('accessToken');
};

export { refreshToken, setToken, clearToken };
