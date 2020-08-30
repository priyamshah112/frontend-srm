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
