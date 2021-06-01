import * as chatApi from '../api/chat.api'
import commonActions from '../action-types/common'
import chatActionTypes from '../action-types/chat.actionTypes'

export const getContacts = (params, loading, headers) => {
	return {
		type: commonActions.COMMON_API_CALL,
		subtypes: chatActionTypes.GET_CONTACTS,
		data: {
			loading: loading,
		},
		promise: () => chatApi.getContactsApi(params, headers),
	}
}

export const createChatRoom = (params, loading, headers) => {
	return {
		type: commonActions.COMMON_API_CALL,
		subtypes: chatActionTypes.CREATE_CHATROOM,
		data: {
			loading: loading,
		},
		promise: () => chatApi.createChatRoomApi(params, headers),
	}
}

export const getChatUsers = (params, loading, headers) => {
	return {
		type: commonActions.COMMON_API_CALL,
		subtypes: chatActionTypes.GET_CHAT_USERS,
		data: {
			loading: loading,
		},
		promise: () => chatApi.getContactsApi(params, headers),
	}
}

export const sendChat = (params, loading, headers) => {
	return {
		type: commonActions.COMMON_API_CALL,
		subtypes: chatActionTypes.SEND_CHAT,
		data: {
			loading: loading,
		},
		promise: () => chatApi.sendChatApi(params, headers),
	}
}

export const setChatUser = (user) => {
	return {
		type: chatActionTypes.SET_CHAT_USER,
		data: user,
	}
}

export const setGroup = (group) => {
	return {
		// type: actionTypes.SET_GROUP,
		group: group,
	}
}

export const updateChat = (data) => {
	return {
		type: chatActionTypes.UPDATE_CHAT,
		data: data,
	}
}
