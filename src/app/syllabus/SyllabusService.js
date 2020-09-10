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

  };
  
  export default new SyllabusService();