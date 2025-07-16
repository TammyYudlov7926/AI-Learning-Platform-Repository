// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchCategories } from '../../api/authService';

// export const loadCategories = createAsyncThunk('category/load', async () => {
//   return await fetchCategories();
// });

// const categorySlice = createSlice({
//   name: 'category',
//   initialState: { categories: [], loading: false },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loadCategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loadCategories.fulfilled, (state, action) => {
//         state.categories = action.payload;
//         state.loading = false;
//       })
//       .addCase(loadCategories.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export default categorySlice.reducer;
export {};