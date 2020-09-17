import {
  put,
  call,
  takeEvery,
  all,
  delay,
  takeLatest,
} from "redux-saga/effects";
import { push } from "connected-react-router";
import * as moment from "moment";

import * as actions from "./action";
import * as actionTypes from "./actionTypes";
import NotificationService from "../NotificationService";

const USE_API = process.env.REACT_APP_USE_API;

export function* watchNotification() {
  yield takeEvery(actionTypes.START_NOTIFICATION_COUNT, startNotifcationCount);
}

export function* startNotifcationCount(action) {
  const token = yield localStorage.getItem("srmToken");
  const selectedRole = yield localStorage.getItem("srmSelectedRole");

  try {
    const response = yield NotificationService.fetchNotificationCount(
      token,
      selectedRole
    );
    if (response.status === 200) {
      yield put(
        actions.setNotificationCount(
          response.data.data.unread_notification_count
        )
      );
    }
  } catch (e) {
    console.log(e);
  }
}
