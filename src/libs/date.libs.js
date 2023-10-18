const validateToAddCero = (date) => {
  return date < 10 ? "0" + date : date;
};

const getDate = (date) => {
  let day = validateToAddCero(date.getDay());
  let month = validateToAddCero(date.getMonth() + 1);
  let year = date.getFullYear();
  dateModified = `${day}-${month}-${year}`;
  return dateModified;
};
const getTime = (dateString) => {
  const date = new Date(dateString); // Convert the string to a Date object

  let hour = validateToAddCero(date.getHours());
  let minutes = validateToAddCero(date.getMinutes());
  let seconds = validateToAddCero(date.getSeconds());
  dateModified = `${hour}:${minutes}:${seconds}`;
  return dateModified;
};

module.exports = {
  getDate,
  getTime,
};
