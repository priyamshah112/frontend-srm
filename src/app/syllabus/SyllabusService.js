import axios from "axios";
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class SyllabusService {
    getSyllabus(token,subject){
        return axios.get(`${BACKEND_API_URL}/syllabus/`+subject, {
            headers: {
              "accept": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
    }
    getSyllabusByParams(token,classID,subjectID){
      return axios.get(`${BACKEND_API_URL}/syllabus?class_id=`+classID+`&subject_id=`+subjectID, {
          headers: {
            "accept": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    }

    getSyllabusByClass(token, classID) {
      return axios.get(`${BACKEND_API_URL}/syllabus?class_id=` + classID, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }

    getSubjects(token){
      return axios.get(`${BACKEND_API_URL}/subjects`, {
          headers: {
            "accept": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    }
    fetchClasses(token) {
      return axios.get(`${BACKEND_API_URL}/classes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    updateChapter(token, subject_id, payload) {
      return axios.put(`${BACKEND_API_URL}/syllabus/${subject_id}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }
    saveChapter(token, payload) {
      return axios.post(`${BACKEND_API_URL}/syllabus`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };
  
  export default new SyllabusService();