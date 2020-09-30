import apiService from "./axios-service";
import {
  categoryEndpoint,
  supportsEndpoint,
  supportCommentEndpoint,
} from "./endpoint-constants";

export const getSupportsApi = (params) =>
  apiService.get(`${supportsEndpoint}`, { params });

export const getCategoryApi = () => apiService.get(`${categoryEndpoint}`);
export const getSingleCategoryApi = (id) =>
  apiService.get(`${categoryEndpoint}/${id}`);

export const postSupportApi = (data) =>
  apiService.post(`${supportsEndpoint}`, data);

export const getSingleSupportApi = (id) =>
  apiService.get(`${supportsEndpoint}/${id}`);

export const updateSupportApi = (data, id) =>
  apiService.put(`${supportsEndpoint}/${id}`, data);

export const postCommentApi = (data) =>
  apiService.post(`${supportCommentEndpoint}`, data);
