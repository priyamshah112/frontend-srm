import apiService from './axios-service'
import { reportEndpoint, downloadReportEndpoint } from './endpoint-constants'

export const postReportApi = () => apiService.post(`${reportEndpoint}`)

export const putAssignmentApi = (id, data) =>
  apiService.put(`${reportEndpoint}/${id}`, data)

export const putAttendanceApi = (id, data) =>
  apiService.put(`${reportEndpoint}/${id}?get_type=attendance`, data)

export const putPaymentApi = (id, data) =>
  apiService.put(`${reportEndpoint}/${id}?get_type=payment`, data)

export const getReportApi = (type, page) =>
  apiService.get(`${reportEndpoint}?get_type=${type}&page=${page}`)

export const getReportByIdApi = (id, type, page) => {
console.log('page :>> ', page);
  return apiService.get(`${reportEndpoint}/${id}?get_type=${type}&page=${page}`)
}

export const deleteReportApi = (id) =>
  apiService.remove(`${reportEndpoint}/${id}`)

export const downloadReportApi = (id, type) =>
  apiService.get(
    `${downloadReportEndpoint}/${id}?get_type=${type}&get_report=sheet`,
  )
