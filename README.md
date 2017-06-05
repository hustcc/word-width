# [word-width](http://git.hust.cc/word-width/)

> **word-width** is simple browserjs / nodejs library for calculate ascii length of unicode string in terminal / console.

Inspired by [jquast/wcwidth](https://github.com/jquast/wcwidth) which is written by Python.

[![Build Status](https://travis-ci.org/hustcc/word-width.svg?branch=master)](https://travis-ci.org/hustcc/word-width) [![Coverage Status](https://coveralls.io/repos/github/hustcc/word-width/badge.svg?branch=master)](https://coveralls.io/github/hustcc/word-width?branch=master) [![npm](https://img.shields.io/npm/v/word-width.svg)](https://www.npmjs.com/package/word-width) [![npm](https://img.shields.io/npm/dt/word-width.svg)](https://www.npmjs.com/package/word-width) [![npm](https://img.shields.io/npm/l/word-width.svg)](https://www.npmjs.com/package/word-width)


# 1. Install

> **npm install --save word-width**


# 2. Import It

 - `Script` tag.

```html
<script type="text/javascript" src="dist/word-width.min.js"></script>
```

 - `ES6` style.

```js
var WordWidth = require('word-width');

//or

import WordWidth from 'word-width';
```


# 3. Usage & API

There is only one API named `WordWidth(word)`.

```js
// english
WordWidth('Hello Word Width!');       //17
  
// unicode
WordWidth('コンニチハ, セカイ!');      //19
WordWidth('越过长城，走向世界');       //18
```


# 4. Test

> npm install
> 
> npm test


# 5. LICENSE

MIT