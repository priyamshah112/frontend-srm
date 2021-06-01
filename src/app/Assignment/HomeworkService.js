import axios from 'axios'

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class HomeworkService {
	createHomework(token) {
		return axios.post(
			`${BACKEND_API_URL}/homework`,
			{},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}
	saveHomework(params, payload, token) {
		return axios.post(`${BACKEND_API_URL}/homework/${params.id}?_method=PUT`, payload, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		})
	}

	deleteHomework(id, token) {
		return axios.delete(`${BACKEND_API_URL}/homework/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	publishHomework(params, payload, token) {
		return axios.post(`${BACKEND_API_URL}/homework/${params.id}?_method=PUT`, payload, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	fetchHomework(params, token) {
		return axios.get(`${BACKEND_API_URL}/homework`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			params: params,
		})
		// return true;
	}
	fetchStudentSubmitted(params, token) {
		return axios.get(`${BACKEND_API_URL}/homeworkSubmission`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			params: params,
		})
		// return true;
	}
	saveHomeworkSubmission(token,payload){		
		return axios.post(`${BACKEND_API_URL}/homeworkSubmission`, payload, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	saveFeedback(token,payload){		
		return axios.post(`${BACKEND_API_URL}/teacher_feedback`, payload, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	fetchSingleHomework(id,params, token) {
		return axios.get(`${BACKEND_API_URL}/homework/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			params: params,
		})
		// return true;
	}
	fetchDraftHomework(params, token) {
		return axios.get(`${BACKEND_API_URL}/homework/${params.id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	fetchSeenHomework(params, token) {
		return axios.get(`${BACKEND_API_URL}/homework/${params.id}?get_seen=${params.seen_by}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	getSubjectsByClass(token,class_id) {
		return axios.get(`${BACKEND_API_URL}/subjectsByClass?class_id=${class_id}`, {
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
	deleteHomeworkFile(id,token) {
		return axios.delete(`${BACKEND_API_URL}/homeworkFileDelete/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
}

export default new HomeworkService()
