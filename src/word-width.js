/**
  Copyright (c) 2016 hustcc
  License: MIT
  https://github.com/hustcc/word-width
**/

const ZERO_WIDTH = require('./zero-width.js');
const WIDE_EASTASIAN = require('./wide-eastasian.js');

/**
 Auxiliary function for binary search in interval table.
 :arg int ucs: Ordinal value of unicode character.
 :arg list table: List of starting and ending ranges of ordinal values,
 in form of ``[(start, end), ...]``.
 :rtype: int
 :returns: 1 if ordinal value ucs is found within lookup table, else 0.
 */
const _bisearch = (ucs, table) => {
  let lbound = 0;
  let ubound = table.length - 1;
  let mid;

  if (ucs < table[0][0] || ucs > table[ubound][1]) return 0;

  while (ubound >= lbound) {
    mid = parseInt((lbound + ubound) / 2, 10);

    if (ucs > table[mid][1]) lbound = mid + 1;
    else if (ucs < table[mid][0]) ubound = mid - 1;
    else return 1;
  }
  return 0;
};

/**
  Given one unicode character, return its printable length on a terminal.
  The wcwidth() function returns 0 if the wc argument has no printable effect
  on a terminal (such as NUL '\0'), -1 if wc is not printable, or has an
  indeterminate effect on the terminal, such as a control character.
  Otherwise, the number of column positions the character occupies on a
  graphic terminal (1 or 2) is returned.
  The following have a column width of -1:
      - C0 control characters (U+001 through U+01F).
      - C1 control characters and DEL (U+07F through U+0A0).
  The following have a column width of 0:
      - Non-spacing and enclosing combining characters (general
        category code Mn or Me in the Unicode database).
      - NULL (U+0000, 0).
      - COMBINING GRAPHEME JOINER (U+034F).
      - ZERO WIDTH SPACE (U+200B) through
        RIGHT-TO-LEFT MARK (U+200F).
      - LINE SEPERATOR (U+2028) and
        PARAGRAPH SEPERATOR (U+2029).
      - LEFT-TO-RIGHT EMBEDDING (U+202A) through
        RIGHT-TO-LEFT OVERRIDE (U+202E).
      - WORD JOINER (U+2060) through
        INVISIBLE SEPARATOR (U+2063).
  The following have a column width of 1:
      - SOFT HYPHEN (U+00AD) has a column width of 1.
      - All remaining characters (including all printable
        ISO 8859-1 and WGL4 characters, Unicode control characters,
        etc.) have a column width of 1.
  The following have a column width of 2:
      - Spacing characters in the East Asian Wide (W) or East Asian
        Full-width (F) category as defined in Unicode Technical
        Report #11 have a column width of 2.
*/
const _charCodeWidth = (ucs) => {
  /*
    # NOTE: created by hand, there isn't anything identifiable other than
    # general Cf category code to identify these, and some characters in Cf
    # category code are of non-zero width.
  */
  if (ucs === 0 ||
    ucs === 0x034F ||
    (ucs >= 0x200B && ucs <= 0x200F) ||
    ucs === 0x2028 ||
    ucs === 0x2029 ||
    (ucs >= 0x202A && ucs <= 0x202E) ||
    (ucs >= 0x2060 && ucs <= 0x2063)) {
    return 0;
  }

  // C0/C1 control characters
  if (ucs < 32 || (ucs >= 0x07F && ucs < 0x0A0)) {
    return -1;
  }

  // combining characters with zero width
  if (_bisearch(ucs, ZERO_WIDTH)) return 0;

  return 1 + _bisearch(ucs, WIDE_EASTASIAN);
};

/**
 *  get the unicode word length in console / terminal.
 *  - word (String): the unicode text.
 *
 * e.g. WordWidth('你好');
 * return Number.
 */
module.exports = (word) => {
  let i = 0;
  const len = word.length;
  let sum = 0;
  for (; i < len; i += 1) sum += _charCodeWidth(word.charCodeAt(i));
  return sum;
};
