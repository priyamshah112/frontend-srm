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

export const getMonth = (date) => moment(date).format("YYYY-MM");

export const currentMonth = getMonth(moment());
var monthNames = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUNE","JULY", "AUG", "SEP", "OCT", "NOV", "DEC" ];
export const currentMonth_formatted = () => monthNames[getMonth(moment()).split('-')[1]-1]+"'"+getMonth(moment()).split('-')[0].slice(2,4);

  

export const getWeekDay = (dateString) => {
  const dayNumber = moment(dateString).isoWeekday();
  return weekDays[dayNumber] || {};
};

export const getDaysByMonth = (month = currentMonth) => {
  const daysInMonth = moment(month).daysInMonth();
  return Array.from({ length: daysInMonth }, (v, k) => {
    return `${month}-${k + 1}`;
  });
};

export const currentMonthDates = getDaysByMonth(currentMonth);
export const weekStartDate = moment().startOf("week");
export const monthStartDate = today.startOf("month");

export const getNextWeekStartDate = (currentWeek) =>
  moment(currentWeek).add(7, "days");

export const getPreviousWeekStartDate = (currentWeek) =>
  moment(currentWeek).add(-7, "days");

export const getNextMonthStartDate = (currentMonth) =>
  moment(currentMonth).add(1, "months");

export const getPreviousMonthStartDate = (currentMonth) =>
  moment(currentMonth).add(-1, "months");

export const getWeekEndDate = (startDate) => moment(startDate).add(6, "days");

export const getMonthEndDate = (startDate) => {
  const daysInMonth = moment(getMonth(startDate)).daysInMonth();
  return moment(startDate).add(daysInMonth - 1, "days");
};

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

export const getMonthDates = (month = currentMonth) => {
  const monthDays = getDaysByMonth(month);
  const endDate = moment(monthDays[monthDays.length - 1]);
  return getDatesBetween(moment(monthDays[0]), endDate);
};

export const isFutureDate = (d, current = moment()) => {
  const date = moment(d);

  if (current > date) {
    return false;
  } else {
    return true;
  }
};
