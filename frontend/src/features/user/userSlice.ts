import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  role: string | null;
  phone: string | null;
}

const initialState: UserState = {
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
  phone: localStorage.getItem('phone'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<UserState>) {
      const { token, role, phone } = action.payload;
      state.token = token;
      state.role = role;
      state.phone = phone;

     
      localStorage.setItem('token', token ?? '');
      localStorage.setItem('role', role ?? '');
      localStorage.setItem('phone', phone ?? '');
    },
    logout(state) {
      state.token = null;
      state.role = null;
      state.phone = null;
       localStorage.clear();

      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('phone');
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;


