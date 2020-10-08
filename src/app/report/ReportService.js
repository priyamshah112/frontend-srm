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
        console.log("token", token, class_id);
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
        return axios.post(`${BACKEND_API_URL}/grades`, {
            params: {
                ...data
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MWFmMWQ2NC0zZDM5LTRkYjEtOTg5NS0zN2UxMGVhODM0NGQiLCJqdGkiOiI4NDdkMDI3YjI5ODhiZjkwNTk5ODRlZjIzM2E5ZGU4M2IzY2M3NTMxNWVkNjk2MmE4ODAzMGM3Y2RjMzZmZGE1MWZkMWJlMzY4ODc1ZDBhNCIsImlhdCI6MTYwMjA3NDA0MywibmJmIjoxNjAyMDc0MDQzLCJleHAiOjE2MzM2MTAwNDMsInN1YiI6IjEzOTEiLCJzY29wZXMiOltdfQ.aP20CFCwl4Rk2p0cmsuFRG7ynBXwL-ugx0UlsC6i3-oHsYcyNc4bsRplWbEVylQoS0DzxwNB1LGVlLRh2M-Nu2sbvpCfUbH_L1xYOYa93dk9kFLyZ8KU-Oq6JrHDzgsmcKTHfpjgoVrDtx4WJqhyz31s_wVwrsfUEUjZ43W0Fhk94QS_42JSiw0P_zsB6VVHdRGEUfZ3mqDwdb75gU4ytu_HlS2gU69K89J1d783NGut5LoisHbfh7l0QsjYTLVyilyep0tr7c1OIb-ks8lQUIPU06tw5cAqUcbixNSIy3njHqimdAJDgYxVpx3XkoGvySg7jJS4oU_t5OarXEgWKT1jaz5FdpXRnj1Oowma7q_NTGsMWTd1VRTm819NcRp7kraBMHEdu6URW3kdGdER2DTVrvLHX_Fh9_guPQx8pNcMxFAB-IcFm0FPmk2B9e0d8vi_ef6eLL1GFQfOmZZQpvF737qgfxKYiOL6OA1uJPhJ7glMm1xxZH0u4dZWUocxHPYr-_nnCqz9yMLr9WhtxXnEk_UA8QtzDL1RrPBLQzlzhGsSZqN4haQ7OAD0u0gk2X-aJg6Wi7a1GGKJRyQ8nEMeD_ZoEzEJ8umaywI5gf1Dd9xq086njCwzacWzamf2D_Xfia2iBImllWx45PBt58dLW2zo8ihowkRmdt08RdE`,
            },
        });
    }

    updateGrades(token, gradeId, data) {
        return axios.put(`${BACKEND_API_URL}/grades/${gradeId}`, {
            params: {
                ...data
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    deleteGrades(token, gradeId) {
        return axios.delete(`${BACKEND_API_URL}/grades/${gradeId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new ReportService();
