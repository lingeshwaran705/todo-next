import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = { text: string; id: number }[];
const initialState: SliceState = [{ text: "hello", id: 0 }];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state = [...state, action.payload];
    },
  },
});

export const { setTodo } = todoSlice.actions;

export default todoSlice.reducer;
