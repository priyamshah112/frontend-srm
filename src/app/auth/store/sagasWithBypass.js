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
import * as actionTypes from './actionTypes'
import AuthService from '../AuthService'
import * as moment from 'moment'
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
		} else {
			response = {
				status: 200,
				data: {
					access_token:
						'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MTRlZTFlOS1lMmQ3LTQwMjMtYTEzMy0yNGMzODE3MDVlYzAiLCJqdGkiOiJiYmNkZmRiZmY3MjUyNjEzZWU3N2Y2Njc0MTIyMjJlNDg3MjdkOGU3NTI0ZmVjMWZhMzVlMDg0ZWFmNDNjNjM4ZjFkMjViNzU3NmExMzg2YSIsImlhdCI6MTU5NzkxOTIwMywibmJmIjoxNTk3OTE5MjAzLCJleHAiOjE2Mjk0NTUyMDMsInN1YiI6IjkxIiwic2NvcGVzIjpbXX0.ZF17B6Ts-AuyeWc6RfbWv_NSiKxtqY7_gPxS2sN-bq6wGFW-Oa0_Z5jam1EZLDvH0RaQXV2vEDWkCxpA6KVPOWvcN2kWC_mkE_G1h2-nHIWPAQdPtAZfQEx9WrgDBfXZrk9sC8FUnckx_mTB23xBf9xkrZ0rnGQspyyAfcu3V1vGI_FzT1mmmklDWfvRevo5zw9O61i2_VGHJvppTNRKIdX_-SCyON7Jqf33XKHzrmUSLStdEJVqtY_VsCdlc59dAgtTQLaO6CMPs2lJ0DQKunvh1UFjPLNz46qVS0IqStEPyaLv2tB35t5Jyrbc0in6sUeMiyCphwrvuIq5cuLie2YlrLO1Z4I5mIdb1qsrCCzShV3FYFg696I0XNnd7e4GCR2cCAWMmGwPsBoDe9p-uPo_hxXmTaRipSmKVttOxuV-t4DVhEDRns9I45wvpKbL1rT2I5LE-8FEBl_eYZCxoZWMJk3ob494el3Ow6dkb7CWPEeUAIPqnMjjCloFgnFd85NkwpuPZitTnj8Ab2c-l40eG086SoVra2bJ8Ym_V0M73NLQoik0NXjUSSC36P7Tu5UMUahgTn2xmENhb3TXa4DtsQN2pWyrgGJ_slnvLlSV9TGMLtQbplXrpWgDzPj6lA1VB79I7Li_8FqPlyhIYjcxj5OIlr8LYyZrEr6N3sw',
					token_type: 'Bearer',
					expires_at: '2021-08-20 10:26:43',
					user: {
						id: 91,
						type: 'email',
						username: 'devanshslnk98@gmail.com',
						verified_at: null,
						created_at: '2020-08-19T14:46:54.000000Z',
						updated_at: '2020-08-20T10:25:49.000000Z',
						gender: null,
						otp:
							'eyJpdiI6IjJOZGdvNVRkc0pMWmc0OE1uTXJ3Rmc9PSIsInZhbHVlIjoiVGdEREN0VWVHdzBjb21NV0lZMWZWZz09IiwibWFjIjoiMDk1NDc2ODM1MjhhYWJjMmEzYTNhM2QwYmE4NTlmZjg3MDU5ZmQzMWE0YjI5MDM4OTk2YzAyY2FjNjJkNzU4YiJ9',
						otp_expiry: '2020-08-20 10:30:49',
						thumbnail: 'https://picsum.photos/id/1/200/300',
						roles: [
							{
								id: 5,
								name: 'admin',
								guard_name: 'web',
								created_at: null,
								updated_at: null,
								pivot: {
									model_id: 91,
									role_id: 5,
									model_type: 'App\\User',
								},
							},
						],
					},
				},
			}
		}

		if (response.status === 200) {
			const expirationDate = yield new Date(response.data.expires_at)
			yield localStorage.setItem('srmToken', response.data.access_token)
			yield localStorage.setItem(
				'srmUserInfo',
				JSON.stringify(response.data.user)
			)
			yield localStorage.setItem('srmExpirationDate', expirationDate)
			yield localStorage.setItem(
				'srmSelectedRole',
				JSON.stringify(response.data.user.roles[0].name)
			)

			//Initiate AUTH_SUCCCESS action
			yield put(
				actions.authSuccess({
					token: response.data.access_token,
					userInfo: response.data.user,
					redirectUrl: '/home',
					selectedRole: response.data.user.roles[0].name,
				})
			)

			if (response.data.user.roles.length > 1) {
				yield put(actions.authInitiateRoleSelection())
			}

			//Initiate the Expiry Time of token
			yield put(actions.checkAuthTimeout(response.data.expires_at, true))

			yield put(push('/home'))
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
					redirectUrl: '/home',
					selectedRole: selectedRole,
				})
			)
			const currentPath = yield localStorage.getItem('srmCurrentRoute')
			if (currentPath == null) {
				yield put(push('/home'))
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
}
