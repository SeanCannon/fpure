'use strict';

const _curry   = require('../_private').curry;
const multiply = require('./multiply');

module.exports = _curry(arr => arr.reduce(multiply));
