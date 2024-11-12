import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  following: string[];
  followers: string[];
  loading: boolean;
  error: string | null;
}

// Check for existing user in localStorage
const storedUser = localStorage.getItem('user');
const storedFollowing = localStorage.getItem('following');
const storedFollowers = localStorage.getItem('followers');

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
  following: storedFollowing ? JSON.parse(storedFollowing) : [],
  followers: storedFollowers ? JSON.parse(storedFollowers) : [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.following = [];
      state.followers = [];
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('following');
      localStorage.removeItem('followers');
    },
    followUser: (state, action: PayloadAction<string>) => {
      if (!state.following.includes(action.payload)) {
        state.following.push(action.payload);
        localStorage.setItem('following', JSON.stringify(state.following));
      }
    },
    unfollowUser: (state, action: PayloadAction<string>) => {
      state.following = state.following.filter(id => id !== action.payload);
      localStorage.setItem('following', JSON.stringify(state.following));
    },
    addFollower: (state, action: PayloadAction<string>) => {
      if (!state.followers.includes(action.payload)) {
        state.followers.push(action.payload);
        localStorage.setItem('followers', JSON.stringify(state.followers));
      }
    },
    removeFollower: (state, action: PayloadAction<string>) => {
      state.followers = state.followers.filter(id => id !== action.payload);
      localStorage.setItem('followers', JSON.stringify(state.followers));
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setUser, 
  logout, 
  followUser, 
  unfollowUser,
  addFollower,
  removeFollower,
  setLoading,
  setError 
} = authSlice.actions;
export default authSlice.reducer;