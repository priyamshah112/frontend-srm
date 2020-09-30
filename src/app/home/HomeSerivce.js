import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class HomeService {
  fetchAnnouncements(param, token) {

    return axios.get(`${BACKEND_API_URL}/news`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: param.currentPage,
        current_role: param.selectedRole,
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

  createAnnouncement(token) {
    return axios.post(
      `${BACKEND_API_URL}/news`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  fetchTeacherAnnouncement(token, selectedRole) {
    return axios.get(`${BACKEND_API_URL}/news`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: {
        current_role: selectedRole,
        created_by: 'true',
      },
    });
    // return true;
  }
  createHomework(token) {
    return axios.post(
      `${BACKEND_API_URL}/homework`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  fetchTeacherHomework(token, selectedRole) {
    return axios.get(`${BACKEND_API_URL}/homework`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: {
        created_by: true,
        current_role: selectedRole,
      },
    });
    // return true;
  }
  fetchHomework(token, selectedRole) {
    console.log(selectedRole);
    return axios.get(`${BACKEND_API_URL}/homework`, {
      params: {
        current_role: selectedRole,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchMoreHomework(token, url, selectedRole) {
    // console.log(token);
    return axios.get(url, {
      params: {
        current_role: selectedRole,
      },
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
  getDoneTask(token) {
    return axios.get(`${BACKEND_API_URL}/task`, {
      params: {
        status: 'done',
      },
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

  setReminder(payload, token) {
    return axios.post(`${BACKEND_API_URL}/reminder`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateReminder(payload, token, id) {
    return axios.put(`${BACKEND_API_URL}/reminder/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  fetchReminder(token, type, id) {
    return axios.get(`${BACKEND_API_URL}/feed-reminder/${type}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new HomeService();
