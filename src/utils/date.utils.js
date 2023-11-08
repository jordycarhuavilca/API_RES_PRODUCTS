const isPMOrAM = (hour) => {
  if (hour > 0) return "AM";
  if (hour === 0) return "PM";
  if (hour >= 12) return "PM";
};
const addCero = (value) => {
  return value < 10 ? "0" + value : value;
};
const getCurrentTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  return `${addCero(hour)}:${addCero(minutes)}:${addCero(seconds)} ${isPMOrAM(
    hour
  )} `;
};

module.exports = {
  isPMOrAM,
  addCero,
  getCurrentTime,
};
