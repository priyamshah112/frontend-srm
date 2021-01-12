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

}

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
			}
		case attendenceActionTypes.EXPORT_ATTENDANCE.SUCCESS:
			return {
				...state,
				exportLoading: false,
			}
		case attendenceActionTypes.EXPORT_ATTENDANCE.FAIL:
			return {
				...state,
				exportLoading: false,
			}

			case attendenceActionTypes.ADD_DISH_IN_DISHES.START:
			return {
				...state,
				addDishInDishesLoading: true,
			}
		case attendenceActionTypes.ADD_DISH_IN_DISHES.SUCCESS:
			return {
				...state,
				add_dish_in_dishes: action.payload.data,
				addDishInDishesLoading: false,
			}
		case attendenceActionTypes.ADD_DISH_IN_DISHES.FAIL:
			return {
				...state,
				addDishInDishesLoading: false,
			}

		default:
			return state
	}
}

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
