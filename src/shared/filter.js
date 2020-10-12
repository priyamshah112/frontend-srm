import { getWeekDay } from "./datediff";

export const formatAttendanceData = (data = {}) => {
  let filtered = [];
  const rollNumbers = Object.keys(data);

  if (rollNumbers.length) {
    rollNumbers.map((number) => {
      let itemData = {};
      const rollNumberData = data[number];
      let dates = Object.keys(rollNumberData);
      let formatDates = [];
      if (dates.length) {
        itemData = { ...rollNumberData[0] };

        dates.map((date) => {
          const dateData = rollNumberData[date];
          const dateString = dateData.attendance_date;
          const dateInfo = getWeekDay(dateString);
          formatDates.push({ ...rollNumberData[date], ...dateInfo });
        });
        itemData.dates = formatDates;
      }
      filtered.push(itemData);
    });
  }

  return filtered;
};


export const formatSujectName = (name = "") => {
  if (name.length <= 4) {
    return name;
  }
  const splitArr = name.split(" ");
  if (splitArr.length === 1) {
    return `${name.slice(0, 4)}.`;
  }
  let newName = "";
  splitArr.map((n, i) => {
    const isLast = i + 1 === splitArr.length;
    if(!isLast){
      newName = `${newName} ${n[0]}.`
    }else{
      newName = `${newName} ${n.slice(0, 3)}.`
    }
  });
  return newName;
};