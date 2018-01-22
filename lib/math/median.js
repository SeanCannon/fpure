'use strict';

const asc = require('../list/asc');

module.exports = arr => { const a = asc(arr); return (a[(a.length - 1) >> 1] + a[a.length >> 1]) / 2; };
