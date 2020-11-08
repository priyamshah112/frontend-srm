import * as actionTypes from "./actionTypes";
import { updateObject } from "../../../shared/utility";

const initalState = {
  chat: {},
};
const setChat = (state, chat) => {
  return updateObject(state, { chat : chat });
};
const chatReducer = (state = initalState, action) => {
  // console.log("Reducer", action)
  switch (action.type) {
    case actionTypes.START_SET_CHAT:
      return setChat(state, action.chat);
    default:
      return state;
  }
};
export default chatReducer;
