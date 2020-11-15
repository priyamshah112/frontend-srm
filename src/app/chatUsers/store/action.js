import * as actionTypes from "./actionTypes";

export const setChat = (chat) => {
  // console.log("Action", chat)
  return {
    type: actionTypes.START_SET_CHAT,
    chat: chat
  };
};

export const setGroup = (group) => {
  // console.log("Action", chat)
  return {
    type: actionTypes.SET_GROUP,
    group: group
  };
};
