import { fork } from 'redux-saga/effects'
import { watchAuth } from './app/auth/store/sagas'
import { watchNotification } from './app/notification/store/saga'
import handleApiCall from './app/redux/sagas/common'

export function* rootSaga() {
	yield fork(watchAuth)
	yield fork(watchNotification)
	yield fork(handleApiCall)
}
