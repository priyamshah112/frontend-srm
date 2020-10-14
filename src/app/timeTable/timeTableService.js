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

}

export default new TimetableService();
