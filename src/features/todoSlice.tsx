import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = { todo: string; _id: number };

const initialState: SliceState[] = [{ todo: "Loading...", _id: 0 }];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<SliceState>) => {
      return [action.payload, ...state];
    },

    setMultipleTodos: (state, action: PayloadAction<SliceState[]>) => {
      return action.payload;
    },
  },
});

export const { setTodo, setMultipleTodos } = todoSlice.actions;

export default todoSlice.reducer;
