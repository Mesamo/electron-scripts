const { getTime } = require('../');

test('Is function', () => {
  expect(typeof getTime === 'function').toBeTruthy();
});

test('Format time', () => {
  const date = new Date('2020-05-03 23:50:50');
  const timeString = getTime(date);
  expect(timeString).toEqual('23:50:50');
});

test('Pattern match', () => {
  const dateString = getTime();
  const reg = /\d{2}:\d{2}:\d{2}/;
  expect(dateString.length).toEqual(8);
  expect(reg.test(dateString)).toBeTruthy();
});
