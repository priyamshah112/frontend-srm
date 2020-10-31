import attendenceActionTypes from '../action-types/attendence.actionTypes';

const initialState = {
  attendence: [],
  attendenceLoading: {},

  classes: [],
  classesLoading: false,

  students: [],
  studentsLoading: false,

  subjects: [],
  subjectsLoading: false,

  postAttendanceLoading: false,
  singleClassLoading: false,

  importLoading: false,
  exportLoading: false,
};

const AttendenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case attendenceActionTypes.GET_ATTENDENCE.START:
      return {
        ...state,
        attendenceLoading: true,
      };
    case attendenceActionTypes.GET_ATTENDENCE.SUCCESS:
      return {
        ...state,
        attendence: action.payload.data,
        attendenceLoading: false,
      };
    case attendenceActionTypes.GET_ATTENDENCE.FAIL:
      return {
        ...state,
        attendenceLoading: false,
      };

    case attendenceActionTypes.GET_CLASSES.START:
      return {
        ...state,
        classesLoading: true,
      };
    case attendenceActionTypes.GET_CLASSES.SUCCESS:
      return {
        ...state,
        classes: action.payload.data,
        classesLoading: false,
      };
    case attendenceActionTypes.GET_CLASSES.FAIL:
      return {
        ...state,
        classesLoading: false,
      };

    case attendenceActionTypes.GET_SINGLE_CLASS.START:
      return {
        ...state,
        singleClassLoading: true,
      };
    case attendenceActionTypes.GET_SINGLE_CLASS.SUCCESS:
      return {
        ...state,
        singleClassLoading: false,
      };
    case attendenceActionTypes.GET_SINGLE_CLASS.FAIL:
      return {
        ...state,
        singleClassLoading: false,
      };

    case attendenceActionTypes.GET_STUDENTS.START:
      return {
        ...state,
        studentsLoading: true,
      };
    case attendenceActionTypes.GET_STUDENTS.SUCCESS:
      return {
        ...state,
        students: action.payload.data,
        studentsLoading: false,
      };
    case attendenceActionTypes.GET_STUDENTS.FAIL:
      return {
        ...state,
        studentsLoading: false,
      };

    case attendenceActionTypes.GET_SUBJECTS.START:
      return {
        ...state,
        subjectsLoading: true,
      };
    case attendenceActionTypes.GET_SUBJECTS.SUCCESS:
      return {
        ...state,
        subjects: action.payload.data ? action.payload.data.data : [],
        subjectsLoading: false,
      };
    case attendenceActionTypes.GET_SUBJECTS.FAIL:
      return {
        ...state,
        subjectsLoading: false,
      };

    case attendenceActionTypes.POST_ATTENDANCE.START:
      return {
        ...state,
        postAttendanceLoading: true,
      };
    case attendenceActionTypes.POST_ATTENDANCE.SUCCESS:
      return {
        ...state,
        postAttendanceLoading: false,
      };
    case attendenceActionTypes.POST_ATTENDANCE.FAIL:
      return {
        ...state,
        postAttendanceLoading: false,
      };

    case attendenceActionTypes.IMPORT_ATTENDANCE.START:
      return {
        ...state,
        importLoading: true,
      };
    case attendenceActionTypes.IMPORT_ATTENDANCE.SUCCESS:
      return {
        ...state,
        importLoading: false,
      };
    case attendenceActionTypes.IMPORT_ATTENDANCE.FAIL:
      return {
        ...state,
        importLoading: false,
      };

    case attendenceActionTypes.EXPORT_ATTENDANCE.START:
      return {
        ...state,
        exportLoading: true,
      };
    case attendenceActionTypes.EXPORT_ATTENDANCE.SUCCESS:
      return {
        ...state,
        exportLoading: false,
      };
    case attendenceActionTypes.EXPORT_ATTENDANCE.FAIL:
      return {
        ...state,
        exportLoading: false,
      };
    default:
      return state;
  }
};

export default AttendenceReducer;
