import * as actionTypes from "./actionTypes";

export const setChat = (chat) => {
  // console.log("Action", chat)
  return {
    type: actionTypes.START_SET_CHAT,
    chat: chat
  };
};
