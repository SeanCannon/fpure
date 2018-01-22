'use strict';

const _curry = require('../_private').curry;

const _isValidIndex = (i, arr) => !isNaN(i) && i >= 0 && i <= arr.length;

module.exports = _curry((fn, i, arr) => _isValidIndex(i, arr) ? arr.map((v,_i) => _i === i ? fn(v) : v) : arr);
