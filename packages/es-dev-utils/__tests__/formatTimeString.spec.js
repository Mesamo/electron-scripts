const { formatTimeString } = require('../');

test('Is Function', () => {
  expect(typeof formatTimeString === 'function').toBeTruthy();
});

test('format milliseconds', () => {
  const ms = 986;
  const result = formatTimeString(ms);
  expect(result).toEqual('986 ms');
});

test('format seconds', () => {
  const ms = 16777;
  const result = formatTimeString(ms);
  expect(result).toEqual('16.78 s');
});

test('format minutes', () => {
  const ms = 167777;
  const result = formatTimeString(ms);
  expect(result).toEqual('2.80 min');
});

test('format hours', () => {
  const ms = 16777761;
  const result = formatTimeString(ms);
  expect(result).toEqual('4.66 hour');
});
