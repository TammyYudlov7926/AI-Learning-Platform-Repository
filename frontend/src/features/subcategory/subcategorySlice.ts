// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchSubCategories } from '../../services/subcategoryService';

// export const loadSubCategories = createAsyncThunk('subcategory/load', async () => {
//   return await fetchSubCategories();
// });

// const subCategorySlice = createSlice({
//   name: 'subcategory',
//   initialState: { subcategories: [], loading: false },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loadSubCategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loadSubCategories.fulfilled, (state, action) => {
//         state.subcategories = action.payload;
//         state.loading = false;
//       })
//       .addCase(loadSubCategories.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export default subCategorySlice.reducer;
export {};