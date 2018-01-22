'use strict';

const _compose = require('../_private').compose;
const _curry   = require('../_private').curry;

module.exports = _curry((...fns) => fns.reduceRight(_compose));
