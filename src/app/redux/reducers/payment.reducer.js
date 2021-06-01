import paymentActionTypes from '../action-types/payment.actionTypes'

const initialState = {
  postPayment: [],
  postPaymentLoading: false,

  getPayment: null,
  getPaymentLoading: false,
  hasMore: true,
  getPaymentInfo: [],

  getPaymentById: [],
  getPaymentByIdLoading: false,

  putPayment: [],
  putPaymentLoading: false,

  getComments: [],
  getCommentsLoading: false,

  postComments: [],
  postCommentsLoading: false,

  paidUsers: [],
  paidUsersLoading: false,

  unpaidUsers: [],
  unpaidUsersLoading: false,

  paymentById: [],
  paymentByIdLoading: false,

  postPay: [],
  postPayLoading: false,

  createOrder: [],
  createOrderLoading: false,

  deleteLoading: false,
}

const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case paymentActionTypes.POST_PAYMENT.START:
      return {
        ...state,
        postPaymentLoading: true,
      }
    case paymentActionTypes.POST_PAYMENT.SUCCESS:
      return {
        ...state,
        postPayment: action.payload.data,
        postPaymentLoading: false,
      }
    case paymentActionTypes.POST_PAYMENT.FAIL:
      return {
        ...state,
        postPaymentLoading: false,
      }

    case paymentActionTypes.GET_PAYMENT.START:
      return {
        ...state,
        getPaymentLoading: true,
      }
    case paymentActionTypes.GET_PAYMENT.SUCCESS:
      return {
        ...state,
        getPayment: paymentList(state, action),
        getPaymentInfo: action.payload.data,
        getPaymentLoading: false,
        hasMore: false,
      }
    case paymentActionTypes.GET_PAYMENT.FAIL:
      return {
        ...state,
        getPaymentLoading: false,
      }

    case paymentActionTypes.GET_PAYMENT_BY_ID.START:
      return {
        ...state,
        getPaymentByIdLoading: true,
      }
    case paymentActionTypes.GET_PAYMENT_BY_ID.SUCCESS:
      return {
        ...state,
        getPaymentById: action.payload.data,
        getPaymentByIdLoading: false,
      }
    case paymentActionTypes.GET_PAYMENT_BY_ID.FAIL:
      return {
        ...state,
        getPaymentByIdLoading: false,
      }

    case paymentActionTypes.PUT_PAYMENT.START:
      return {
        ...state,
        putPaymentLoading: true,
      }
    case paymentActionTypes.PUT_PAYMENT.SUCCESS:
      return {
        ...state,
        putPayment: action.payload.data,
        putPaymentLoading: false,
      }
    case paymentActionTypes.PUT_PAYMENT.FAIL:
      return {
        ...state,
        putPaymentLoading: false,
      }

    case paymentActionTypes.GET_COMMENTS.START:
      return {
        ...state,
        getCommentsLoading: true,
      }
    case paymentActionTypes.GET_COMMENTS.SUCCESS:
      return {
        ...state,
        getComments: action.payload.data,
        getCommentsLoading: false,
      }
    case paymentActionTypes.GET_COMMENTS.FAIL:
      return {
        ...state,
        getCommentsLoading: false,
      }

    case paymentActionTypes.POST_COMMENTS.START:
      return {
        ...state,
        postCommentsLoading: true,
      }
    case paymentActionTypes.POST_COMMENTS.SUCCESS:
      return {
        ...state,
        postComments: action.payload.data,
        postCommentsLoading: false,
      }
    case paymentActionTypes.POST_COMMENTS.FAIL:
      return {
        ...state,
        postCommentsLoading: false,
      }

    case paymentActionTypes.PAID_USERS.START:
      return {
        ...state,
        paidUsersLoading: true,
      }
    case paymentActionTypes.PAID_USERS.SUCCESS:
      return {
        ...state,
        paidUsers: action.payload.data,
        paidUsersLoading: false,
      }
    case paymentActionTypes.PAID_USERS.FAIL:
      return {
        ...state,
        paidUsersLoading: false,
      }

    case paymentActionTypes.UNPAID_USERS.START:
      return {
        ...state,
        unpaidUsersLoading: true,
      }
    case paymentActionTypes.UNPAID_USERS.SUCCESS:
      return {
        ...state,
        unpaidUsers: action.payload.data,
        unpaidUsersLoading: false,
      }
    case paymentActionTypes.UNPAID_USERS.FAIL:
      return {
        ...state,
        unpaidUsersLoading: false,
      }

    case paymentActionTypes.PAYMENT_BY_ID.START:
      return {
        ...state,
        paymentByIdLoading: true,
      }
    case paymentActionTypes.PAYMENT_BY_ID.SUCCESS:
      return {
        ...state,
        paymentById: action.payload.data,
        paymentByIdLoading: false,
      }
    case paymentActionTypes.PAYMENT_BY_ID.FAIL:
      return {
        ...state,
        paymentByIdLoading: false,
      }

    case paymentActionTypes.POST_PAY.START:
      return {
        ...state,
        postPayLoading: true,
      }
    case paymentActionTypes.POST_PAY.SUCCESS:
      return {
        ...state,
        postPay: action.payload.data,
        postPayLoading: false,
      }
    case paymentActionTypes.POST_PAY.FAIL:
      return {
        ...state,
        postPayLoading: false,
      }

    case paymentActionTypes.CREATE_ORDER.START:
      return {
        ...state,
        createOrderLoading: true,
      }
    case paymentActionTypes.CREATE_ORDER.SUCCESS:
      return {
        ...state,
        createOrder: action.payload.data,
        createOrderLoading: false,
      }
    case paymentActionTypes.CREATE_ORDER.FAIL:
      return {
        ...state,
        createOrderLoading: false,
      }

    case paymentActionTypes.REMOVE_PAYMENT.START:
      return {
        ...state,
        deleteLoading: true,
      }
    case paymentActionTypes.REMOVE_PAYMENT.SUCCESS:
      return {
        ...state,
        deleteLoading: false,
      }
    case paymentActionTypes.REMOVE_PAYMENT.FAIL:
      return {
        ...state,
        deleteLoading: false,
      }

    default:
      return state
  }
}

const paymentList = (state, action) => {
  console.log('state,action :>> ', state, action)
  return action.payload.data
}

export default PaymentReducer
