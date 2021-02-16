import axios from "axios";

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class FaqService {
  fetchAllFaqs(token,currentPage,role) {
		return axios.get(`${BACKEND_API_URL}/faqs`,{
			params:{
        page: currentPage,
        current_role: role 
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
  fetchSearchedFaq(token,currentPage,role,search) {
		return axios.get(`${BACKEND_API_URL}/faqs/search/${search}`,{
			params:{
        page: currentPage,
        current_role: role 
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
	}
  fetchFaq(token, faq_id) {
    return axios.get(`${BACKEND_API_URL}/faqs/${faq_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  createFaq(token) {
    return axios.post(
      `${BACKEND_API_URL}/faqs`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  updateFaq(token, faq_id, payload) {
    return axios.put(`${BACKEND_API_URL}/faqs/${faq_id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  deleteFaq(token, faq_id) {
    return axios.delete(`${BACKEND_API_URL}/faqs/${faq_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new FaqService();
