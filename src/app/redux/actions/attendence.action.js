import * as attendenceApi from '../api/attendence.api'
import commonActions from '../action-types/common'
import attendenceActionTypes from '../action-types/attendence.actionTypes'

export const getAttendence = (params, onSuccess, onFail) => {
  return {
    type: commonActions.COMMON_API_CALL,
    subtypes: attendenceActionTypes.GET_ATTENDENCE,
    onSuccessCallback: onSuccess,
    onFailCallback: onFail,
    data: { params },
    promise: () => attendenceApi.getAttendenceApi(params),
  }
}

export const getClasses = () => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_CLASSES,
  promise: () => attendenceApi.getClassesApi(),
})

export const getSingleClass = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_SINGLE_CLASS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.getSingleClassApi(id),
})

export const getStudents = (data) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_STUDENTS,
  promise: () => attendenceApi.getStudentsApi(data),
})

export const getSubjects = (params) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_SUBJECTS,
  promise: () => attendenceApi.getSubjectsApi(params),
})

export const postAddendance = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.POST_ATTENDANCE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.postAttendanceApi(data),
})

export const updateAddendance = (data, id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.UPDATE_ATTENDANCE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.updateAddendanceApi(data, id),
})

export const importAttendance = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.IMPORT_ATTENDANCE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.importAttendanceApi(data),
})

export const exportAttendance = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.EXPORT_ATTENDANCE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.exportAddendanceApi(data),
})

export const weeklyTimeTableSubject = (data, classId, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_WEEKLY_TIMETABLE_SUBJECTS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.weeklyTimeTableSubjectsApi(data, classId),
})

export const addSubjectsOrTime = (data, classId, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.POST_ADD_SUBJECTS_OR_TIME,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.addSubjectsOrTimeApi(data, classId),
})

export const getWeekFilterUsingALL = (classId, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_WEEK_FILTER_USING_ALL,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  data: { classId },
  promise: () => attendenceApi.getWeekFilterUsingAllApi(classId),
})

export const publishWeeklyTimeTable = (data, classId, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.PUBLISH_WEEKLY_TIME_TABLE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.publishWeeklyTimeTableApi(data, classId),
})

export const publishLtrWeeklyTimeTable = (
  classId,
  data,
  onSuccess,
  onFail,
) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.PUBLISH_WEEKLY_TIME_TABLE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.publishLtrWeeklyTimeTableApi(classId, data),
})

export const updateDataSubjectId = (data, id, classId, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.POST_ADD_SUBJECTS_OR_TIME,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.updateDataSubjectIdApi(data, id, classId),
})

export const deleteRowWeeklyTimeTable = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.DELETE_ROW_WEEKLY_TIME_TABLE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.deleteRowWeeklyTimeTableApi(id),
})
export const AddDishInDishes = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.ADD_DISH_IN_DISHES,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.addDishInDishesApi(data),
})

export const showDishListInDishes = (page, school_id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.SHOW_DISH_LIST_IN_DISHES,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.showDishListInDishesApi(page, school_id),
})

export const deleteDishInDishes = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.DELETE_DISH_IN_DISHES,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.deleteDishInDishesApi(id),
})

export const updateDishInDishes = (
  data,
  id,
  class_id,
  school_id,
  onSuccess,
  onFail,
) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.UPDATE_DISH_IN_DISHES,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () =>
    attendenceApi.updateDishInDishesApi(data, id, class_id, school_id),
})

export const lunchMenuSearch = (
  weekday_id,
  class_id,
  school_id,
  data,
  onSuccess,
  onFail,
) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.LUNCH_MENU_SEARCH,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () =>
    attendenceApi.lunchMenuSearchApi(weekday_id, class_id, school_id, data),
})

export const lunchMenuGetByDish = (school_id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.LUNCH_MENU_GET_BY_DISH,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.lunchMenuGetByDishApi(school_id, data),
})

export const lunchMenuGetByWeek = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.LUNCH_MENU_GET_BY_WEEK,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.lunchMenuGetByWeekApi(data),
})

export const lunchMenuPublishNow = (list_menu_id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.LUNCH_MENU_PUBLISH_NOW,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.lunchMenuPublishNowApi(list_menu_id, data),
})

export const getLunchMenuId = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_LUNCH_MENU_ID,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.getLunchMenuIdApi(data),
})

export const lunchMenuAll = (school_id, class_id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.LUNCH_MENU_ALL,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.lunchMenuAllApi(school_id, class_id, data),
})

export const lunchMenuAllStu = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.LUNCH_MENU_ALL,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.lunchMenuAllStuApi(data),
})

export const menuDishDetails = (dish_id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.MENU_DISH_DETAILS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.menuDishDetailsApi(dish_id, data),
})

export const deleteMenuInList = (
  menu_id,
  school_id,
  class_id,
  onSuccess,
  onFail,
) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.DELETE_MENU_IN_LIST,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () =>
    attendenceApi.deleteMenuInListApi(menu_id, school_id, class_id),
})

export const removeLunchImage = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.REMOVE_LUNCH_IMAGE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.removeLunchImageApi(id),
})

export const holidayAll = (school_id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.HOLIDAY_ALL,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.holidayAllApi(school_id, data),
})

export const getByMonth = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_BY_MONTH,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.getByMonthApi(data),
})

export const holidayByMonth = (
  month_id,
  school_id,
  data,
  onSuccess,
  onFail,
) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.HOLIDAY_BY_MONTH,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.holidayByMonthApi(month_id, school_id, data),
})

export const postMiscellaneous = (role, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.MISCELLANEOUS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.miscellaneousApi(role, data),
})

export const updateMiscellaneous = (id, role, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.UPDATE_MISCELLANEOUS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.updateMiscellaneousApi(id, role, data),
})

export const getMiscellaneous = (id, role, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_MISCELLANEOUS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.getMiscellaneousApi(id, role),
})

export const miscellaneous = (role, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_ALL_MISCELLANEOUS,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.getAllMiscellaneousApi(role, data),
})

export const postDiaryMultiple = (onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.POST_DIARY_MULTIPLE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.postDiaryMultipleApi(),
})

export const putDiaryMultiple = (id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.PUT_DIARY_MULTIPLE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.putDiaryMultipleApi(id, data),
})

export const schoolGrade = (school_id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.SCHOOL_GRADE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.schoolGradeApi(school_id, data),
})

export const getDiaryMultiple = (page, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_DIARY_MULTIPLE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.getDiaryMultipleApi(page),
})

export const diarySeenUnseen = (id, role, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.DIARY_MULTIPLE_SEEN_UNSEEN,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.diarySeenUnseenApi(id, role),
})

export const diaryDelete = (id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.DELETE_DIARY_MULTIPLE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.diaryDeleteApi(id),
})

export const individualDiaryPost = (onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.INDIVIDUAL_DIARY_POST,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.individualDiaryPostApi(),
})

export const individualDiaryPostParent = (token, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.INDIVIDUAL_DIARY_POST,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.individualDiaryPostParentApi(token),
})

export const individualDiaryPut = (
  id,
  role,
  student_id,
  data,
  onSuccess,
  onFail,
) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.INDIVIDUAL_DIARY_PUT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () =>
    attendenceApi.individualDiaryPutApi(id, role, student_id, data),
})

export const byTeacherDiary = (
  page,
  student_id,
  param,
  role,
  onSuccess,
  onFail,
) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.BY_ME_TEACHER_DIARY,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.byTeacherDiaryApi(page, student_id, param, role),
})

export const byParentDiary = (
  page,
  param,
  role,
  student_id,
  token,
  onSuccess,
  onFail,
) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.BY_ME_TEACHER_DIARY,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () =>
    attendenceApi.byParentDiaryApi(page, param, role, student_id, token),
})

export const forTeacherDiary = (page, student_id, role, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.FOR_ME_TEACHER_DIARY,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.forTeacherDiaryApi(page, student_id, role),
})

export const forParentDiary = (
  page,
  role,
  student_id,
  token,
  onSuccess,
  onFail,
) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.FOR_ME_TEACHER_DIARY,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.forParentDiaryApi(page, role, student_id, token),
})

export const getDetailsById = (id, role, student_id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_DETAILS_BY_ID,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.getDetailsByIdApi(id, role, student_id),
})

export const getDetailsByIdParent = (
  id,
  role,
  student_id,
  token,
  onSuccess,
  onFail,
) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_DETAILS_BY_ID,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () =>
    attendenceApi.getDetailsByIdParentApi(id, role, student_id, token),
})

export const classStudentList = (class_id, username, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.CLASS_STUDENT_LIST,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.classStudentListApi(class_id, username),
})

export const individualDiaryPutForParent = (
  id,
  role,
  data,
  student_id,
  token,
  onSuccess,
  onFail,
) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.INDIVIDUAL_DIARY_PUT_FOR_PARENT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () =>
    attendenceApi.individualDiaryPutForParentApi(
      id,
      role,
      data,
      student_id,
      token,
    ),
})

export const getLibraryInfo = (page, student_id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_LIBRARY_INFO,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.getLibraryInfoApi(page, student_id),
})

export const studentLibraryInfo = (page, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_LIBRARY_INFO,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.studentLibraryInfoApi(page),
})

export const getLibraryInfoById = (id, student_id, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.GET_LIBRARY_INFO_BY_ID,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.getLibraryInfoByIdApi(id, student_id),
})

export const postLibrary = (data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.POST_LIBRARY,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.postLibraryApi(data),
})

export const putLibrary = (id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.PUT_LIBRARY,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.putLibraryApi(id, data),
})

export const studentSideData = (page, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.STUDENT_SIDE_DATA,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.studentSideDataApi(page),
})

export const putReturnLibrary = (id, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.PUT_RETURN_LIBRARY,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.putReturnLibraryApi(id, data),
})

export const searchBook = (param, data, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.SEARCH_BOOK,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.searchBookApi(param, data),
})

export const putAcknowledgement = (id, role, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.PUT_ACKNOWLEDGEMENT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.putAcknowledgementApi(id, role),
})

export const putAcknowledgementParent = (
  id,
  role,
  token,
  onSuccess,
  onFail,
) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.PUT_ACKNOWLEDGEMENT,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.putAcknowledgementParentApi(id, role, token),
})

export const diaryProfile = (id, role, type, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.DIARY_PROFILE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.diaryProfileApi(id, role, type),
})

export const diaryLeave = (id, role, type, page, onSuccess, onFail) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: attendenceActionTypes.DIARY_PROFILE,
  onSuccessCallback: onSuccess,
  onFailCallback: onFail,
  promise: () => attendenceApi.diaryLeaveApi(id, role, type, page),
})
