'use strict';

const _curry = require('../_private').curry,
      _isInt = require('../_private').isInt;


module.exports = _curry((a, b) => {
  if (!_isInt(a)) {
    return NaN;
  }

  if (!_isInt(b) || b < 1) {
    return NaN;
  }

  return ((a % b) + b) % b;
});
