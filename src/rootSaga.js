import {
  put,
  call,
  takeEvery,
  all,
  delay,
  takeLatest,
  fork,
} from "redux-saga/effects";
import { watchAuth } from "./app/auth/store/sagas";
import { watchNotification } from "./app/notification/store/saga";
import handleApiCall from "./app/redux/sagas/common";

export function* rootSaga() {
  // console.log("root saga");
  // yield all([watchAuth, watchNotification]);
  yield fork(watchAuth);
  yield fork(watchNotification);
  yield fork(handleApiCall);
}
