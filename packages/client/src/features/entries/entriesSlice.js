import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'entries',
  initialState: {
    error: null,
    entriesAllIds: [],
    entriesById: {},
    loading: false,
  },
  reducers: {
    addEntry: (state) => {
      state.loading = true
      state.error = null
    },
    addEntryError: (state) => {
      state.loading = false
      state.error = 'There was an error adding this entry'
    },
    addEntrySuccess: (state, { payload }) => {
      state.entriesById[payload.entry.id] = payload.entry
      state.entriesAllIds.push(payload.entry.id)
      state.loading = false
    },
    getEntries: (state) => {
      state.loading = true
      state.error = null
    },
    getEntriesError: (state) => {
      state.loading = false
      state.error = 'There was an error loading your entries'
    },
    getEntriesSuccess: (state, { payload }) => {
      state.entriesById = payload.entries.reduce(
        (allEntries, currentEntry) => ({
          ...allEntries,
          [currentEntry.id]: currentEntry,
        }),
        {},
      )
      state.entriesAllIds = payload.entries.map(({ id }) => id)
      state.loading = false
    },
  },
})

export const {
  addEntry,
  addEntryError,
  addEntrySuccess,
  getEntries,
  getEntriesError,
  getEntriesSuccess,
} = counterSlice.actions

export const selectEntries = (state) =>
  state.entries.entriesAllIds.map((id) => state.entries.entriesById[id])

export default counterSlice.reducer
