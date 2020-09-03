import axios from "axios";

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class HomeworkService {
  createHomework(token) {
    return axios.post(
      `${BACKEND_API_URL}/homework`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  saveHomework(params, payload, token) {
    return axios.put(`${BACKEND_API_URL}/homework/${params.id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  publishHomework(params, payload, token) {
    return axios.put(`${BACKEND_API_URL}/homework/${params.id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  fetchHomework(params, token) {
    return axios.get(`${BACKEND_API_URL}/homework`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: params.currentPage,
        current_role: params.selectedRole,
        created_by: true,
      },
    });
    // return true;
  }
  fetchDraftHomework(params, token) {
    return axios.get(`${BACKEND_API_URL}/homework/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  fetchClasses(token) {
    return axios.get(`${BACKEND_API_URL}/classes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new HomeworkService();
