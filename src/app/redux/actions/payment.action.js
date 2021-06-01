import * as paymentApi from '../api/payment.api'
import commonActions from '../action-types/common'
import paymentActionTypes from '../action-types/payment.actionTypes'

export const postPayment = (onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: paymentActionTypes.POST_PAYMENT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => paymentApi.postPaymentApi(),
})

export const getPayment = (page, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: paymentActionTypes.GET_PAYMENT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => paymentApi.getPaymentApi(page),
})

export const getPaymentById = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: paymentActionTypes.GET_PAYMENT_BY_ID,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => paymentApi.getPaymentByIdApi(id),
})

export const removePayment = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: paymentActionTypes.REMOVE_PAYMENT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => paymentApi.removePaymentApi(id),
})

export const putPayment = (id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: paymentActionTypes.PUT_PAYMENT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => paymentApi.putPaymentApi(id, data),
})

export const getComments = (id, page, token, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: paymentActionTypes.GET_COMMENTS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => paymentApi.getCommentsApi(id, page, token),
})

export const postComments = (id, data, token, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: paymentActionTypes.POST_COMMENTS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => paymentApi.postCommentsApi(id, data, token),
})

export const paidUsers = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: paymentActionTypes.PAID_USERS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => paymentApi.paidUsersApi(id),
})

export const unpaidUsers = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: paymentActionTypes.UNPAID_USERS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => paymentApi.unpaidUsersApi(id),
})

export const paymentById = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: paymentActionTypes.PAYMENT_BY_ID,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => paymentApi.paymentByIdApi(id),
})

export const postPay = (id, role, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: paymentActionTypes.POST_PAY,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => paymentApi.postPayApi(id, role, data),
})

export const createOrder = (id, amount, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: paymentActionTypes.CREATE_ORDER,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => paymentApi.createOrderApi(id, amount),
})
