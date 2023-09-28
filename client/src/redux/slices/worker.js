import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

const initialState = {
  items: [],
};

const slice = createSlice({
  name: "worker",
  initialState,
  reducers: {
    addWorker(state, action) {
      state.items.push(action.payload);
    },

    deleteWorker(state, action) {
      const { name } = action.payload;
      const idx = state.items.findIndex((opt) => opt.name === name);
      if (idx > -1) {
        state.items.splice(idx, 1);
      }
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { addWorker, deleteWorker } = slice.actions;
