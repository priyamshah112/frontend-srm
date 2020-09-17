import * as actionTypes from "./actionTypes";

export const startNotificationCount = () => {
  return {
    type: actionTypes.START_NOTIFICATION_COUNT,
  };
};
export const setNotificationCount = (count) => {
  return {
    type: actionTypes.SET_NOTIFICATION_COUNT,
    count: count,
  };
};
export const addNotificationCount = () => {
  return {
    type: actionTypes.ADD_NOTIFICATION_COUNT,
  };
};
export const subNotificationCount = () => {
  return {
    type: actionTypes.SUB_NOTIFICATION_COUNT,
  };
};
