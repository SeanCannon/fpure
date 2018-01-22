'use strict';

const _curry = require('../_private').curry;

module.exports = _curry((fn, arr) => Array.from(arr).sort(fn));
