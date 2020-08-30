import axios from "axios";

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class AnnouncementService {
  createAnnouncement(token) {
    return axios.post(
      `${BACKEND_API_URL}/news`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  saveAnnouncement(params, payload, token) {
    return axios.put(`${BACKEND_API_URL}/news/${params.id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  publishAnnouncement(params, payload, token) {
    return axios.put(`${BACKEND_API_URL}/news/${params.id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  fetchAnnouncements(params, token) {
    // console.log(token);
    return axios.get(`${BACKEND_API_URL}/news`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: params.currentPage,
        created_by: true,
      },
    });
    // return true;
  }
  fetchDraftAnnouncement(params, token) {
    return axios.get(`${BACKEND_API_URL}/news/${params.id}`, {
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
  fetchCategories(token) {
    return axios.get(`${BACKEND_API_URL}/category`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new AnnouncementService();
