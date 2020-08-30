import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class HomeService {
  fetchAnnouncements(params, token) {
    // console.log(token);
    return axios.get(`${BACKEND_API_URL}/news`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: params.currentPage,
        current_role: params.selectedRole,
      },
    });
    // return true;
  }
  fetchAnnouncementDetail(id, token) {
    return axios.get(`${BACKEND_API_URL}/news/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchHomework(token) {
    // console.log(token);
    return axios.get(`${BACKEND_API_URL}/homework`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchMoreHomework(token, url) {
    // console.log(token);
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getTask(token) {
    return axios.get(`${BACKEND_API_URL}/task`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getMoreTask(token, url) {
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createTask(token, payload) {
    return axios.post(`${BACKEND_API_URL}/task`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateTask(token, taskId, payload) {
    return axios.put(`${BACKEND_API_URL}/task/${taskId}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteTask(token, taskId) {
    return axios.delete(`${BACKEND_API_URL}/task/${taskId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new HomeService();
