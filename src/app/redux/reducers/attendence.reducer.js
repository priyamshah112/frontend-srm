import attendenceActionTypes from "../action-types/attendence.actionTypes";

const initialState = {
  attendence: [],
  attendenceLoading: {},

  classes: [],
  classesLoading: false,

  students: [],
  studentsLoading: false,

  subjects: [],
  subjectsLoading: false,

  postAttendanceLoading: false,
  singleClassLoading: false,

  importLoading: false,
  exportLoading: false,

  weekly_timetable_subjects: [],
  weeklyTimeTableSubjectsLoading: false,

  add_subjects_or_time: [],
  addSubjectsOrTimeLoading: false,

  get_week_filter_using_all: {},
  getWeekFilterUsingAllLoading: false,

  publishWeeklyTimeTableLoading: false,

  add_dish_in_dishes: [],
  addDishInDishesLoading: false,

  deleteRowWeeklyTimeTableLoading: false,

  deleteDishInDishesLoading: false,

  show_dish_list_in_dishes: [],
  showDishListInDishesLoading: false,

  update_dish_in_dishes: [],
  updateDishInDishesLoading: false,

  lunchMenuSearch: [],
  lunchMenuSearchLoading: false,

  lunchMenuGetByDish: [],
  lunchMenuGetByDishLoading: false,

  lunchMenuGetByWeek: [],
  lunchMenuGetByWeekLoading: false,

  lunchMenuPublishNow: [],
  lunchMenuPublishNowLoading: false,

  getLunchMenuId: [],
  getLunchMenuIdLoading: false,

  lunchMenuAll: [],
  lunchMenuAllLoading: false,

  menuDishDetails: [],
  menuDishDetailsLoading: false,

  deleteMenuLoading: false,

  removeLunchImageLoading: false,

  holidayAll: [],
  holidayAllLoading: false,

  getByMonth: [],
  getByMonthLoading: false,

  holidayByMonth: [],
  holidayByMonthLoading: false,

  miscellaneous: [],
  miscellaneousLoading: false,

  updateMiscellaneous: [],
  updateMiscellaneousLoading: false,

  getMiscellaneous: [],
  getMiscellaneousLoading: false,

  getAllMiscellaneous: [],
  getAllMiscellaneousLoading: false,

  postDiaryMultiple: [],
  postDiaryMultipleLoading: false,

  putDiaryMultiple: [],
  putDiaryMultipleLoading: false,

  schoolGrade: [],
  schoolGradeLoading: false,

  getDiaryMultiple: [],
  getDiaryMultipleLoading: false,

  diarySeenUnseen: [],
  diarySeenUnseenLoading: false,

  diaryDeleteLoading: false,

  individualDiaryPost: [],
  individualDiaryPostLoading: false,

  individualDiaryPut: [],
  individualDiaryPutLoading: false,

  byTeacherDiary: [],
  byTeacherDiaryLoading: false,

  forTeacherDiary: [],
  forTeacherDiaryLoading: false,

  getDetailsById: [],
  getDetailsByIdLoading: false,

  classStudentList: [],
  classStudentListLoading: false,

  individualDiaryPutForParent: [],
  individualDiaryPutForParentLoading: false,

  getLibraryInfo: [],
  getLibraryInfoLoading: false,

  postLibrary: [],
  postLibraryLoading: false,

  putLibrary: [],
  putLibraryLoading: false,

  studentSideData: [],
  studentSideDataLoading: false,

  putReturnLibrary: [],
  putReturnLibraryaLoading: false,

  searchBook: [],
  searchBookLoading: false,

  putAcknowledgement: [],
  putAcknowledgementLoading: false,
};

const AttendenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case attendenceActionTypes.GET_ATTENDENCE.START:
      return {
        ...state,
        attendenceLoading: true,
      };
    case attendenceActionTypes.GET_ATTENDENCE.SUCCESS:
      return {
        ...state,
        attendence: action.payload.data,
        attendenceLoading: false,
      };
    case attendenceActionTypes.GET_ATTENDENCE.FAIL:
      return {
        ...state,
        attendenceLoading: false,
      };

    case attendenceActionTypes.GET_CLASSES.START:
      return {
        ...state,
        classesLoading: true,
      };
    case attendenceActionTypes.GET_CLASSES.SUCCESS:
      return {
        ...state,
        classes: action.payload.data,
        classesLoading: false,
      };
    case attendenceActionTypes.GET_CLASSES.FAIL:
      return {
        ...state,
        classesLoading: false,
      };

    case attendenceActionTypes.LUNCH_MENU_GET_BY_DISH.START:
      return {
        ...state,
        lunchMenuGetByDishLoading: true,
      };
    case attendenceActionTypes.LUNCH_MENU_GET_BY_DISH.SUCCESS:
      return {
        ...state,
        lunchMenuGetByDish: action.payload.data,
        lunchMenuGetByDishLoading: false,
      };
    case attendenceActionTypes.LUNCH_MENU_GET_BY_DISH.FAIL:
      return {
        ...state,
        lunchMenuGetByDishLoading: false,
      };

    case attendenceActionTypes.LUNCH_MENU_GET_BY_WEEK.START:
      return {
        ...state,
        lunchMenuGetByWeekLoading: true,
      };
    case attendenceActionTypes.LUNCH_MENU_GET_BY_WEEK.SUCCESS:
      return {
        ...state,
        lunchMenuGetByWeek: action.payload.data,
        lunchMenuGetByWeekLoading: false,
      };
    case attendenceActionTypes.LUNCH_MENU_GET_BY_WEEK.FAIL:
      return {
        ...state,
        lunchMenuGetByWeekLoading: false,
      };

    case attendenceActionTypes.GET_WEEK_FILTER_USING_ALL.START:
      return {
        ...state,
        getWeekFilterUsingAllLoading: true,
      };
    case attendenceActionTypes.GET_WEEK_FILTER_USING_ALL.SUCCESS:
      return {
        ...state,
        get_week_filter_using_all: filterWeeklyTimeTable(
          action.payload.data.week_timetable,
          state.get_week_filter_using_all,
          action.data.classId
        ),
        getWeekFilterUsingAllLoading: false,
      };
    case attendenceActionTypes.GET_WEEK_FILTER_USING_ALL.FAIL:
      return {
        ...state,
        getWeekFilterUsingAllLoading: false,
      };

    case attendenceActionTypes.GET_WEEKLY_TIMETABLE_SUBJECTS.START:
      return {
        ...state,
        weeklyTimeTableSubjectsLoading: true,
      };
    case attendenceActionTypes.GET_WEEKLY_TIMETABLE_SUBJECTS.SUCCESS:
      return {
        ...state,
        weekly_timetable_subjects: action.payload.data,
        weeklyTimeTableSubjectsLoading: false,
      };
    case attendenceActionTypes.GET_WEEKLY_TIMETABLE_SUBJECTS.FAIL:
      return {
        ...state,
        weeklyTimeTableSubjectsLoading: false,
      };

    case attendenceActionTypes.POST_ADD_SUBJECTS_OR_TIME.START:
      return {
        ...state,
        addSubjectsOrTimeLoading: true,
      };
    case attendenceActionTypes.POST_ADD_SUBJECTS_OR_TIME.SUCCESS:
      return {
        ...state,
        add_subjects_or_time: action.payload.data,
        addSubjectsOrTimeLoading: false,
      };
    case attendenceActionTypes.POST_ADD_SUBJECTS_OR_TIME.FAIL:
      return {
        ...state,
        addSubjectsOrTimeLoading: false,
      };

    case attendenceActionTypes.SCHOOL_GRADE.START:
      return {
        ...state,
        schoolGradeLoading: true,
      };
    case attendenceActionTypes.SCHOOL_GRADE.SUCCESS:
      return {
        ...state,
        schoolGrade: action.payload.data,
        schoolGradeLoading: false,
      };
    case attendenceActionTypes.SCHOOL_GRADE.FAIL:
      return {
        ...state,
        schoolGradeLoading: false,
      };

    case attendenceActionTypes.DIARY_MULTIPLE_SEEN_UNSEEN.START:
      return {
        ...state,
        diarySeenUnseenLoading: true,
      };
    case attendenceActionTypes.DIARY_MULTIPLE_SEEN_UNSEEN.SUCCESS:
      return {
        ...state,
        diarySeenUnseen: action.payload.data,
        diarySeenUnseenLoading: false,
      };
    case attendenceActionTypes.DIARY_MULTIPLE_SEEN_UNSEEN.FAIL:
      return {
        ...state,
        diarySeenUnseenLoading: false,
      };

    case attendenceActionTypes.GET_DIARY_MULTIPLE.START:
      return {
        ...state,
        getDiaryMultipleLoading: true,
      };
    case attendenceActionTypes.GET_DIARY_MULTIPLE.SUCCESS:
      return {
        ...state,
        getDiaryMultiple: action.payload.data,
        getDiaryMultipleLoading: false,
      };
    case attendenceActionTypes.GET_DIARY_MULTIPLE.FAIL:
      return {
        ...state,
        getDiaryMultipleLoading: false,
      };

    case attendenceActionTypes.POST_DIARY_MULTIPLE.START:
      return {
        ...state,
        postDiaryMultipleLoading: true,
      };
    case attendenceActionTypes.POST_DIARY_MULTIPLE.SUCCESS:
      return {
        ...state,
        postDiaryMultiple: action.payload.data,
        postDiaryMultipleLoading: false,
      };
    case attendenceActionTypes.POST_DIARY_MULTIPLE.FAIL:
      return {
        ...state,
        postDiaryMultipleLoading: false,
      };

    case attendenceActionTypes.PUT_DIARY_MULTIPLE.START:
      return {
        ...state,
        putDiaryMultipleLoading: true,
      };
    case attendenceActionTypes.PUT_DIARY_MULTIPLE.SUCCESS:
      return {
        ...state,
        putDiaryMultiple: action.payload.data,
        putDiaryMultipleLoading: false,
      };
    case attendenceActionTypes.PUT_DIARY_MULTIPLE.FAIL:
      return {
        ...state,
        putDiaryMultipleLoading: false,
      };

    case attendenceActionTypes.PUT_ACKNOWLEDGEMENT.START:
      return {
        ...state,
        putAcknowledgementLoading: true,
      };
    case attendenceActionTypes.PUT_ACKNOWLEDGEMENT.SUCCESS:
      return {
        ...state,
        putAcknowledgement: action.payload.data,
        putAcknowledgementLoading: false,
      };
    case attendenceActionTypes.PUT_ACKNOWLEDGEMENT.FAIL:
      return {
        ...state,
        putAcknowledgementLoading: false,
      };

    case attendenceActionTypes.PUT_LIBRARY.START:
      return {
        ...state,
        putLibraryLoading: true,
      };
    case attendenceActionTypes.PUT_LIBRARY.SUCCESS:
      return {
        ...state,
        putLibrary: action.payload.data,
        putLibraryLoading: false,
      };
    case attendenceActionTypes.PUT_LIBRARY.FAIL:
      return {
        ...state,
        putLibraryLoading: false,
      };

    case attendenceActionTypes.PUT_RETURN_LIBRARY.START:
      return {
        ...state,
        putReturnLibraryLoading: true,
      };
    case attendenceActionTypes.PUT_RETURN_LIBRARY.SUCCESS:
      return {
        ...state,
        putReturnLibrary: action.payload.data,
        putReturnLibraryLoading: false,
      };
    case attendenceActionTypes.PUT_RETURN_LIBRARY.FAIL:
      return {
        ...state,
        putReturnLibraryLoading: false,
      };

    case attendenceActionTypes.STUDENT_SIDE_DATA.START:
      return {
        ...state,
        studentSideDataLoading: true,
      };
    case attendenceActionTypes.STUDENT_SIDE_DATA.SUCCESS:
      return {
        ...state,
        studentSideData: action.payload.data,
        studentSideDataLoading: false,
      };
    case attendenceActionTypes.STUDENT_SIDE_DATA.FAIL:
      return {
        ...state,
        studentSideDataLoading: false,
      };

    case attendenceActionTypes.MENU_DISH_DETAILS.START:
      return {
        ...state,
        menuDishDetailsLoading: true,
      };
    case attendenceActionTypes.MENU_DISH_DETAILS.SUCCESS:
      return {
        ...state,
        menuDishDetails: action.payload.data,
        menuDishDetailsLoading: false,
      };
    case attendenceActionTypes.MENU_DISH_DETAILS.FAIL:
      return {
        ...state,
        menuDishDetailsLoading: false,
      };

    case attendenceActionTypes.GET_SINGLE_CLASS.START:
      return {
        ...state,
        singleClassLoading: true,
      };
    case attendenceActionTypes.GET_SINGLE_CLASS.SUCCESS:
      return {
        ...state,
        singleClassLoading: false,
      };
    case attendenceActionTypes.GET_SINGLE_CLASS.FAIL:
      return {
        ...state,
        singleClassLoading: false,
      };

    case attendenceActionTypes.GET_STUDENTS.START:
      return {
        ...state,
        studentsLoading: true,
      };
    case attendenceActionTypes.GET_STUDENTS.SUCCESS:
      return {
        ...state,
        students: action.payload.data,
        studentsLoading: false,
      };
    case attendenceActionTypes.GET_STUDENTS.FAIL:
      return {
        ...state,
        studentsLoading: false,
      };

    case attendenceActionTypes.INDIVIDUAL_DIARY_POST.START:
      return {
        ...state,
        individualDiaryPostLoading: true,
      };
    case attendenceActionTypes.INDIVIDUAL_DIARY_POST.SUCCESS:
      return {
        ...state,
        individualDiaryPost: action.payload.data,
        individualDiaryPostLoading: false,
      };
    case attendenceActionTypes.INDIVIDUAL_DIARY_POST.FAIL:
      return {
        ...state,
        individualDiaryPostLoading: false,
      };

    case attendenceActionTypes.INDIVIDUAL_DIARY_PUT.START:
      return {
        ...state,
        individualDiaryPutLoading: true,
      };
    case attendenceActionTypes.INDIVIDUAL_DIARY_PUT.SUCCESS:
      return {
        ...state,
        individualDiaryPut: action.payload.data,
        individualDiaryPutLoading: false,
      };
    case attendenceActionTypes.INDIVIDUAL_DIARY_PUT.FAIL:
      return {
        ...state,
        individualDiaryPutLoading: false,
      };

    case attendenceActionTypes.INDIVIDUAL_DIARY_PUT_FOR_PARENT.START:
      return {
        ...state,
        individualDiaryPutForParentLoading: true,
      };
    case attendenceActionTypes.INDIVIDUAL_DIARY_PUT_FOR_PARENT.SUCCESS:
      return {
        ...state,
        individualDiaryPutForParent: action.payload.data,
        individualDiaryPutForParentLoading: false,
      };
    case attendenceActionTypes.INDIVIDUAL_DIARY_PUT_FOR_PARENT.FAIL:
      return {
        ...state,
        individualDiaryPutForParentLoading: false,
      };

    case attendenceActionTypes.GET_LIBRARY_INFO.START:
      return {
        ...state,
        getLibraryInfoLoading: true,
      };
    case attendenceActionTypes.GET_LIBRARY_INFO.SUCCESS:
      return {
        ...state,
        getLibraryInfo: action.payload.data,
        getLibraryInfoLoading: false,
      };
    case attendenceActionTypes.GET_LIBRARY_INFO.FAIL:
      return {
        ...state,
        getLibraryInfoLoading: false,
      };

    case attendenceActionTypes.GET_LIBRARY_INFO_BY_ID.START:
      return {
        ...state,
        getLibraryInfoByIdLoading: true,
      };
    case attendenceActionTypes.GET_LIBRARY_INFO_BY_ID.SUCCESS:
      return {
        ...state,
        getLibraryInfoById: action.payload.data,
        getLibraryInfoByIdLoading: false,
      };
    case attendenceActionTypes.GET_LIBRARY_INFO_BY_ID.FAIL:
      return {
        ...state,
        getLibraryInfoByIdLoading: false,
      };

    case attendenceActionTypes.SEARCH_BOOK.START:
      return {
        ...state,
        searchBookLoading: true,
      };
    case attendenceActionTypes.SEARCH_BOOK.SUCCESS:
      return {
        ...state,
        searchBook: action.payload.data,
        searchBookLoading: false,
      };
    case attendenceActionTypes.SEARCH_BOOK.FAIL:
      return {
        ...state,
        searchBookLoading: false,
      };

    case attendenceActionTypes.POST_LIBRARY.START:
      return {
        ...state,
        postLibraryLoading: true,
      };
    case attendenceActionTypes.POST_LIBRARY.SUCCESS:
      return {
        ...state,
        postLibrary: action.payload.data,
        postLibraryLoading: false,
      };
    case attendenceActionTypes.POST_LIBRARY.FAIL:
      return {
        ...state,
        postLibraryLoading: false,
      };

    case attendenceActionTypes.BY_ME_TEACHER_DIARY.START:
      return {
        ...state,
        byTeacherDiaryLoading: true,
      };
    case attendenceActionTypes.BY_ME_TEACHER_DIARY.SUCCESS:
      return {
        ...state,
        byTeacherDiary: action.payload.data,
        byTeacherDiaryLoading: false,
      };
    case attendenceActionTypes.BY_ME_TEACHER_DIARY.FAIL:
      return {
        ...state,
        byTeacherDiaryLoading: false,
      };

    case attendenceActionTypes.FOR_ME_TEACHER_DIARY.START:
      return {
        ...state,
        forTeacherDiaryLoading: true,
      };
    case attendenceActionTypes.FOR_ME_TEACHER_DIARY.SUCCESS:
      return {
        ...state,
        forTeacherDiary: action.payload.data,
        forTeacherDiaryLoading: false,
      };
    case attendenceActionTypes.FOR_ME_TEACHER_DIARY.FAIL:
      return {
        ...state,
        forTeacherDiaryLoading: false,
      };

    case attendenceActionTypes.GET_DETAILS_BY_ID.START:
      return {
        ...state,
        getDetailsByIdLoading: true,
      };
    case attendenceActionTypes.GET_DETAILS_BY_ID.SUCCESS:
      return {
        ...state,
        getDetailsById: action.payload.data,
        getDetailsByIdLoading: false,
      };
    case attendenceActionTypes.GET_DETAILS_BY_ID.FAIL:
      return {
        ...state,
        getDetailsByIdLoading: false,
      };

    case attendenceActionTypes.CLASS_STUDENT_LIST.START:
      return {
        ...state,
        classStudentListLoading: true,
      };
    case attendenceActionTypes.CLASS_STUDENT_LIST.SUCCESS:
      return {
        ...state,
        classStudentList: action.payload.data,
        classStudentListLoading: false,
      };
    case attendenceActionTypes.CLASS_STUDENT_LIST.FAIL:
      return {
        ...state,
        classStudentListLoading: false,
      };

    case attendenceActionTypes.GET_SUBJECTS.START:
      return {
        ...state,
        subjectsLoading: true,
      };
    case attendenceActionTypes.GET_SUBJECTS.SUCCESS:
      return {
        ...state,
        subjects: action.payload.data ? action.payload.data.data : [],
        subjectsLoading: false,
      };
    case attendenceActionTypes.GET_SUBJECTS.FAIL:
      return {
        ...state,
        subjectsLoading: false,
      };

    case attendenceActionTypes.POST_ATTENDANCE.START:
      return {
        ...state,
        postAttendanceLoading: true,
      };
    case attendenceActionTypes.POST_ATTENDANCE.SUCCESS:
      return {
        ...state,
        postAttendanceLoading: false,
      };
    case attendenceActionTypes.POST_ATTENDANCE.FAIL:
      return {
        ...state,
        postAttendanceLoading: false,
      };

    case attendenceActionTypes.DELETE_ROW_WEEKLY_TIME_TABLE.START:
      return {
        ...state,
        deleteRowWeeklyTimeTableLoading: true,
      };
    case attendenceActionTypes.DELETE_ROW_WEEKLY_TIME_TABLE.SUCCESS:
      return {
        ...state,
        deleteRowWeeklyTimeTableLoading: false,
      };
    case attendenceActionTypes.DELETE_ROW_WEEKLY_TIME_TABLE.FAIL:
      return {
        ...state,
        deleteRowWeeklyTimeTableLoading: false,
      };

    case attendenceActionTypes.DELETE_DIARY_MULTIPLE.START:
      return {
        ...state,
        diaryDeleteLoading: true,
      };
    case attendenceActionTypes.DELETE_DIARY_MULTIPLE.SUCCESS:
      return {
        ...state,
        diaryDeleteLoading: false,
      };
    case attendenceActionTypes.DELETE_DIARY_MULTIPLE.FAIL:
      return {
        ...state,
        diaryDeleteLoading: false,
      };

    case attendenceActionTypes.DELETE_MENU_IN_LIST.START:
      return {
        ...state,
        deleteMenuLoading: true,
      };
    case attendenceActionTypes.DELETE_MENU_IN_LIST.SUCCESS:
      return {
        ...state,
        deleteMenuLoading: false,
      };
    case attendenceActionTypes.DELETE_MENU_IN_LIST.FAIL:
      return {
        ...state,
        deleteMenuLoading: false,
      };

    case attendenceActionTypes.PUBLISH_WEEKLY_TIME_TABLE.START:
      return {
        ...state,
        publishWeeklyTimeTableLoading: true,
      };
    case attendenceActionTypes.PUBLISH_WEEKLY_TIME_TABLE.SUCCESS:
      return {
        ...state,
        publishWeeklyTimeTableLoading: false,
      };
    case attendenceActionTypes.PUBLISH_WEEKLY_TIME_TABLE.FAIL:
      return {
        ...state,
        publishWeeklyTimeTableLoading: false,
      };

    case attendenceActionTypes.IMPORT_ATTENDANCE.START:
      return {
        ...state,
        importLoading: true,
      };
    case attendenceActionTypes.IMPORT_ATTENDANCE.SUCCESS:
      return {
        ...state,
        importLoading: false,
      };
    case attendenceActionTypes.IMPORT_ATTENDANCE.FAIL:
      return {
        ...state,
        importLoading: false,
      };

    case attendenceActionTypes.EXPORT_ATTENDANCE.START:
      return {
        ...state,
        exportLoading: true,
      };
    case attendenceActionTypes.EXPORT_ATTENDANCE.SUCCESS:
      return {
        ...state,
        exportLoading: false,
      };
    case attendenceActionTypes.EXPORT_ATTENDANCE.FAIL:
      return {
        ...state,
        exportLoading: false,
      };

    case attendenceActionTypes.ADD_DISH_IN_DISHES.START:
      return {
        ...state,
        addDishInDishesLoading: true,
      };
    case attendenceActionTypes.ADD_DISH_IN_DISHES.SUCCESS:
      return {
        ...state,
        add_dish_in_dishes: action.payload.data,
        addDishInDishesLoading: false,
      };
    case attendenceActionTypes.ADD_DISH_IN_DISHES.FAIL:
      return {
        ...state,
        addDishInDishesLoading: false,
      };

    case attendenceActionTypes.LUNCH_MENU_PUBLISH_NOW.START:
      return {
        ...state,
        lunchMenuPublishNowLoading: true,
      };
    case attendenceActionTypes.LUNCH_MENU_PUBLISH_NOW.SUCCESS:
      return {
        ...state,
        lunchMenuPublishNow: action.payload.data,
        lunchMenuPublishNowLoading: false,
      };
    case attendenceActionTypes.LUNCH_MENU_PUBLISH_NOW.FAIL:
      return {
        ...state,
        lunchMenuPublishNowLoading: false,
      };

    case attendenceActionTypes.GET_LUNCH_MENU_ID.START:
      return {
        ...state,
        getLunchMenuIdLoading: true,
      };
    case attendenceActionTypes.GET_LUNCH_MENU_ID.SUCCESS:
      return {
        ...state,
        getLunchMenuId: action.payload,
        getLunchMenuIdLoading: false,
      };
    case attendenceActionTypes.GET_LUNCH_MENU_ID.FAIL:
      return {
        ...state,
        getLunchMenuIdLoading: false,
      };

    case attendenceActionTypes.SHOW_DISH_LIST_IN_DISHES.START:
      return {
        ...state,
        showDishListInDishesLoading: true,
      };
    case attendenceActionTypes.SHOW_DISH_LIST_IN_DISHES.SUCCESS:
      return {
        ...state,
        show_dish_list_in_dishes: action.payload.data,
        showDishListInDishesLoading: false,
      };
    case attendenceActionTypes.SHOW_DISH_LIST_IN_DISHES.FAIL:
      return {
        ...state,
        showDishListInDishesLoading: false,
      };

    case attendenceActionTypes.LUNCH_MENU_ALL.START:
      return {
        ...state,
        lunchMenuAllLoading: true,
      };
    case attendenceActionTypes.LUNCH_MENU_ALL.SUCCESS:
      return {
        ...state,
        lunchMenuAll: action.payload.data,
        lunchMenuAllLoading: false,
      };
    case attendenceActionTypes.LUNCH_MENU_ALL.FAIL:
      return {
        ...state,
        lunchMenuAllLoading: false,
      };

    case attendenceActionTypes.LUNCH_MENU_SEARCH.START:
      return {
        ...state,
        lunchMenuSearchLoading: true,
      };
    case attendenceActionTypes.LUNCH_MENU_SEARCH.SUCCESS:
      return {
        ...state,
        lunchMenuSearch: action.payload.data,
        lunchMenuSearchLoading: false,
      };
    case attendenceActionTypes.LUNCH_MENU_SEARCH.FAIL:
      return {
        ...state,
        lunchMenuSearchLoading: false,
      };

    case attendenceActionTypes.UPDATE_DISH_IN_DISHES.START:
      return {
        ...state,
        updateDishInDishesLoading: true,
      };
    case attendenceActionTypes.UPDATE_DISH_IN_DISHES.SUCCESS:
      return {
        ...state,
        update_dish_in_dishes: action.payload.data,
        updateDishInDishesLoading: false,
      };
    case attendenceActionTypes.UPDATE_DISH_IN_DISHES.FAIL:
      return {
        ...state,
        updateDishInDishesLoading: false,
      };

    case attendenceActionTypes.UPDATE_MISCELLANEOUS.START:
      return {
        ...state,
        updateMiscellaneousLoading: true,
      };
    case attendenceActionTypes.UPDATE_MISCELLANEOUS.SUCCESS:
      return {
        ...state,
        updateMiscellaneous: action.payload.data,
        updateMiscellaneousLoading: false,
      };
    case attendenceActionTypes.UPDATE_MISCELLANEOUS.FAIL:
      return {
        ...state,
        updateMiscellaneousLoading: false,
      };

    case attendenceActionTypes.GET_MISCELLANEOUS.START:
      return {
        ...state,
        getMiscellaneousLoading: true,
      };
    case attendenceActionTypes.GET_MISCELLANEOUS.SUCCESS:
      return {
        ...state,
        getMiscellaneous: action.payload.data,
        getMiscellaneousLoading: false,
      };
    case attendenceActionTypes.GET_MISCELLANEOUS.FAIL:
      return {
        ...state,
        getMiscellaneousLoading: false,
      };

    case attendenceActionTypes.GET_ALL_MISCELLANEOUS.START:
      return {
        ...state,
        getAllMiscellaneousLoading: true,
      };
    case attendenceActionTypes.GET_ALL_MISCELLANEOUS.SUCCESS:
      return {
        ...state,
        getAllMiscellaneous: action.payload.data,
        getAllMiscellaneousLoading: false,
      };
    case attendenceActionTypes.GET_ALL_MISCELLANEOUS.FAIL:
      return {
        ...state,
        getAllMiscellaneousLoading: false,
      };

    case attendenceActionTypes.HOLIDAY_ALL.START:
      return {
        ...state,
        holidayAllLoading: true,
      };
    case attendenceActionTypes.HOLIDAY_ALL.SUCCESS:
      return {
        ...state,
        holidayAll: action.payload.data,
        holidayAllLoading: false,
      };
    case attendenceActionTypes.HOLIDAY_ALL.FAIL:
      return {
        ...state,
        holidayAllLoading: false,
      };

    case attendenceActionTypes.GET_BY_MONTH.START:
      return {
        ...state,
        getByMonthLoading: true,
      };
    case attendenceActionTypes.GET_BY_MONTH.SUCCESS:
      return {
        ...state,
        getByMonth: action.payload.data,
        getByMonthLoading: false,
      };
    case attendenceActionTypes.GET_BY_MONTH.FAIL:
      return {
        ...state,
        getByMonthLoading: false,
      };

    case attendenceActionTypes.HOLIDAY_BY_MONTH.START:
      return {
        ...state,
        holidayByMonthLoading: true,
      };
    case attendenceActionTypes.HOLIDAY_BY_MONTH.SUCCESS:
      return {
        ...state,
        holidayByMonth: action.payload.data,
        holidayByMonthLoading: false,
      };
    case attendenceActionTypes.HOLIDAY_BY_MONTH.FAIL:
      return {
        ...state,
        holidayByMonthLoading: false,
      };

    case attendenceActionTypes.MISCELLANEOUS.START:
      return {
        ...state,
        miscellaneousLoading: true,
      };
    case attendenceActionTypes.MISCELLANEOUS.SUCCESS:
      return {
        ...state,
        miscellaneous: action.payload.data,
        miscellaneousLoading: false,
      };
    case attendenceActionTypes.MISCELLANEOUS.FAIL:
      return {
        ...state,
        miscellaneousLoading: false,
      };

    case attendenceActionTypes.DELETE_DISH_IN_DISHES.START:
      return {
        ...state,
        deleteDishInDishesLoading: true,
      };
    case attendenceActionTypes.DELETE_DISH_IN_DISHES.SUCCESS:
      return {
        ...state,
        deleteDishInDishesLoading: false,
      };
    case attendenceActionTypes.DELETE_DISH_IN_DISHES.FAIL:
      return {
        ...state,
        deleteDishInDishesLoading: false,
      };

    case attendenceActionTypes.REMOVE_LUNCH_IMAGE.START:
      return {
        ...state,
        removeLunchImageLoading: true,
      };
    case attendenceActionTypes.REMOVE_LUNCH_IMAGE.SUCCESS:
      return {
        ...state,
        removeLunchImageLoading: false,
      };
    case attendenceActionTypes.REMOVE_LUNCH_IMAGE.FAIL:
      return {
        ...state,
        removeLunchImageLoading: false,
      };

    default:
      return state;
  }
};

function filterStartTimeEndTime(data, id) {
  let item = {};
  data.map((tu) => {
    if (tu.week_timetable_id === id) {
      item = tu;
    }
  });
  return item;
}

function filterWeeklyTimeTable(payload, weeklyTimeTable, classId) {
  let data = [];
  let status = "published";
  const {
    Monday = [],
    Tuesday = [],
    Wednesday = [],
    Thursday = [],
    Friday = [],
    Saturday = [],
  } = payload;
  Monday.map((mo) => {
    const timeTableId = mo.week_timetable_id;
    const weekTimeTable = mo.week_time_table;
    if (weekTimeTable.status === "draft") {
      status = "draft";
    } else if (weekTimeTable.status === "active") {
      status = "active";
    }
    if (
      !weekTimeTable ||
      !weekTimeTable.start_time ||
      !weekTimeTable.end_time
    ) {
      return weeklyTimeTable;
    }
    let item = {
      Monday: mo,
      start_time: weekTimeTable.start_time,
      end_time: weekTimeTable.end_time,
      status: weekTimeTable.status,
      id: timeTableId,
    };
    item.Tuesday = filterStartTimeEndTime(Tuesday, timeTableId);
    item.Wednesday = filterStartTimeEndTime(Wednesday, timeTableId);
    item.Thursday = filterStartTimeEndTime(Thursday, timeTableId);
    item.Friday = filterStartTimeEndTime(Friday, timeTableId);
    item.Saturday = filterStartTimeEndTime(Saturday, timeTableId);
    data.push(item);
  });
  weeklyTimeTable[classId] = { data, status };
  return weeklyTimeTable;
}
export default AttendenceReducer;
