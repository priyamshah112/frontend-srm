import reportActionTypes from '../action-types/report.actionTypes'

const initialState = {
  postReport: [],
  postReportLoading: false,

  putAssignment: [],
  putAssignmentLoading: false,

  putNews: [],
  putNewsLoading: false,

  putAttendance: [],
  putAttendanceLoading: false,

  putPayment: [],
  putPaymentLoading: false,

  getReportById: [],
  getReportByIdLoading: false,

  deleteReportLoading: false,

  downloadReport: [],
  downloadReportLoading: false,
}

const ReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case reportActionTypes.POST_REPORT.START:
      return {
        ...state,
        postReportLoading: true,
      }
    case reportActionTypes.POST_REPORT.SUCCESS:
      return {
        ...state,
        postReport: action.payload.data,
        postReportLoading: false,
      }
    case reportActionTypes.POST_REPORT.FAIL:
      return {
        ...state,
        postReportLoading: false,
      }

    case reportActionTypes.PUT_ASSIGNMENT.START:
      return {
        ...state,
        putAssignmentLoading: true,
      }
    case reportActionTypes.PUT_ASSIGNMENT.SUCCESS:
      return {
        ...state,
        putAssignment: action.payload.data,
        putAssignmentLoading: false,
      }
    case reportActionTypes.PUT_ASSIGNMENT.FAIL:
      return {
        ...state,
        putAssignmentLoading: false,
      }

    case reportActionTypes.PUT_NEWS.START:
      return {
        ...state,
        putNewsLoading: true,
      }
    case reportActionTypes.PUT_NEWS.SUCCESS:
      return {
        ...state,
        putNews: action.payload.data,
        putNewsLoading: false,
      }
    case reportActionTypes.PUT_NEWS.FAIL:
      return {
        ...state,
        putNewsLoading: false,
      }

    case reportActionTypes.PUT_ATTENDANCE.START:
      return {
        ...state,
        putAttendanceLoading: true,
      }
    case reportActionTypes.PUT_ATTENDANCE.SUCCESS:
      return {
        ...state,
        putAttendance: action.payload.data,
        putAttendanceLoading: false,
      }
    case reportActionTypes.PUT_ATTENDANCE.FAIL:
      return {
        ...state,
        putAttendanceLoading: false,
      }

    case reportActionTypes.PUT_PAYMENT.START:
      return {
        ...state,
        putPaymentLoading: true,
      }
    case reportActionTypes.PUT_PAYMENT.SUCCESS:
      return {
        ...state,
        putPayment: action.payload.data,
        putPaymentLoading: false,
      }
    case reportActionTypes.PUT_PAYMENT.FAIL:
      return {
        ...state,
        putPaymentLoading: false,
      }

    case reportActionTypes.GET_REPORT.START:
      return {
        ...state,
        getReportLoading: true,
      }
    case reportActionTypes.GET_REPORT.SUCCESS:
      return {
        ...state,
        getReport: action.payload.data,
        getReportLoading: false,
      }
    case reportActionTypes.GET_REPORT.FAIL:
      return {
        ...state,
        getReportLoading: false,
      }

    case reportActionTypes.GET_REPORT_BY_ID.START:
      return {
        ...state,
        getReportByIdLoading: true,
      }
    case reportActionTypes.GET_REPORT_BY_ID.SUCCESS:
      return {
        ...state,
        getReportById: action.payload.data,
        getReportByIdLoading: false,
      }
    case reportActionTypes.GET_REPORT_BY_ID.FAIL:
      return {
        ...state,
        getReportByIdLoading: false,
      }

    case reportActionTypes.DELETE_REPORT.START:
      return {
        ...state,
        deleteReportLoading: true,
      }
    case reportActionTypes.DELETE_REPORT.SUCCESS:
      return {
        ...state,
        deleteReportLoading: false,
      }
    case reportActionTypes.DELETE_REPORT.FAIL:
      return {
        ...state,
        deleteReportLoading: false,
      }

    case reportActionTypes.DOWNLOAD_REPORT.START:
      return {
        ...state,
        downloadReportLoading: true,
      }
    case reportActionTypes.DOWNLOAD_REPORT.SUCCESS:
      return {
        ...state,
        downloadReport: action.payload.data,
        downloadReportLoading: false,
      }
    case reportActionTypes.DOWNLOAD_REPORT.FAIL:
      return {
        ...state,
        downloadReportLoading: false,
      }

    default:
      return state
  }
}

export default ReportReducer
