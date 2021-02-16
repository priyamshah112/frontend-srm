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
  showDishListInDishesEndpoint,
  lunchMenuSearchEndpoit,
  lunchMenuGetByDishEndpoit,
  lunchMenuAllEndpoit,
  lunchMenuDishDetailsEndpoit,
  removeLunchImageEndpoint,
  holidayAllEndpoint,
  holidayByMonthEndpoint,
  miscellaneousEndpoint,
  diaryMultipleEndpoint,
  diaryEndpoint,
  schoolGradeEndpoint,
  classStudentListEndpoint,
  libraryEndpoint,
  libraryBookEndpoint,
  diaryAcknowledgementEndpoint,
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

export const publishWeeklyTimeTableApi = (data, class_id) =>
  apiService.put(
    `${publishWeeklyTimeTableEndpoint}?class_id=${class_id}`,
    data
  );

export const publishLtrWeeklyTimeTableApi = (class_id, data) =>
  apiService.put(
    `${publishWeeklyTimeTableEndpoint}?class_id=${class_id}`,
    data
  );

export const updateDataSubjectIdApi = (data, id, class_id) =>
  apiService.put(
    `${updateDataSubjectIdEndpoint}/${id}?class_id=${class_id}`,
    data
  );

export const deleteRowWeeklyTimeTableApi = (id) =>
  apiService.remove(`${deleteRowWeeklyTimeTableEndpoint}/${id}`);

export const addDishInDishesApi = (data) =>
  apiService.post(`${addDishInDishesEndpoint}`, data);

export const showDishListInDishesApi = (school_id, data) =>
  apiService.get(
    `${showDishListInDishesEndpoint}?school_id=${school_id}`,
    data
  );

export const deleteDishInDishesApi = (id) =>
  apiService.remove(`${showDishListInDishesEndpoint}/${id}`);

export const updateDishInDishesApi = (data, id, class_id, school_id) =>
  apiService.put(
    `${addDishInDishesEndpoint}/${id}?class_id=${class_id}&schoo_id=${school_id}`,
    data
  );

export const lunchMenuSearchApi = (weekday_id, class_id, school_id, data) =>
  apiService.get(
    `${lunchMenuSearchEndpoit}/${weekday_id}?school_id=${school_id}&class_id=${class_id}`,
    data
  );

export const lunchMenuGetByDishApi = (school_id, data) =>
  apiService.get(
    `${lunchMenuGetByDishEndpoit}?get_by=dish&school_id=${school_id}`,
    data
  );

export const lunchMenuGetByWeekApi = (data) =>
  apiService.get(`${lunchMenuGetByDishEndpoit}?get_by=week`, data);

export const lunchMenuPublishNowApi = (list_menu_id, data) =>
  apiService.put(`${lunchMenuGetByDishEndpoit}/${list_menu_id}`, data);

export const getLunchMenuIdApi = (data) =>
  apiService.post(`${lunchMenuGetByDishEndpoit}`, data);

export const lunchMenuAllApi = (school_id, class_id, data) =>
  apiService.get(
    `${lunchMenuAllEndpoit}?school_id=${school_id}&class_id=${class_id}`,
    data
  );

export const lunchMenuAllStuApi = (data) =>
  apiService.get(`${lunchMenuAllEndpoit}`, data);

export const menuDishDetailsApi = (dish_id, data) =>
  apiService.get(`${lunchMenuDishDetailsEndpoit}/${dish_id}`, data);

export const deleteMenuInListApi = (menu_id, school_id, class_id) =>
  apiService.remove(
    `${lunchMenuGetByDishEndpoit}/${menu_id}?school_id=${school_id}&class_id=${class_id}`
  );

export const removeLunchImageApi = (id) =>
  apiService.remove(`${removeLunchImageEndpoint}/${id}`);

export const holidayAllApi = (school_id, data) =>
  apiService.get(`${holidayAllEndpoint}?school_id=${school_id}`, data);

export const getByMonthApi = (data) =>
  apiService.get(`${holidayAllEndpoint}?get_by=month`, data);

export const holidayByMonthApi = (month_id, school_id, data) =>
  apiService.get(
    `${holidayByMonthEndpoint}/${month_id}?school_id=${school_id}`,
    data
  );

export const miscellaneousApi = (data) =>
  apiService.post(`${miscellaneousEndpoint}`, data);

export const updateMiscellaneousApi = (id, data) =>
  apiService.put(`${miscellaneousEndpoint}/${id}`, data);

export const getMiscellaneousApi = (id, data) =>
  apiService.get(`${miscellaneousEndpoint}/${id}`, data);

export const getAllMiscellaneousApi = (data) =>
  apiService.get(`${miscellaneousEndpoint}`, data);

export const postDiaryMultipleApi = () =>
  apiService.post(`${diaryMultipleEndpoint}`);

export const putDiaryMultipleApi = (id, data) =>
  apiService.put(`${diaryMultipleEndpoint}/${id}`, data);

export const schoolGradeApi = (school_id, data) =>
  apiService.get(`${schoolGradeEndpoint}?school_id=${school_id}`, data);

export const getDiaryMultipleApi = () =>
  apiService.get(`${diaryMultipleEndpoint}`);

export const diarySeenUnseenApi = (id) =>
  apiService.get(`${diaryEndpoint}/${id}`);

export const diaryDeleteApi = (id) =>
  apiService.remove(`${diaryEndpoint}/${id}`);

export const individualDiaryPostApi = () => apiService.post(`${diaryEndpoint}`);

export const individualDiaryPostParentApi = (token) =>
  apiService.post(
    `${diaryEndpoint}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const individualDiaryPutApi = (id, role, student_id, data) =>
  apiService.put(
    `${diaryEndpoint}/${id}?current_role=${role}&student_id=${student_id}`,
    data
  );

export const individualDiaryPutForParentApi = (
  id,
  role,
  data,
  student_id,
  token
) =>
  apiService.put(
    `${diaryEndpoint}/${id}?current_role=${role}&student_id=${student_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const byTeacherDiaryApi = (student_id, param, role) =>
  apiService.get(
    `${diaryEndpoint}?by_me=${param}&current_role=${role}&student_id=${student_id}`
  );

export const byParentDiaryApi = (param, role, student_id, token) =>
  apiService.get(
    `${diaryEndpoint}?current_role=${role}&student_id=${student_id}&by_me=${param}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const forTeacherDiaryApi = (student_id, role) =>
  apiService.get(
    `${diaryEndpoint}?student_id=${student_id}&current_role=${role}`
  );

export const forParentDiaryApi = (role, student_id, token) =>
  apiService.get(
    `${diaryEndpoint}?current_role=${role}&student_id=${student_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getDetailsByIdApi = (id, role, student_id) =>
  apiService.get(
    `${diaryEndpoint}/${id}?current_role=${role}&student_id=${student_id}`
  );

export const getDetailsByIdParentApi = (id, role, student_id, token) =>
  apiService.get(
    `${diaryEndpoint}/${id}?current_role=${role}&student_id=${student_id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const classStudentListApi = (class_id, username) =>
  apiService.get(
    `${classStudentListEndpoint}?class_id=${class_id}&username=${username}`
  );

export const getLibraryInfoApi = (student_id) =>
  apiService.get(`${libraryEndpoint}?student_id=${student_id}`);

export const studentLibraryInfoApi = () => apiService.get(`${libraryEndpoint}`);

export const getLibraryInfoByIdApi = (id, student_id) =>
  apiService.get(`${libraryEndpoint}/${id}?student_id=${student_id}`);

export const postLibraryApi = (data) =>
  apiService.post(`${libraryEndpoint}`, data);

export const putLibraryApi = (id, data) =>
  apiService.put(`${libraryEndpoint}/${id}`, data);

export const studentSideDataApi = () => apiService.get(`${diaryEndpoint}`);

export const putReturnLibraryApi = (id, data) =>
  apiService.put(`${libraryEndpoint}/${id}`, data);

export const searchBookApi = (param, data) =>
  apiService.get(`${libraryBookEndpoint}?book=${param}`, data);

export const putAcknowledgementApi = (id, role) =>
  apiService.put(`${diaryAcknowledgementEndpoint}/${id}?current_role=${role}`);

export const putAcknowledgementParentApi = (id, role, token) =>
  apiService.put(
    `${diaryAcknowledgementEndpoint}/${id}?current_role=${role}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
