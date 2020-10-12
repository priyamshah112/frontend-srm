import apiService from "./axios-service";
import { attendancesEndpoint, classesEndpoint, exportAttendanceEndpoint, importAttendanceEndpoint, studentEndpoint, subjectsEndpoint } from "./endpoint-constants";

export const getAttendenceApi = (params) =>
  apiService.get(`${attendancesEndpoint}`, {params});

export const getClassesApi = () =>
  apiService.get(`${classesEndpoint}`);

export const getSingleClassApi = (id) =>
  apiService.get(`${classesEndpoint}/${id}`);

export const getStudentsApi = (params) =>
  apiService.get(`${studentEndpoint}`, {params});

export const getSubjectsApi = (params) =>
  apiService.get(`${subjectsEndpoint}`, {params});

export const postAttendanceApi = (data) =>
  apiService.post(`${attendancesEndpoint}`, data);

export const updateAddendanceApi = (data, id) =>
  apiService.put(`${attendancesEndpoint}/${id}`, data);

export const importAttendanceApi = (data) =>
  apiService.post(`${importAttendanceEndpoint}`, data);

export const exportAddendanceApi = (params) =>
  apiService.get(`${exportAttendanceEndpoint}`, {params});
