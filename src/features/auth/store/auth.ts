import { Api } from '@/libs/api';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { User } from '../types/user';
import { LoginForm } from '../utils/login';
import { RegisterForm } from '../utils/register';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => void;
  signin: (data: LoginForm) => Promise<void>;
  signup: (data: RegisterForm) => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  checkAuth: async () => {
    try {
      const token = Cookies.get('token');
      console.log('Token in checkAuth:', token);
      if (!token) {
        console.log('No token found');
        set({ user: null, isAuthenticated: false });
        return;
      }

      const res = await Api.get('/me');
      console.log('User data fetched:', res.data);
      set({ user: res.data, isAuthenticated: true });
    } catch (error) {
      console.error('Error in checkAuth:', error);
      set({ user: null, isAuthenticated: false });
      Cookies.remove('token');
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    Cookies.remove('token');
    toast.success('Logout success');
  },

  signin: async (data: LoginForm) => {
    try {
      set({ isLoading: true });
      const res = await Api.post('/login', data);
      const { token, user } = res.data;

      Cookies.set('token', token, { expires: 7 });
      set({ user, isAuthenticated: true });
  
      toast.success('Login success');
    } catch (error: any) {
      console.log('Login error:', error?.response?.data?.message || error);
      toast.error('Login failed');
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (data: RegisterForm) => {
    try {
      set({ isLoading: true });
      const res = await Api.post('/register', data);
      set({ user: res.data, isAuthenticated: false });
      toast.success('Register success');
    } catch (error: any) {
      console.log('Login error:', error?.response?.data?.message || error);
      toast.error('Login failed');
    } finally {
      set({ isLoading: false });
    }
  },
}));
