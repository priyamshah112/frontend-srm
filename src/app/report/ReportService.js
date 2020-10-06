import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;


class ReportService {
    fetchStudentTest(token, school_id, class_id, student_id) {
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

    fetchReportCard(token, student_id, test_id) {

        console.log("token, student_id, test_id", token, student_id, test_id);


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
    fetchStudentTest(token, school_id, class_id, student_id) {
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

    studentAttendance(token, student_id) {
        console.log("token", token);
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

}

export default new ReportService();
