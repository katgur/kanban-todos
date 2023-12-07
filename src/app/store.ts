import { configureStore } from '@reduxjs/toolkit'
import { todoSlice } from "../features/todoSlice"

const store = configureStore({
    reducer: {
        todo: todoSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export default store