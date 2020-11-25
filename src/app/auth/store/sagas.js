import {
	put,
	call,
	takeEvery,
	all,
	delay,
	takeLatest,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as actions from './actions'
import { startNotificationCount } from '../../notification/store/action'
import * as actionTypes from './actionTypes'
import AuthService from '../AuthService'
import * as moment from 'moment'
import axiosService from '../../redux/api/axios-service'
import { requestFirebaseNotificationPermission } from '../../../firebaseInit'
import { paths } from '../../../Constants/Routes'
const USE_API = process.env.REACT_APP_USE_API

export function* watchAuth() {
	yield all([
		takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
		takeLatest(actionTypes.AUTH_USER, authUserSaga),
		takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
		takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
		takeEvery(actionTypes.AUTH_ROLE_SELECTION, authInitiateRoleSelectionSaga),
	])
}

/* Validates auth credentials with api */
export function* authUserSaga(action) {
	//Initiate AUTH_START action
	yield put(actions.authStart())

	const authData = {
		username: action.userName,
		password: action.password,
	}
	try {
		let response = ''
		if (USE_API === 'Y') {
			response = yield AuthService.login(authData)
		}

		if (response.status === 200) {
			const deviceToken = yield requestFirebaseNotificationPermission()

			if (response.data.user_device_tokens !== null && deviceToken) {
				const checkDeviceToken = response.data.user_device_tokens.find(
					(token) => token === deviceToken
				)

				if (!checkDeviceToken) {
					const deviceTokenList = [
						...response.data.user_device_tokens,
						deviceToken,
					]

					const saveDeviceTokenResponse = yield AuthService.addDeviceToken(
						response.data.access_token,
						deviceTokenList,
						response.data.user.id
					)
				}
			} else if (deviceToken) {
				const deviceTokenList = [deviceToken]
				const saveDeviceTokenResponse = yield AuthService.addDeviceToken(
					response.data.access_token,
					deviceTokenList,
					response.data.user.id
				)
			}

			const expirationDate = yield new Date(response.data.expires_at)
			yield localStorage.setItem('srmToken', response.data.access_token)
			yield localStorage.setItem(
				'schoolName',
				response.data.school_details.name
			)
			yield localStorage.setItem(
				'schoolLogo',
				response.data.school_details.logo
			)
			yield localStorage.setItem(
				'srmUserInfo',
				JSON.stringify(response.data.user)
			)
			yield localStorage.setItem('srmExpirationDate', expirationDate)
			yield localStorage.setItem(
				'srmSelectedRole',
				JSON.stringify(response.data.user.roles[0].name)
			)
			// parent child code
			var all_roles = response.data.user.roles
			var isParent = false
			for (var i = 0; i < all_roles.length; i++) {
				if (all_roles[i].name === 'parent') {
					isParent = true
				}
			}
			if (isParent) {
				yield localStorage.setItem(
					'srmChild_dict',
					JSON.stringify(response.data.studentDetails)
				)
				yield localStorage.setItem('srmSelected_Child', 0)
				yield localStorage.setItem(
					'srmSelected_Child_token',
					response.data.studentDetails[0].access_token
				)
			}

			axiosService.setAuthorizationToken(response.data.access_token)
			//Initiate AUTH_SUCCCESS action
			yield put(
				actions.authSuccess({
					token: response.data.access_token,
					userInfo: response.data.user,
					redirectUrl: paths.HOME,
					selectedRole: response.data.user.roles[0].name,
				})
			)

			if (response.data.user.roles.length > 1) {
				yield put(actions.authInitiateRoleSelection())
			}

			//Initiate the Expiry Time of token
			yield put(actions.checkAuthTimeout(response.data.expires_at, true))
			yield put(startNotificationCount())
			yield put(push(paths.HOME))
		} else {
			//Initiate AUTH_FAIL action for Invalid credentials
			yield put(actions.authFail('Invalid Credentials'))
		}
	} catch (error) {
		//Initiate AUTH_FAIL action
		console.log(error)
		//clear local storage if created
		yield call([localStorage, localStorage.clear])
		yield put(actions.authFail('Invalid Credentials'))
	}
}

/*If token already exists, use the token. If the user token expired, logout. */
export function* authCheckStateSaga(action) {
	const token = yield localStorage.getItem('srmToken')
	axiosService.setAuthorizationToken(token)
	if (!token) {
		yield put(actions.logout(action.isAuthenticated))
	} else {
		const expirationDate = yield new Date(
			localStorage.getItem('srmExpirationDate')
		)

		if (expirationDate <= new Date()) {
			yield put(actions.logout(action.isAuthenticated))
		} else {
			const userInfo = yield JSON.parse(localStorage.getItem('srmUserInfo'))
			const selectedRole = yield JSON.parse(
				localStorage.getItem('srmSelectedRole')
			)
			yield put(
				actions.authSuccess({
					token: token,
					userInfo: userInfo,
					redirectUrl: paths.HOME,
					selectedRole: selectedRole,
				})
			)

			yield put(startNotificationCount())
			const currentPath = yield localStorage.getItem('srmCurrentRoute')
			if (currentPath == null) {
				yield put(push(paths.HOME))
			} else {
				yield put(push(currentPath))
			}
		}
	}
}

/* Clears local storage and calls the logout succeed action */
export function* logoutSaga(action) {
	yield call([localStorage, localStorage.clear])
	if (action.isAuthenticated) {
		yield put(push('/login'))
	}

	yield put(actions.logoutSucceed())
}

/* Sets expiration time and logs out after expiration time. */
export function* checkAuthTimeoutSaga(action) {
	yield delay(moment(action.expirationDate).diff(moment()))
	yield put(actions.logout(action.isAuthenticated))
}

/* Stores the selectedrole in local storage and calls the sucess action*/
export function* authInitiateRoleSelectionSaga(action) {
	yield localStorage.setItem(
		'srmSelectedRole',
		JSON.stringify(action.selectedRole)
	)
	yield put(actions.authRoleSelectionSucceed(action.selectedRole))
	yield put(push(paths.HOME))
}
