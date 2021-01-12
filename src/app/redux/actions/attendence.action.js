import * as attendenceApi from "../api/attendence.api";
import commonActions from "../action-types/common";
import attendenceActionTypes from "../action-types/attendence.actionTypes";

export const getAttendence = (params, onSuccess, onFail) => {
  return {
    type: commonActions.COMMON_API_CALL,
    subtypes: attendenceActionTypes.GET_ATTENDENCE,
    onSuccessCallback: onSuccess,
    onFailCallback: onFail,
    data: { params },
    promise: () => attendenceApi.getAttendenceApi(params),
  };
};

export const getClasses = () => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_CLASSES,
  promise: () => attendenceApi.getClassesApi(),
});

export const getSingleClass = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_SINGLE_CLASS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.getSingleClassApi(id),
});

export const getStudents = (data) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_STUDENTS,
  promise: () => attendenceApi.getStudentsApi(data),
});

export const getSubjects = (params) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_SUBJECTS,
  promise: () => attendenceApi.getSubjectsApi(params),
});

export const postAddendance = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.POST_ATTENDANCE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.postAttendanceApi(data),
});

export const updateAddendance = (data, id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.UPDATE_ATTENDANCE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.updateAddendanceApi(data, id),
});

export const importAttendance = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.IMPORT_ATTENDANCE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.importAttendanceApi(data),
});

export const exportAttendance = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.EXPORT_ATTENDANCE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.exportAddendanceApi(data),
});

export const weeklyTimeTableSubject = (classId, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_WEEKLY_TIMETABLE_SUBJECTS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.weeklyTimeTableSubjectsApi(classId),
});

export const addSubjectsOrTime = (data, classId, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.POST_ADD_SUBJECTS_OR_TIME,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.addSubjectsOrTimeApi(data, classId),
});

export const getWeekFilterUsingALL = (classId, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_WEEK_FILTER_USING_ALL,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  data: { classId },
  promise: () => attendenceApi.getWeekFilterUsingAllApi(classId),
});

export const publishWeeklyTimeTable = (classId, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.PUBLISH_WEEKLY_TIME_TABLE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.publishWeeklyTimeTableApi(classId),
});

export const updateDataSubjectId = (data, id, classId, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.POST_ADD_SUBJECTS_OR_TIME,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.updateDataSubjectIdApi(data, id, classId),
});

export const deleteRowWeeklyTimeTable = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.DELETE_ROW_WEEKLY_TIME_TABLE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.deleteRowWeeklyTimeTableApi(id),
})
export const AddDishInDishes = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.ADD_DISH_IN_DISHES,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.addDishInDishesApi(data),
});
