import { createSlice } from "@reduxjs/toolkit";

interface loaderState {
    loading: boolean
}


const initialState: loaderState={
    loading:false
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
  },
});


export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;