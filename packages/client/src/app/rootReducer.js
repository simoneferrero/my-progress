import { combineReducers } from 'redux'

import entriesReducer from '../features/entries/entriesSlice'

export default combineReducers({
  entries: entriesReducer,
})
