import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    data: []
  },
  reducers: {
    set: (state, payload) => {
      state.data = payload.payload;
    },
    add: (state, payload) => {
      state.data = [...state.data, payload.payload];
    },
    update: (state, payload) => {
      const data = [...state.data];
      const index = data.findIndex(item => item.id === payload.payload.id);
      data[index] = payload.payload;
      state.data = data;
    },
    remove: (state, payload) => {
      state.data = state.data.filter((value, index, array) => {
          return value.id !== payload.payload.id;
      })
    }
  },
})

export const { add, update, remove, set } = todoSlice.actions

export default todoSlice.reducer