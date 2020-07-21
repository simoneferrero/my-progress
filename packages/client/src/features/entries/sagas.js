import axios from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import constants from '../../utils/constants'
import {
  addEntry,
  addEntryError,
  addEntrySuccess,
  getEntries,
  getEntriesError,
  getEntriesSuccess,
} from './entriesSlice'

export function* addEntrySaga({ payload: { entry } }) {
  try {
    const { data } = yield call(axios, `${constants.SERVER_URL}/entries`, {
      data: entry,
      method: 'POST',
    })

    yield put(addEntrySuccess({ entry: data }))
  } catch {
    yield put(addEntryError())
  }
}

export function* addEntryWatcher() {
  yield takeLatest(addEntry.type, addEntrySaga)
}

export function* getEntriesSaga() {
  try {
    const { data } = yield call(axios, `${constants.SERVER_URL}/entries`)

    yield put(getEntriesSuccess({ entries: data }))
  } catch {
    yield put(getEntriesError())
  }
}

export function* getEntriesWatcher() {
  yield takeLatest(getEntries.type, getEntriesSaga)
}

export default function* rootSaga() {
  yield all([call(addEntryWatcher), call(getEntriesWatcher)])
}
