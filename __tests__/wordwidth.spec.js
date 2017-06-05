
const WordWidth = require('../src/word-width.js');

test('asct show be tested', () => {
  // english
  expect(WordWidth('Hello Word Width!')).toEqual(17);
  // unicode
  expect(WordWidth('コンニチハ, セカイ!')).toEqual(19);
  expect(WordWidth('越过长城，走向世界')).toEqual(18);

  // en char
  expect(WordWidth('j')).toEqual(1);
  expect(WordWidth('a')).toEqual(1);
  expect(WordWidth('v')).toEqual(1);
  expect(WordWidth('a')).toEqual(1);

  // unicode char
  expect(WordWidth('中国')).toEqual(4);
});