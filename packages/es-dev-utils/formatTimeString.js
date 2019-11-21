/**
 * 将毫秒数转换为小时，分钟，秒和毫秒
 *
 * @param {*} ms 毫秒数
 */
function formatTimeString(ms) {
  if (ms < 1000) {
    return `${ms} ms`;
  } else if (ms < 1000 * 60) {
    const seconds = ms / 1000;
    return `${seconds.toFixed(2)} s`;
  } else if (ms < 1000 * 60 * 60) {
    const minutes = ms / 1000 / 60;
    return `${minutes.toFixed(2)} min`;
  } else {
    const hours = ms / 1000 / 60 / 60;
    return `${hours.toFixed(2)} hour`;
  }
}

module.exports = formatTimeString;
