'use strict';

const _curry = require('../_private').curry;

module.exports = _curry((k, o) => Object.prototype.hasOwnProperty.call(o, k));
