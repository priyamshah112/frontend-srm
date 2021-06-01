import axios from 'axios'

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class PaymentService {
  fetchPaymentsParent(token, currentPage, role, status, student_id) {
    return axios.get(
      `${BACKEND_API_URL}/payments?current_role=${role}&page=${currentPage}&status=${status}&student_id=${student_id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }
  fetchPayments(token, currentPage, role, status) {
    return axios.get(
      `${BACKEND_API_URL}/payments?current_role=${role}&page=${currentPage}&status=${status}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }
  fetchFilterPayments(token, filter, currentPage) {
    return axios.get(`${BACKEND_API_URL}/payments`, {
      params: { status: filter, page: currentPage },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }
  fetchPaymentById(token, id) {
    return axios.get(`${BACKEND_API_URL}/payments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  }
  fetchOrderId(token, notificationId, paymentId, amount) {
    return axios.put(
      `${BACKEND_API_URL}/payments/${paymentId}`,
      {
        amount: amount,
        notification_id: notificationId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }
  verifySignature(token, payload, id, role) {
    return axios.post(
      `${BACKEND_API_URL}/pay/${id}?current_role=${role}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }
}

export default new PaymentService()
