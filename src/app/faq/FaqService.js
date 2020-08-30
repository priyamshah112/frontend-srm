import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class FaqService {
  fetchAllFaqs(token) {
    return axios.get(`${BACKEND_API_URL}/faqs`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  fetchMoreFaqs(token, url) {
    console.log(url);
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  fetchFaq(token, faq_id) {
    return axios.get(`${BACKEND_API_URL}/faqs/${faq_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  postFaq(token, payload) {
    return axios.post(`${BACKEND_API_URL}/faqs`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateFaq(token, faq_id, payload) {
    return axios.put(`${BACKEND_API_URL}/faqs/${faq_id}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  deleteFaq(token, faq_id) {
    return axios.delete(`${BACKEND_API_URL}/faqs/${faq_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new FaqService();
