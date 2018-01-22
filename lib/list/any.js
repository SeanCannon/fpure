'use strict';

const _curry = require('../_private').curry;

module.exports = _curry(fn => list => list.some(fn));
