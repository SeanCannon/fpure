'use strict';

const _curry = require('../_private').curry;
const add    = require('./add');

module.exports = _curry(arr => arr.reduce(add));
