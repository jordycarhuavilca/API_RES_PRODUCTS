const moment = require('moment'); // require

const isPMOrAM = (hour) => {
    if (hour > 0 && hour < 12) return "AM";
    if (hour === 0) return "PM";
    if (hour >= 12) return "PM";
};

const getCurrentTime = () => {
  const now =  moment().tz('America/Lima')
  const mm =  moment(now,'HH:mm:ss')
    
  let hour = mm.format('HH');
  let minutes = mm.format('mm');
  let seconds = mm.format('ss');
  return `${hour}:${minutes}:${seconds} ${isPMOrAM(
    hour
  )} `;
};

const getCurrentDate = () => {
  const now =  moment().tz('America/Lima')
  return moment(now,'DD-MM-YYYY')
};

module.exports = {
  isPMOrAM,
  getCurrentTime,
  getCurrentDate
};
