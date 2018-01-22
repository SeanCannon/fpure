'use strict';

const _curry = require('../_private').curry;

module.exports = _curry((a, b) => a === b ? (a !== 0 || 1 / a === 1 / b) : (a !== a && b !== b));
