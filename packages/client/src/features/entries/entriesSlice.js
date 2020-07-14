import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const counterSlice = createSlice({
  name: 'entries',
  initialState: {
    loading: false,
    entriesById: {},
    entriesAllIds: [],
  },
  reducers: {
    getEntriesSuccess: (state, { payload }) => {
      state.entriesById = payload.entries.reduce((allEntries, currentEntry) => ({
        ...allEntries,
        [currentEntry.id]: currentEntry,
      }), {})
      state.entriesAllIds = payload.entries.map(({ id }) => id)
    },
    // TODO: create getEntriesError
    setLoading: (state, { payload }) => {
      state.loading = payload.loading;
    },
  },
});

export const { getEntriesSuccess, setLoading } = counterSlice.actions;

export const getEntries = () => async dispatch => {
  const { data } = await axios.get('http://localhost:7000/entries')

  dispatch(getEntriesSuccess({ entries: data }))
  // TODO: handle error
};

export const selectEntries = state => state.entries.entriesAllIds.map((id) => state.entries.entriesById[id]);

export default counterSlice.reducer;
