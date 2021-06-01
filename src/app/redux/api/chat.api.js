import apiService from './axios-service'
import {
	chatEndpoint,
	chatRoomEndpoint,
} from './endpoint-constants'

export const getContactsApi = (params,headers) =>{
	return apiService.get(`${chatEndpoint}`, { params,headers })
}

export const createChatRoomApi = (data, headers) =>{
	return apiService.post(`${chatEndpoint}`, data,{ headers })
}

export const sendChatApi = (data, headers) =>{
	return apiService.post(`${chatRoomEndpoint}`,data, { headers })
}
