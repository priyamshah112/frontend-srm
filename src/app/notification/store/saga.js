import { put, takeEvery } from 'redux-saga/effects'

import * as actions from './action'
import * as actionTypes from './actionTypes'
import NotificationService from '../NotificationService'

export function* watchNotification() {
	yield takeEvery(actionTypes.START_NOTIFICATION_COUNT, startNotifcationCount)
}

export function* startNotifcationCount(action) {
	const token = yield localStorage.getItem('srmToken')
	const selectedRole = yield JSON.parse(localStorage.getItem('srmSelectedRole'))
	let srmSelectedChild = null
	let srmChild = null

	let params = {
			current_role: selectedRole,	
	}
	
	if(selectedRole === 'parent'){
		srmSelectedChild = yield localStorage.getItem('srmSelected_Child')
		srmChild = yield JSON.parse(localStorage.getItem('srmChild_dict'))
		params = {
			...params,
			student_id: srmChild[srmSelectedChild].userDetails.id || null,
		}
	}


	try {
		const response = yield NotificationService.fetchNotificationCount(
			token,
			params			
		)
		if (response.status === 200) {
			yield put(
				actions.setNotificationCount(
					response.data.data.unread_notification_count
				)
			)
		}
	} catch (e) {
		console.log(e)
	}
}
