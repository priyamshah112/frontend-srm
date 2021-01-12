import axios from 'axios'
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class PlanningService {
	createPlanning(token,classID) {
		return axios.post(
			`${BACKEND_API_URL}/planning?class_id=${classID}`,
			{},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}
	getPlanning(token,class_id,select_by) {
		return axios.get(`${BACKEND_API_URL}/planning?class_id=${class_id}&select_by=${select_by}`, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	getPlanningID(token,id) {
		return axios.get(`${BACKEND_API_URL}/planning/${id}`, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	getPlanningBySubject(token, subjectID) {
		return axios.get(`${BACKEND_API_URL}/planning?subject_id=` + subjectID, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}

	getPlanningByParams(token, classID, subjectID) {
		return axios.get(
			`${BACKEND_API_URL}/planning?class_id=` +
				classID +
				`&subject_id=` +
				subjectID,
			{
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}

	getPlanningByClass(token, classID) {
		return axios.get(`${BACKEND_API_URL}/planning?class_id=` + classID, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}

	get_by(token,id,get_by) {
		return axios.get(`${BACKEND_API_URL}/planning?class_id=${id}&get_by=${get_by}`, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	get_by_search(token,value,id,get_by) {
		return axios.get(`${BACKEND_API_URL}/planning/search/${value}?class_id=${id}&get_select=${get_by}`, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	getSubjects(token) {
		return axios.get(`${BACKEND_API_URL}/subjects`, {
			headers: {
				accept: 'application/json',
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
	savePlanning(token,id,payload) {
		return axios.put(`${BACKEND_API_URL}/planning/${id}`, payload, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	deletePlanning(token, id) {
		return axios.delete(`${BACKEND_API_URL}/planning/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
}

export default new PlanningService()
