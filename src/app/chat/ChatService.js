import axios from 'axios'

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class ChatService {
	createGroup(params, token) {
		return axios.post(`${BACKEND_API_URL}/chats/group/create`, params, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	updateGroup(params, token) {
		return axios.post(`${BACKEND_API_URL}/chat/group/update`, params, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	fetchChatUsers(params, token) {
		return axios.post(
			`${BACKEND_API_URL}/chat/users`,
			{
				params: {
					selectedRole: params.selectedRole,
				},
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}
	fetchChats(role, token) {
		return axios.get(`${BACKEND_API_URL}/chats`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			params:{
				current_role : role,
				get_by: 'user',
			}
		})
	}
	fetchChat(param, token) {
		return axios.get(`${BACKEND_API_URL}/chats` + param, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	submitChat(param, token) {
		return axios.post(`${BACKEND_API_URL}/chats`, param, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	newChat(param, token) {
		return axios.post(`${BACKEND_API_URL}/chat/newChat`, param, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	markRead(token, id) {
		return axios.get(`${BACKEND_API_URL}/chat/read/` + id, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
}

export default new ChatService()
