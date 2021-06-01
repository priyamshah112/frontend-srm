import axios from 'axios'

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class SettingsService {
	getHomeworkLimit(token){
		return axios.get(`${BACKEND_API_URL}/homeworkSetting`, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	getHomeworkLimitByClass(id,token){
		return axios.get(`${BACKEND_API_URL}/homeworkSetting/${id}`, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	updateHomeworksLimit(id, payload, token) {
		return axios.put(`${BACKEND_API_URL}/homeworkSetting/${id}`, payload, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	fetchClasses(token) {
		return axios.get(`${BACKEND_API_URL}/classes`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
}

export default new SettingsService()