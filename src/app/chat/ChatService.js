import axios from "axios";

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

class ChatService {
  createGroup(params, token) {
    return axios.post(
      `${BACKEND_API_URL}/chat/group/create`,
      params,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  fetchChatUsers(params, token) {
    return axios.post(`${BACKEND_API_URL}/chat/users`, {params: {
        selectedRole: params.selectedRole
      }}, {
      
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // return true;
  }
  fetchChats(params, token) {
    return axios.get(`${BACKEND_API_URL}/chats/get`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  fetchChat(param, token) {
    return axios.get(`${BACKEND_API_URL}/chats/get/`+param, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  submitChat(param, token, id){
    return axios.post(`${BACKEND_API_URL}/chats/get/`+id, param, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  newChat(param, token){
    return axios.post(`${BACKEND_API_URL}/chat/newChat`, param, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ChatService();
