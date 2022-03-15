import sum from './sum.js';

test('erg a + b should be equal as the sum', () => {
  expect(sum(10, 190)).toBe(200);
  expect(sum(-18, 19)).toBe(1);
});