import * as actionTypes from "./actionTypes";
import { updateObject } from "../../../shared/utility";

const initalState = {
  notificationCount: 0,
};
const setCount = (state, count) => {
  return updateObject(state, { notificationCount: count });
};
const addCount = (state) => {
  return updateObject(state, {
    notificationCount: state.notificationCount + 1,
  });
};
const subCount = (state) => {
  return updateObject(state, {
    notificationCount: state.notificationCount - 1,
  });
};
const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION_COUNT:
      return setCount(state, action.count);
    case actionTypes.ADD_NOTIFICATION_COUNT:
      return addCount(state);
    case actionTypes.SUB_NOTIFICATION_COUNT:
      return subCount(state);
    default:
      return state;
  }
};
export default reducer;
