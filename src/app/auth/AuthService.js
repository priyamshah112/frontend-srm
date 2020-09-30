import axios from "axios";

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class AuthService {
  login(credentials) {
    console.log(`${BACKEND_API_URL}/login`)
    return axios.post(`${BACKEND_API_URL}/login`, credentials);
  }
  sendOtp(username) {
    return axios.post(`${BACKEND_API_URL}/send-otp`, username);
  }
  otpValidate(token, otp) {
    return axios.post(`${BACKEND_API_URL}/validate-otp`, otp, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  changePassword(Bearertoken, payload) {
    return axios.post(`${BACKEND_API_URL}/update_password`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Bearertoken}`,
      },
    });
  }
  getParents(username) {
    console.log(username);
    return axios.post(`${BACKEND_API_URL}/get-parents`, username);
  }
}

export default new AuthService();
