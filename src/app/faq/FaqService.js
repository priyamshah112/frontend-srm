import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class FaqService {
  fetchAllFaqs(token) {
    return axios.get(`${BACKEND_API_URL}/faq`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  fetchFaq(token, faq_code) {
    return axios.get(`${BACKEND_API_URL}/faq/${faq_code}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  postFaq(token, payload) {
    return axios.post(`${BACKEND_API_URL}/faq`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateFaq(token, faq_code, payload) {
    return axios.put(`${BACKEND_API_URL}/faq/${faq_code}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  deleteFaq(token, faq_code) {
    return axios.delete(`${BACKEND_API_URL}/faq/${faq_code}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new FaqService();
