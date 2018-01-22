'use strict';

const _sort = require('../_private').sort;

module.exports = arr => _sort((a, b) => a - b, arr);
