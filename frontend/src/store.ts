import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import promptReducer from './features/prompt/promptSlice';
import categoriesReducer from './features/categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    prompts: promptReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;



