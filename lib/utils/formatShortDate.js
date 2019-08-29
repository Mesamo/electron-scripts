function formatShortDate(date1) {
  const date = new Date();
  return date.toTimeString().split(' ')[0];
}

module.exports = formatShortDate;
