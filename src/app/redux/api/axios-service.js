import axios from 'axios';
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

axios.defaults.baseURL = BACKEND_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.timeout = 120000;

axios.interceptors.response.use(
  function (response) {
    // console.log("interceptor response", response);
    return response;
  },
  function (error) {
    console.log('interceptor response error', error);
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function (response) {
    // console.log("interceptor request", response);
    return response;
  },
  function (error) {
    console.log('interceptor request error', error);
    return Promise.reject(error);
  }
);

const AxiosService = function () {
  let Authorization = null;

  function addHeaders(userConfig) {
    const { params, headers, timeout, ...restConfigs } = userConfig;
    let globalHeaders = {};

    if (Authorization) {
      globalHeaders.Authorization = `Bearer ${Authorization}`;
    } else {
      const token = localStorage.getItem('srmToken');
      globalHeaders.Authorization = `Bearer ${token}`;
    }

    const { filter, ...restParams } = params || {};

    return {
      ...restConfigs,
      headers: {
        ...globalHeaders,
        ...headers,
      },
      params: {
        ...restParams,
      },
      timeout,
    };
  }

  function getAuthorizationToken() {
    return Authorization;
  }

  function setAuthorizationToken(token) {
    Authorization = token;
  }

  function resetAuthorizationToken() {
    Authorization = null;
  }

  function get(endPoint, userConfig = {}) {
    return axios.get(endPoint, addHeaders(userConfig));
  }

  function post(endPoint, params = {}, userConfig = {}) {
    return axios.post(endPoint, params, addHeaders(userConfig));
  }

  function put(endPoint, params = {}, userConfig = {}) {
    return axios.put(endPoint, params, addHeaders(userConfig));
  }

  function postFormData(endPoint, params = {}, userConfig = {}) {
    const formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });
    return axios.post(
      endPoint,
      formData,
      addHeaders({ ...userConfig, 'Content-Type': 'multipart/form-data' })
    );
  }

  function patchFormData(endPoint, params = {}, userConfig = {}) {
    const formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });
    return axios.patch(endPoint, formData, addHeaders(userConfig));
  }

  function remove(endPoint, params = {}, userConfig = {}) {
    return axios.delete(endPoint, addHeaders(userConfig));
  }

  return {
    setAuthorizationToken,
    getAuthorizationToken,
    resetAuthorizationToken,
    get,
    post,
    put,
    patchFormData,
    postFormData,
    remove,
  };
};

export default AxiosService();
