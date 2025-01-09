import { apiURL } from '../utils/baseURL';
import axios from 'axios';
import Cookies from 'js-cookie';

export const Api = axios.create({
  baseURL: apiURL
}); 

Api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});