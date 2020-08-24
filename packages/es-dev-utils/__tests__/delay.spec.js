const { delay } = require('../');

test('Is function', () => {
  expect(typeof delay === 'function').toBeTruthy();
});

test('Return Promise', () => {
  const result = delay(10);
  expect(result instanceof Promise).toBeTruthy();
});
