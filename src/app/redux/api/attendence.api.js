import apiService from "./axios-service";
import { attendancesEndpoint, classesEndpoint, studentEndpoint, subjectsEndpoint } from "./endpoint-constants";

export const getAttendenceApi = (data) =>
  apiService.get(`${attendancesEndpoint}`, {params: data});

export const getClassesApi = () =>
  apiService.get(`${classesEndpoint}`);

export const getStudentsApi = (params) =>
  apiService.get(`${studentEndpoint}`, {params});

export const getSubjectsApi = () =>
  apiService.get(`${subjectsEndpoint}`);

export const postAttendanceApi = (data) =>
  apiService.post(`${attendancesEndpoint}`, data);
