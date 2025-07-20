import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { promptsAPI } from '../../api/prompts.api';

export interface Prompt {
  id: number;
  prompt: string;
  response: string;
  createdAt: string;
  category?: { name: string };
  subCategory?: { name: string };
}

interface PromptsState {
  prompts: Prompt[];
  loading: boolean;
  error: string | null;
  currentResponse: string | null;
}

const initialState: PromptsState = {
  prompts: [],
  loading: false,
  error: null,
  currentResponse: null,
};

export const fetchUserPrompts = createAsyncThunk(
  'prompts/fetchUserPrompts',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await promptsAPI.getUserPrompts(userId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching prompts');
    }
  }
);

export const createPrompt = createAsyncThunk(
  'prompts/createPrompt',
  async ({ categoryId, subCategoryId, prompt }: { categoryId: number; subCategoryId: number; prompt: string }, { rejectWithValue }) => {
    try {
      return await promptsAPI.createPrompt(categoryId, subCategoryId, prompt);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error creating prompt');
    }
  }
);

const promptSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    clearCurrentResponse: (state) => {
      state.currentResponse = null;
    },
  },
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
      })
      .addCase(createPrompt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPrompt.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResponse = action.payload.response;
      })
      .addCase(createPrompt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentResponse } = promptSlice.actions;
export default promptSlice.reducer;
