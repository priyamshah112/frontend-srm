import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class ProfileService {
  fetchuser(token, id) {
    return axios.get(`${BACKEND_API_URL}/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateUserPic(token, id, payload) {
    return axios.put(`${BACKEND_API_URL}/user/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchPhones(token) {
    return axios.get(`${BACKEND_API_URL}/userPhones`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchUserPhones(token, id) {
    return axios.get(`${BACKEND_API_URL}/userPhones`, {
      params: {
        user_id: id,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updatePhone(token, id, payload) {
    return axios.put(`${BACKEND_API_URL}/userPhones/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  postPhone(token, payload) {
    return axios.post(`${BACKEND_API_URL}/userPhones`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchEmails(token) {
    return axios.get(`${BACKEND_API_URL}/userEmails`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchUserEmails(token, id) {
    return axios.get(`${BACKEND_API_URL}/userEmails`, {
      params: {
        user_id: id,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateEmail(token, id, payload) {
    return axios.put(`${BACKEND_API_URL}/userEmails/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  postEmail(token, payload) {
    return axios.post(`${BACKEND_API_URL}/userEmails`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchAddress(token) {
    return axios.get(`${BACKEND_API_URL}/userAddresses`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateAddress(token, id, payload) {
    return axios.put(`${BACKEND_API_URL}/userAddresses/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchCountries(token) {
    return axios.get(`${BACKEND_API_URL}/countries`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchStates(token, payload) {
    return axios.get(`${BACKEND_API_URL}/states`, {
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchCities(token, payload) {
    return axios.get(`${BACKEND_API_URL}/cities`, {
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchParents(token, payloadUsername) {
    return axios.post(
      `${BACKEND_API_URL}/get-parents`,
      {
        username: payloadUsername,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  fetchStudents(token) {
    return axios.get(`${BACKEND_API_URL}/get-students`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  changePassword(token, payload) {
    return axios.post(`${BACKEND_API_URL}/change_password`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  sendOtp(username) {
    return axios.post(`${BACKEND_API_URL}/send-otp`, username);
  }

  otpValidate(token, otp) {
    return axios.post(`${BACKEND_API_URL}/validate-otp`, otp, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ProfileService();
