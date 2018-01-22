'use strict';

const _curry = require('../_private').curry;

module.exports = _curry((fn, arr) => [...arr].map(fn).reduce((a, b) => a.concat(b)));
