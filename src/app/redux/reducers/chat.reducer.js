import chatActionTypes from '../action-types/chat.actionTypes'
import { updateObject } from '../../../shared/utility'

const initalState = {
	contacts: [],
	contactsLoading: false,
	chatUsers: [],
	chatUsersLoading: false,
	singleChatUser: null,
}

const chatReducer = (state = initalState, action) => {
	switch (action.type) {
		case chatActionTypes.GET_CONTACTS.START:
			return {
				...state,
				contactsLoading: action.data.loading,
			}
		case chatActionTypes.GET_CONTACTS.SUCCESS:
			return {
				...state,
				contacts: action.payload.data,
				contactsLoading: false,
			}
		case chatActionTypes.GET_CONTACTS.FAIL:
			return {
				...state,
				contactsLoading: false,
			}
		case chatActionTypes.GET_CHAT_USERS.START:
			return {
				...state,
				chatUsersLoading: action.data.loading,
			}
		case chatActionTypes.GET_CHAT_USERS.SUCCESS:
			return {
				...state,
				chatUsers: action.payload.data,
				chatUsersLoading: false,
			}
		case chatActionTypes.GET_CHAT_USERS.FAIL:
			return {
				...state,
				chatUsersLoading: false,
			}
		case chatActionTypes.CREATE_CHATROOM.START:
			return {
				...state,
				chatUsersLoading: action.data.loading,
			}
		case chatActionTypes.CREATE_CHATROOM.SUCCESS:
			return {
				...state,
				chatUsers: action.payload.data,
				chatUsersLoading: false,
			}
		case chatActionTypes.CREATE_CHATROOM.FAIL:
			return {
				...state,
				chatUsersLoading: false,
			}
		case chatActionTypes.SEND_CHAT.START:
			return {
				...state,
				chatUsersLoading: action.data.loading,
			}
		case chatActionTypes.SEND_CHAT.SUCCESS:
			return {
				...state,
				chatUsers: action.payload.data,
				chatUsersLoading: false,
			}
		case chatActionTypes.SEND_CHAT.FAIL:
			return {
				...state,
				chatUsersLoading: false,
			}
		case chatActionTypes.SET_CHAT_USER:
			return {
				...state,
				singleChatUser: action.data,
			}
		// case chatActionTypes.SET_GROUP:
		// 	return setGroup(state, action.group)
		case chatActionTypes.UPDATE_CHAT:
			return {
				...state,
				singleChatUser: updateSingleChat(state.singleChatUser, action.data),
			}
		default:
			return state
	}
}

const setGroup = (state, group) => {
	return updateObject(state, { group: group })
}

const updateSingleChat = (singleChatUser, chatMessage) => {
	let updatePreviousMessages = singleChatUser.school_chat_message
	if (!updatePreviousMessages.find((item) => item.id === chatMessage.id)) {
		updatePreviousMessages.push(chatMessage)
	}
	return {
		...singleChatUser,
		school_chat_message: updatePreviousMessages,
	}
}

export default chatReducer
