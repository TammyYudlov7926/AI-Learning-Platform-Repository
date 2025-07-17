// src/features/prompts/promptSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPrompts } from '../../api/authService';

export const fetchUserPrompts = createAsyncThunk(
  'prompts/fetchUserPrompts',
  async (userId: string, thunkAPI) => {
    try {
      const data = await getUserPrompts(userId);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching prompts');
    }
  }
);

const promptSlice = createSlice({
  name: 'prompts',
  initialState: {
    prompts: [],
    loading: false,
    error: null,
  } as {
    prompts: any[];
    loading: boolean;
    error: string | null;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPrompts.fulfilled, (state, action) => {
        state.loading = false;
        state.prompts = action.payload;
      })
      .addCase(fetchUserPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default promptSlice.reducer;
