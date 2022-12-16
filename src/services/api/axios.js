import axios from 'axios';

import { BASE_API_URL, LANGUAGE_DEFAULT } from '@src/configs';

import LocalStorageService from '../utils/local-storage';
import { redirectToLogin } from '../utils/navigate';
import { refreshToken, setToken, clearToken } from './auth';
import { ERROR_CODES } from '../constants/request';

// ----------------------------------------------------
const axiosInstance = axios.create({
  baseURL: BASE_API_URL
});

// add a request interceptor
axiosInstance.interceptors.request.use((request) => requestHandler(request));

// add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => responseErrorHandler(error)
);

const requestHandler = (request) => {
  request.withCredentials = false;
  //   request.xsrfHeaderName = 'X-CSRFToken';
  //   request.xsrfCookieName = 'csrftoken';
  const accessToken = LocalStorageService.get('accessToken');
  request.headers = {
    Authorization: accessToken ? `JWT ${accessToken}` : undefined,
    'Accept-Language': LocalStorageService.get('lang') || LANGUAGE_DEFAULT
  };
  return request;
};

let refreshing = null;
const responseErrorHandler = async (axiosError) => {
  const originalConfig = axiosError.config;
  if (axiosError.response?.status === ERROR_CODES.invalidToken) {
    try {
      refreshing = refreshing || refreshToken(2);
      console.log('call refresh Token');
      const token = await refreshing;
      console.log('refresh', token);
      setToken(token);
      return axiosInstance(originalConfig);
    } catch (error) {
      console.log('refresh token error', error);
      clearToken();
      // redirectToLogin();
      return Promise.reject(error);
    } finally {
      console.log('cleanup');
      refreshing = null;
    }
  }
  return Promise.reject(axiosError);
};

export default axiosInstance;
