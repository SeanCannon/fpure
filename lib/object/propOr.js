'use strict';

const _curry = require('../_private').curry;

module.exports = _curry((a, k, o) => o[k] || a);
