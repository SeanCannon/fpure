'use strict';

const _curry = require('../_private').curry;

module.exports = _curry((n, arr) => {
  let _arr  = [],
      i     = 0,
      limit = arr.length - (n - 1);
  while (i < limit) {
    _arr.push(arr.slice(i, i + n));
  }
  return _arr;
});
