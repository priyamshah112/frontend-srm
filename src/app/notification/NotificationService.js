import axios from "axios";

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class NotificationService {
  createNotification(token) {
    return axios.post(
      `${BACKEND_API_URL}/notifications`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  saveNotification(id, payload, token) {
    return axios.put(`${BACKEND_API_URL}/notifications/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  fetchNotification(token, createdBy, currentRole, currentPage, filter) {
    return axios.get(`${BACKEND_API_URL}/notifications`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        current_role: currentRole,
        created_by: createdBy,
        page: currentPage,
        status: filter,
      },
    });
  }
  fetchDraftNotification(id, token) {
    return axios.get(`${BACKEND_API_URL}/notifications/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  searchUser(userString, token) {
    return axios.get(`${BACKEND_API_URL}/getUserLists`, {
      params: {
        username: userString,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new NotificationService();
