import * as attendenceApi from "../api/attendence.api";
import commonActions from "../action-types/common";
import attendenceActionTypes from "../action-types/attendence.actionTypes";

export const getAttendence = (data) => {
  return {
    type: commonActions.COMMON_API_CALL,
    subtypes: attendenceActionTypes.GET_ATTENDENCE,
    data: { data },
    promise: () => attendenceApi.getAttendenceApi(data),
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
