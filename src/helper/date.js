const isPMOrAM = (hour) => {
  if (hour > 0) return "AM";
  if (hour === 0) return "PM";
  if (hour >= 12) return "PM";
};
const validateToAddCero = (date) => {
  return date < 10 ? "0" + date : date;
};

const getCurrentTime = () => {
  const date = new Date();
  let hour = validateToAddCero(date.getHours());
  let minutes = validateToAddCero(date.getMinutes());
  let seconds = validateToAddCero(date.getSeconds());
  return `${hour}:${minutes}:${seconds} ${isPMOrAM(
    hour
  )} `;
};

const getDate = (date) => {
  let day = validateToAddCero(date.getDay());
  let month = validateToAddCero(date.getMonth() + 1);
  let year = date.getFullYear();
  dateModified = `${day}-${month}-${year}`;
  return dateModified;
};

module.exports = {
  isPMOrAM,
  validateToAddCero,
  getCurrentTime,
  getDate
};
