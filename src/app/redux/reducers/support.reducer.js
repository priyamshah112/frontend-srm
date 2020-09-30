import supportActionTypes from "../action-types/support.actionTypes";

const initialState = {
  supports: [],
  supportsListInfo: {},
  supportLoading: false,
  supportPaginationLoading: false,

  categories: [],
  categoryLoading: false,

  postSupportLoading: false,
  singleSupportLoading: false,
  singleCategoryLoading: false,
  updateSupportLoading: false,
  postCommentLoading: false,
};

const SupportReducer = (state = initialState, action) => {
  switch (action.type) {
    case supportActionTypes.GET_SUPPORTS.START:
      return {
        ...state,
        supportLoading: true,
        supportPaginationLoading: !!action.data.data,
      };
    case supportActionTypes.GET_SUPPORTS.SUCCESS:
      return {
        ...state,
        supportsListInfo: action.payload.data,
        supports: getListData(state.photos, action),
        supportLoading: false,
        supportPaginationLoading: false,
      };
    case supportActionTypes.GET_SUPPORTS.FAIL:
      return {
        ...state,
        supportLoading: false,
        supportPaginationLoading: false,
      };

    case supportActionTypes.GET_CATEGORY.START:
      return {
        ...state,
        categoryLoading: true,
      };
    case supportActionTypes.GET_CATEGORY.SUCCESS:
      return {
        ...state,
        categories: action.payload.data,
        categoryLoading: false,
      };
    case supportActionTypes.GET_CATEGORY.FAIL:
      return {
        ...state,
        categoryLoading: false,
      };

    case supportActionTypes.POST_SUPPORTS.START:
      return {
        ...state,
        postSupportLoading: action.data.loading,
      };
    case supportActionTypes.POST_SUPPORTS.SUCCESS:
      return {
        ...state,
        postSupportLoading: false,
      };
    case supportActionTypes.POST_SUPPORTS.FAIL:
      return {
        ...state,
        postSupportLoading: false,
      };

    case supportActionTypes.GET_SINGLE_SUPPORT.START:
      return {
        ...state,
        singleSupportLoading: true,
      };
    case supportActionTypes.GET_SINGLE_SUPPORT.SUCCESS:
      return {
        ...state,
        singleSupportLoading: false,
      };
    case supportActionTypes.GET_SINGLE_SUPPORT.FAIL:
      return {
        ...state,
        singleSupportLoading: false,
      };

    case supportActionTypes.GET_SINGLE_CATEGORY.START:
      return {
        ...state,
        singleCategoryLoading: true,
      };
    case supportActionTypes.GET_SINGLE_CATEGORY.SUCCESS:
      return {
        ...state,
        singleCategoryLoading: false,
      };
    case supportActionTypes.GET_SINGLE_CATEGORY.FAIL:
      return {
        ...state,
        singleCategoryLoading: false,
      };

    case supportActionTypes.UPDATE_SUPPORT.START:
      return {
        ...state,
        updateSupportLoading: action.data.loading,
      };
    case supportActionTypes.UPDATE_SUPPORT.SUCCESS:
      return {
        ...state,
        updateSupportLoading: false,
      };
    case supportActionTypes.UPDATE_SUPPORT.FAIL:
      return {
        ...state,
        updateSupportLoading: false,
      };

    case supportActionTypes.POST_COMMENT.START:
      return {
        ...state,
        postCommentLoading: true,
      };
    case supportActionTypes.POST_COMMENT.SUCCESS:
      return {
        ...state,
        postCommentLoading: false,
      };
    case supportActionTypes.POST_COMMENT.FAIL:
      return {
        ...state,
        postCommentLoading: false,
      };
    default:
      return state;
  }
};

function getListData(data = [], action = {}) {
  const newData = action.payload.data ? action.payload.data.data : [];
  let list = newData;
  if (action.data.data) {
    list = [...data, ...newData];
  }
  return list;
}

export default SupportReducer;
