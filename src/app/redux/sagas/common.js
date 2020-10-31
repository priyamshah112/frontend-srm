import { takeEvery, call, put } from "redux-saga/effects";
import _ from "lodash";
import CommonActions from "../action-types/common";
import { ApiFailMessageFilter } from "./apiFailMessageFilter";

function* handleApiCall(action) {
  const {
    promise,
    onSuccessCallback,
    placeholderData,
    onFailCallback,
  } = action;
  const { START, SUCCESS, FAIL } = action.subtypes;
  const { data = {} } = action;
  yield put({ type: START, data });

  try {
    const response = yield call(promise);
    const result = yield response.data;
    yield put({
      type: SUCCESS,
      payload: placeholderData || result,
      data,
    });

    if (onSuccessCallback && _.isFunction(onSuccessCallback)) {
      onSuccessCallback(result);
    }
  } catch (errors) {
    const error = ApiFailMessageFilter(errors) || {};
    yield put({ type: FAIL, errors, data, error });

    if (onFailCallback && _.isFunction(onFailCallback)) {
      onFailCallback(error, errors);
    }
  }
}

export default function* () {
  yield takeEvery(CommonActions.COMMON_API_CALL, handleApiCall);
}
