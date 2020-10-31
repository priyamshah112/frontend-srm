import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class ReportService {
    fetchStudentList(token, school_id, class_id, student_id) {
        return axios.get(`${BACKEND_API_URL}/get_student_test_list`, {
            params: {
                school_id: school_id,
                class_id: class_id,
                student_id: student_id
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    fetchStudentTest(token) {
        return axios.get(`${BACKEND_API_URL}/get_student_test_list`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }


    studentAttendance(token, student_id) {
        return axios.get(`${BACKEND_API_URL}/report_card_attendanceDetails`, {
            params: {
                student_id: student_id
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    getGrades(token, class_id) {
        return axios.get(`${BACKEND_API_URL}/grades`, {
            params: {
                class_id: class_id
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    createGrades(token, data) {
        return axios.post(`${BACKEND_API_URL}/grades`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    }


    updateGrades(token, data) {
        return axios.put(`${BACKEND_API_URL}/grades/${data.id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    }

    deleteGrades(token, data) {
        return axios.delete(`${BACKEND_API_URL}/grades/${data.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    uploadReport(token, file) {
        return axios.post(`${BACKEND_API_URL}/attendancesimport`, file, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    }

    fetchStudentClass(token) {
        return axios.get(`${BACKEND_API_URL}/classes`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }


    fetchReportCard(token, student_id, test_id) {
        return axios.get(`${BACKEND_API_URL}/report_cards`, {
            params: {
                student_id: student_id,
                test_id: test_id
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }


    createSkill(token, data) {
        return axios.post(`${BACKEND_API_URL}/report_cards`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    }

    updateSkill(token, data) {
        return axios.put(`${BACKEND_API_URL}/report_cards/${data.id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    }
    deleteSkill(token, reportCardId) {
        return axios.delete(`${BACKEND_API_URL}/report_cards/${reportCardId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new ReportService();
