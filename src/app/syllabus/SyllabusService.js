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

    getSubjects(token){
      return axios.get(`${BACKEND_API_URL}/subjects`, {
          headers: {
            "accept": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    }

  };
  
  export default new SyllabusService();