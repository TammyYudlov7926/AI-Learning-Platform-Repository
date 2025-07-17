import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import promptReducer from './features/prompt/promptSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    prompts: promptReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;



