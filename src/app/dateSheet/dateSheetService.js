import axios from 'axios'
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class DateSheetService {
	fetchClasses(token) {
		return axios.get(`${BACKEND_API_URL}/classes`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	// teacher class list
	getClass(token) {
		return axios.get(`${BACKEND_API_URL}/classes`, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}

	// termList
	getClassTermList(token, classID) {
		return axios.get(`${BACKEND_API_URL}/datesheet?class_id=${classID}&get_by=term`, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
	// datesheet list with time date and eddit option for only teacher and admin
	getDatesheetList(token, termID, classID) {
		return axios.get(
			`${BACKEND_API_URL}/datesheet/${termID}?class_id=`+classID,
			{
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}

	 
	publish(token, id, classID) {
		return axios.put(`${BACKEND_API_URL}/datesheetpublish/${id}?class_id=${classID}`,null,
			{
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}
	put_subject(token, id, ClassID, obj) {
		return axios.put(`${BACKEND_API_URL}/datesheet_data/${id}?class_id=${ClassID}`,
			obj,
			{
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}

	//  student TestList
	getStudentTestList(token) {
		return axios.get(`${BACKEND_API_URL}/get_student_test_list`, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}

	// student exam subject list from class_id and examtestid
	getExamTestSubList(token, class_id, test_id) {
		return axios.get(`${BACKEND_API_URL}/exam_time_tables?class_id=` +
				class_id +
				`&test_id=` +
				test_id,
			{
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
	}
}

export default new DateSheetService()
