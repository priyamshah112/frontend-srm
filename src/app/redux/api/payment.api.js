import apiService from './axios-service'
import {
  postPaymentEndpoint,
  commentsEndpoint,
  postCommentEndpoint,
  paidUsersEndpoint,
  paymentEndpoint,
  payEndpoint,
} from './endpoint-constants'

export const postPaymentApi = () =>
  apiService.post(`${postPaymentEndpoint}?type=payment`)
export const getPaymentApi = (page) =>
  apiService.get(
    `${postPaymentEndpoint}?type=payments&created_by=true&page=${page}`,
  )

export const getPaymentByIdApi = (id) =>
  apiService.get(`${postPaymentEndpoint}/${id}`)

export const removePaymentApi = (id) =>
  apiService.remove(`${postPaymentEndpoint}/${id}`)

export const putPaymentApi = (id, data) =>
  apiService.put(`${postPaymentEndpoint}/${id}`, data)

export const getCommentsApi = (id, page, token) =>
  apiService.get(`${commentsEndpoint}/${id}?page=${page}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const postCommentsApi = (id, data, token) =>
  apiService.post(`${postCommentEndpoint}/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const paidUsersApi = (id) =>
  apiService.get(`${paidUsersEndpoint}/${id}?status=paid`)

export const unpaidUsersApi = (id) =>
  apiService.get(`${paidUsersEndpoint}/${id}?status=unpaid`)

export const paymentByIdApi = (id) => apiService.get(`${paymentEndpoint}/${id}`)

export const postPayApi = (id, role, data) =>
  apiService.post(`${payEndpoint}/${id}?current_role=${role}`, data)

export const createOrderApi = (id, amount) =>
  apiService.put(`${paymentEndpoint}/${id}?amount=${amount}`)
