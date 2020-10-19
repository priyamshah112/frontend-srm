import axios from "axios";
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class TimetableService {
    // teacher class list
    getClass(token){
        return axios.get(`${BACKEND_API_URL}/classes`,{
            headers: {
             accept: "application/json",
             Authorization: `Bearer ${token}`,
         },
        });
    };

    // teacher examtestList 

    getClassTestList(token, classID) {
        return axios.get(`${BACKEND_API_URL}/examTests?class_id=${classID}`, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
    }
    // testsubject list with time date and eddit option for only teacher and admin 
    getTestSbjectList(token, classID, TestID) {
        return axios.get(`${BACKEND_API_URL}/exam_time_tables?class_id=` +
            classID +
            `&test_id=` +
            TestID, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
    }
    //  student TestList

    getStudentTestList(token) {
        return axios.get(`${BACKEND_API_URL}/get_student_test_list`, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
    }

    // student exam subject list from class_id and examtestid
    getExamTestSubList(token, class_id, test_id) {
        return axios.get(`${BACKEND_API_URL}/exam_time_tables?class_id=` +
            class_id +
            `&test_id=` +
            test_id
            , {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
    }

}

export default new TimetableService();
