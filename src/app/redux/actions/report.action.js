import * as reportApi from '../api/report.api'
import commonActions from '../action-types/common'
import reportActionTypes from '../action-types/report.actionTypes'

export const postReport = (onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: reportActionTypes.POST_REPORT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => reportApi.postReportApi(),
})

export const putAssignment = (id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: reportActionTypes.PUT_ASSIGNMENT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => reportApi.putAssignmentApi(id, data),
})

export const putNews = (id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: reportActionTypes.PUT_NEWS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => reportApi.putAssignmentApi(id, data),
})

export const putAttendance = (id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: reportActionTypes.PUT_ATTENDANCE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => reportApi.putAttendanceApi(id, data),
})

export const putPayment = (id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: reportActionTypes.PUT_PAYMENT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => reportApi.putPaymentApi(id, data),
})

export const getReport = (type, page, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: reportActionTypes.GET_REPORT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => reportApi.getReportApi(type, page),
})

export const getReportById = (id, type, page, onSuccess, onFail) => {
  console.log('page :>> ', id, type, page)
  return {
    type: commonActions.COMMON_API_CALL,
    subtypes: reportActionTypes.GET_REPORT_BY_ID,
    onSuccessCallback: onSuccess,
    onFailCallback: onFail,
    promise: () => reportApi.getReportByIdApi(id, type, page),
  }
}

export const deleteReport = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: reportActionTypes.DELETE_REPORT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => reportApi.deleteReportApi(id),
})

export const downloadReport = (id, type, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: reportActionTypes.DOWNLOAD_REPORT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => reportApi.downloadReportApi(id, type),
})
