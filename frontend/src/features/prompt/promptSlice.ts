// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { sendPrompt } from '../../services/promptService';

// export const createPrompt = createAsyncThunk(
//   'prompt/create',
//   async ({ prompt, categoryId, subCategoryId }: { prompt: string; categoryId: number; subCategoryId: number }, thunkAPI) => {
//     const state: any = thunkAPI.getState();
//     const token = state.user.token;
//     return await sendPrompt({ prompt, categoryId, subCategoryId }, token);
//   }
// );

// const promptSlice = createSlice({
//   name: 'prompt',
//   initialState: { loading: false, result: '', error: '' },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createPrompt.pending, (state) => {
//         state.loading = true;
//         state.result = '';
//         state.error = '';
//       })
//       .addCase(createPrompt.fulfilled, (state, action) => {
//         state.result = action.payload.response;
//         state.loading = false;
//       })
//       .addCase(createPrompt.rejected, (state, action) => {
//         state.error = 'Failed to get response';
//         state.loading = false;
//       });
//   },
// });

// export default promptSlice.reducer;
export {};