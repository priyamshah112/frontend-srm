import apiService from "./axios-service";
import {
  attendancesEndpoint,
  classesEndpoint,
  exportAttendanceEndpoint,
  importAttendanceEndpoint,
  studentEndpoint,
  subjectsEndpoint,
  weeklyTimeTableSubjectsEndpoint,
  addSubjectsOrTimeEndpoit,
  getWeekFilterUsingAllEndpoint,
  publishWeeklyTimeTableEndpoint,
  updateDataSubjectIdEndpoint,
  deleteRowWeeklyTimeTableEndpoint,
  addDishInDishesEndpoint,
} from "./endpoint-constants";

export const getAttendenceApi = (params) =>
  apiService.get(`${attendancesEndpoint}`, { params });

export const getClassesApi = () => apiService.get(`${classesEndpoint}`);

export const getSingleClassApi = (id) =>
  apiService.get(`${classesEndpoint}/${id}`);

export const getStudentsApi = (params) =>
  apiService.get(`${studentEndpoint}`, { params });

export const getSubjectsApi = (params) =>
  apiService.get(`${subjectsEndpoint}`, { params });

export const postAttendanceApi = (data) =>
  apiService.post(`${attendancesEndpoint}`, data);

export const updateAddendanceApi = (data, id) =>
  apiService.put(`${attendancesEndpoint}/${id}`, data);

export const importAttendanceApi = (data) =>
  apiService.post(`${importAttendanceEndpoint}`, data);

export const exportAddendanceApi = (params) =>
  apiService.get(`${exportAttendanceEndpoint}`, { params });

export const weeklyTimeTableSubjectsApi = (classId) =>
  apiService.get(
    `${weeklyTimeTableSubjectsEndpoint}?class_id=${classId}&get_by=subject`
  );

export const addSubjectsOrTimeApi = (data, class_id) =>
  apiService.post(`${addSubjectsOrTimeEndpoit}?class_id=${class_id}`, data);

export const getWeekFilterUsingAllApi = (classId) =>
  apiService.get(`${getWeekFilterUsingAllEndpoint}?class_id=${classId}`);

export const publishWeeklyTimeTableApi = (class_id) =>
  apiService.put(`${publishWeeklyTimeTableEndpoint}?class_id=${class_id}`);

export const updateDataSubjectIdApi = (data, id, class_id) =>
  apiService.put(
    `${updateDataSubjectIdEndpoint}/${id}?class_id=${class_id}`,
    data
  );

export const deleteRowWeeklyTimeTableApi = (id) =>
  apiService.remove(`${deleteRowWeeklyTimeTableEndpoint}/${id}`);
export const addDishInDishesApi = (data) =>
  apiService.post(`${addDishInDishesEndpoint}`, data);
