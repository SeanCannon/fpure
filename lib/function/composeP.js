'use strict';

const _composeP = require('../_private').composeP;
const _curry    = require('../_private').curry;

module.exports = _curry((...fns) => fns.reduce(_composeP));
