// Menghitung durasi proyek

const calcProjectDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const calcTime = Math.abs(end - start);
  const calcDays = Math.ceil(calcTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(calcDays / 30);
  const days = calcDays % 30;
  return `${months} month(s) ${days} day(s)`;
};

module.exports = { calcProjectDuration };