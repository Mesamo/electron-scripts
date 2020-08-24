exports.getTime = function(date) {
  const d = date && date instanceof Date ? date : new Date();
  return d.toTimeString().split(' ')[0];
};
