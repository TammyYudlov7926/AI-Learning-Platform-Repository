import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  token: string | null;
  role: 'USER' | 'ADMIN' | null;
  phone: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role') as 'USER' | 'ADMIN' | null,
  phone: localStorage.getItem('phone'),
  isAuthenticated: !!localStorage.getItem('token'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<Omit<UserState, 'isAuthenticated'>>) {
      const { token, role, phone } = action.payload;
      state.token = token;
      state.role = role;
      state.phone = phone;
      state.isAuthenticated = true;

      if (token) localStorage.setItem('token', token);
      if (role) localStorage.setItem('role', role);
      if (phone) localStorage.setItem('phone', phone);
    },
    logout(state) {
      state.token = null;
      state.role = null;
      state.phone = null;
      state.isAuthenticated = false;

      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('phone');
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;


