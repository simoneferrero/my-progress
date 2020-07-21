import createSagaMiddleware from 'redux-saga'
import { all, call } from 'redux-saga/effects'

import entrySaga from '../features/entries/sagas'

export const sagaMiddleware = createSagaMiddleware()

export default function* rootSaga() {
  yield all([call(entrySaga)])
}
