import { configureStore } from '@reduxjs/toolkit'
import entriesReducer from '../features/entries/entriesSlice'

export default configureStore({
  reducer: {
    entries: entriesReducer,
  },
})
