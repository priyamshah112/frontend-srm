import moment from "moment";

export const dateDiff = (eventDateString) => {
  const currentDate = new Date();
  const eventDate = new Date(eventDateString);

  if (eventDate > currentDate) {
    const dateDiff = eventDate - currentDate;
    const dayNumber = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));
    if (dayNumber >= 3) {
      return 3;
    } else if (dayNumber >= 2) {
      return 2;
    }
  }
  // return undefined if not eligible to set reminder
};

moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});
export const today = moment();
export const getDateDay = (date) => moment(date).format("DD");
export const weekDays = {
  1: { day_sort: "M", day: "Monday" },
  2: { day_sort: "T", day: "Tuesday" },
  3: { day_sort: "W", day: "Wednesday" },
  4: { day_sort: "T", day: "Thursday" },
  5: { day_sort: "F", day: "Friday" },
  6: { day_sort: "S", day: "Saturday" },
  7: { day_sort: "S", day: "Sunday" },
};

export const getMonth = (date) => moment(date).format("YY-MM");

export const currentMonth = getMonth(moment());

export const getWeekDay = (dateString) => {
  const dayNumber = moment(dateString).isoWeekday();
  return weekDays[dayNumber] || {};
};

export const getDaysByMonth = (month) => {
  const daysInMonth = moment(month).daysInMonth();
  return Array.from({ length: daysInMonth }, (v, k) => {
    return `${month}-${k + 1}`;
  });
};

export const currentMonthDates = getDaysByMonth(currentMonth);
export const weekStartDate = today.startOf("week");

export const getNextWeekStartDate = (currentWeek) =>
  moment(currentWeek).add(7, "days");

export const getPreviousWeekStartDate = (currentWeek) =>
  moment(currentWeek).add(-7, "days");

export const getWeekEndDate = (startDate) =>
  moment(startDate).add(7, "days");

export const getDatesBetween = (strDate, stpDate) => {
  let dates = [];
  let cDate = strDate;
  while (cDate <= stpDate) {
    const dateString = moment(cDate).format("YYYY-MM-DD");
    const day = getWeekDay(dateString);
    const date_day = getDateDay(dateString);
    dates.push({ date: dateString, day: { ...day, date_day } });
    cDate = moment(cDate).add(1, "days");
  }
  return dates;
};

export const getWeekDates = (startDate) => {
  const endDate = moment(startDate).endOf("week");
  return getDatesBetween(startDate, endDate);
};

export const isFutureDate = (d, current=moment()) => {
  const date = moment(d);

  if (current > date) {
    return false;
  } else {
    return true;
  }
};
