import * as supportApi from "../api/support.api";
import commonActions from "../action-types/common";
import supportActionTypes from "../action-types/support.actionTypes";

export const getSupports = (data) => {
  return {
    type: commonActions.COMMON_API_CALL,
    subtypes: supportActionTypes.GET_SUPPORTS,
    data: { data },
    promise: () => supportApi.getSupportsApi(data),
  };
};

export const getCategory = () => {
  return {
    type: commonActions.COMMON_API_CALL,
    subtypes: supportActionTypes.GET_CATEGORY,
    promise: () => supportApi.getCategoryApi(),
  };
};

export const getSingleCategory = (id, onSuccess) => {
  return {
    type: commonActions.COMMON_API_CALL,
    subtypes: supportActionTypes.GET_SINGLE_CATEGORY,
    onSuccessCallback: onSuccess,
    promise: () => supportApi.getSingleCategoryApi(id),
  };
};

export const postSupport = (data, onSuccess, onFail, loading=true) => {
  return {
    type: commonActions.COMMON_API_CALL,
    subtypes: supportActionTypes.POST_SUPPORTS,
    data: { data, loading },
    onSuccessCallback: onSuccess,
    onFailCallback: onFail,
    promise: () => supportApi.postSupportApi(data),
  };
};

export const getSingleSupport = (id, onSuccess, onFail) => {
  return {
    type: commonActions.COMMON_API_CALL,
    subtypes: supportActionTypes.GET_SINGLE_SUPPORT,
    data: { id },
    onSuccessCallback: onSuccess,
    onFailCallback: onFail,
    promise: () => supportApi.getSingleSupportApi(id),
  };
};

export const updateSupport = (data, id, onSuccess, onFail, loading=true) => {
  return {
    type: commonActions.COMMON_API_CALL,
    subtypes: supportActionTypes.UPDATE_SUPPORT,
    data: { data, id, loading },
    onSuccessCallback: onSuccess,
    onFailCallback: onFail,
    promise: () => supportApi.updateSupportApi(data, id),
  };
};

export const postComment = (data, onSuccess, onFail) => {
  return {
    type: commonActions.COMMON_API_CALL,
    subtypes: supportActionTypes.POST_COMMENT,
    onSuccessCallback: onSuccess,
    onFailCallback: onFail,
    promise: () => supportApi.postCommentApi(data),
  };
};

export const getSupportsHistory = (data, onSuccess, onFail) => {
  return {
    type: commonActions.COMMON_API_CALL,
    subtypes: supportActionTypes.GET_SUPPORT_HISTORY,
    onSuccessCallback: onSuccess,
    onFailCallback: onFail,
    promise: () => supportApi.getSupportsHistoryApi(data),
  };
};
