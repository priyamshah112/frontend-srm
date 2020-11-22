import * as actionTypes from './actionTypes'
import { updateObject } from '../../../shared/utility'

const initalState = {
	chat: {},
}
const setChat = (state, chat) => {
	return updateObject(state, { chat: chat })
}
const setGroup = (state, group) => {
	return updateObject(state, { group: group })
}
const chatReducer = (state = initalState, action) => {
	switch (action.type) {
		case actionTypes.START_SET_CHAT:
			return setChat(state, action.chat)
		case actionTypes.SET_GROUP:
			return setGroup(state, action.group)
		default:
			return state
	}
}
export default chatReducer
