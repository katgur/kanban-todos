import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Status, Todo } from '../types';
import { RootState } from '../app/store';

interface TodoState {
  items: Todo[],
}

const initialState: TodoState = {
  items: []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
    add: (state, action: PayloadAction<Todo>) => {
      state.items = [...state.items, action.payload];
    },
    update: (state, action: PayloadAction<Todo>) => {
      const data = [...state.items];
      const index = data.findIndex(item => item.id === action.payload.id);
      data[index] = action.payload;
      state.items = data;
    },
    remove: (state, action: PayloadAction<Todo>) => {
      state.items = state.items.filter(item => {
        return item.id !== action.payload.id;
      })
    }
  },
})

export const { add, update, remove, set } = todoSlice.actions

export const getByStatus = (status: Status) => {
  return (state: RootState) => state.todo.items.filter(item => item.status === status);
}

export const getTodoById = (id: string) => {
  return (state: RootState) => state.todo.items.find(item => item.id === id);
}

export default todoSlice.reducer