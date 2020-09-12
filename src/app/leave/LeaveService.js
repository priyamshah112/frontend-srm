import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class FaqService {
  
  postLeave(params, payload, token) {
    return axios.post(`${BACKEND_API_URL}/leaves`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  putLeave(payload, token) {
    return axios.put(`${BACKEND_API_URL}/leaves`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  fetchMoreLeave(token) {
    return axios.get(`${BACKEND_API_URL}/leaves`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchAllLeaves(token) {
    return axios.get(`${BACKEND_API_URL}/leaves`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchAllLeavesQueve(token) {
    return axios.get(`${BACKEND_API_URL}/leavesqueue`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchAllUserdata(id,token) {
    return axios.get(`${BACKEND_API_URL}/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchAllTeacher(token) {
    return axios.get(`${BACKEND_API_URL}/getUsers/teacher`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

   fetchAllAdmin(token) {
    return axios.get(`${BACKEND_API_URL}/getUsers/admin`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  
}

export default new FaqService();
