import * as actionTypes from "./actionTypes";
import { updateObject } from "../../../shared/utility";

const initialState = {
  token: null,
  userInfo: {
    userId: null,
    userPhoneNo: null,
    userName: null,
    userPic: null,
    roles: null,
  },
  selectedRole: null,
  error: null,
  loading: false,
  redirectUrl: null,
  changeRole: false,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.authData.token,
    userInfo: action.authData.userInfo,
    redirectUrl: action.authData.redirectUrl,
    error: null,
    loading: false,
    selectedRole: action.authData.selectedRole,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state) => {
  return updateObject(state, {
    token: null,
    userInfo: null,
    selectedRole: null,
    redirectUrl: null,
  });
};

const authRoleSelection = (state, action) => {
  return updateObject(state, {
    selectedRole: action.selectedRole,
    changeRole: false,
  });
};

const authInitiateRoleSelection = (state, action) => {
  return updateObject(state, {
    changeRole: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.AUTH_ROLE_SELECTION:
      return authRoleSelection(state, action);
    case actionTypes.AUTH_INITIATE_ROLE_SELECTION:
      return authInitiateRoleSelection(state, action);
    default:
      return state;
  }
};

export default reducer;
