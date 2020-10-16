import axios from "axios";
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class TimetableService {

    getClass(token, classID) {
        return axios.get(`${BACKEND_API_URL}/classes`, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    }

    getTestList(token, classID) {
        return axios.get(`${BACKEND_API_URL}/examTests?class_id=${classID}`,{
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
    }

    getTestSbjectList(token,classID,TestID) {
        return axios.get(`${BACKEND_API_URL}/exam_time_tables?class_id=` +
        classID +
        `&test_id=`+
        TestID,{
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
    }

}

export default new TimetableService();
// `${BACKEND_API_URL}/syllabus?class_id=` +
// classID +
// `&subject_id=` +
// subjectID,