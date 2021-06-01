import { fork } from 'redux-saga/effects'
import { watchAuth } from '../../auth/store/sagas'
import { watchNotification } from '../../notification/store/saga'
import handleApiCall from './common'

export function* rootSaga() {
	yield fork(watchAuth)
	yield fork(watchNotification)
	yield fork(handleApiCall)
}
