import * as actionTypes from './actionTypes'

export const setChat = (chat) => {
	return {
		type: actionTypes.START_SET_CHAT,
		chat: chat,
	}
}

export const setGroup = (group) => {
	return {
		type: actionTypes.SET_GROUP,
		group: group,
	}
}
