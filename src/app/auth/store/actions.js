import * as actionTypes from './actionTypes'

/* Initiated from middleware */
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	}
}

/* Initiated from middleware */
export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData,
	}
}

/* Initiated from middleware */
export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	}
}

/* Initiated from UI */
export const authUser = (userName, password) => {
	return {
		type: actionTypes.AUTH_USER,
		userName: userName,
		password: password,
	}
}
/* Update Profile */
export const authChangeProfile = (thumbnail) => {
	return {
		type: actionTypes.AUTH_CHANGE_PROFILE,
		thumbnail: thumbnail,
	}
}

/* Initiated from UI */
export const logout = (isAuthenticated) => {
	return {
		type: actionTypes.AUTH_INITIATE_LOGOUT,
		isAuthenticated: isAuthenticated,
	}
}

/* Initiated from middleware */
export const logoutSucceed = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	}
}

export const authCheckState = (isAuthenticated) => {
	return {
		type: actionTypes.AUTH_CHECK_STATE,
		isAuthenticated: isAuthenticated,
	}
}

export const checkAuthTimeout = (expirationDate, isAuthenticated) => {
	return {
		type: actionTypes.AUTH_CHECK_TIMEOUT,
		expirationDate: expirationDate,
		isAuthenticated: isAuthenticated,
	}
}

/* Called from UI - User clicking on a role card */
export const authRoleSelection = (role) => {
	return {
		type: actionTypes.AUTH_ROLE_SELECTION,
		selectedRole: role,
	}
}

/* Action to denote successful role change*/
export const authRoleSelectionSucceed = (role) => {
	return {
		type: actionTypes.AUTH_ROLE_SELECTION_SUCCESS,
		selectedRole: role,
	}
}

/* Changes the 'ChangeRole' to true */
export const authInitiateRoleSelection = () => {
	return {
		type: actionTypes.AUTH_INITIATE_ROLE_SELECTION,
	}
}
