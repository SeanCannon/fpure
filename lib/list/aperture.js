'use strict';

const _curry = require('../_private').curry;

module.exports = _curry((n, arr) => {
  let _arr  = [],
      i     = 0,
      limit = arr.length - (n - 1);
  while (i < limit) {
    const _i = i;
    i += n;
    _arr.push(arr.slice(_i, i));
  }
  return _arr;
});
