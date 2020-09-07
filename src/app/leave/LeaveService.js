import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class FaqService {
  
  postLeave(params, payload, token) {
    return axios.post(`${BACKEND_API_URL}//leaves`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
}

export default new FaqService();
