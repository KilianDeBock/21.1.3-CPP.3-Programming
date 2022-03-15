import clone from './cloneArray.js';

it('should be the same array after clone.', () => {
  const randomArr = ['Nikita', 'doet', 'een', 'dutje'];
  expect(clone(randomArr)).toEqual(randomArr);
});