'use strict';
var test = require('tape');
var WordWidth = require('..');

test('asct show be tested', function (t) {
  // english
  t.equal(WordWidth('Hello Word Width!'), 17);
  
  // unicode
  t.equal(WordWidth('コンニチハ, セカイ!'), 19);
  t.equal(WordWidth('越过长城，走向世界'), 18);

  // en char
  t.equal(WordWidth('j'), 1);
  t.equal(WordWidth('a'), 1);
  t.equal(WordWidth('v'), 1);
  t.equal(WordWidth('a'), 1);

  // unicode char
  t.equal(WordWidth('中'), 2);

  t.end();
});