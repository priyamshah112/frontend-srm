import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class HomeworkService {
  fetchPhones(token) {
    return axios.put(`${BACKEND_API_URL}/userPhones`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchEmails(token) {
    return axios.put(`${BACKEND_API_URL}/userEmails`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ProfileService();
