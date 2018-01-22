'use strict';

const _curry        = require('../_private').curry,
      _iter2arr     = require('../_private').iter2arr,
      _containsWith = require('../_private').containsWith,
      identical     = require('../relational/identical'),
      type          = require('../type/type'),
      keys          = require('../object/keys'),
      has           = require('../object/has');


const _uniqContentEquals = (iterA, iterB, stackA, stackB) => {
  const a = _iter2arr(iterA),
        b = _iter2arr(iterB);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }

  // if *a* array contains any element that is not included in *b*
  return !_containsWith((b, aItem) => {
    return !_containsWith(eq, aItem, b);
  }, b, a);
};

const _equals = (a, b, stackA, stackB) => {
  if (identical(a, b)) {
    return true;
  }

  const typeA = type(a),
        typeB = type(b);

  let stackIndex,
      keysA;

  if (typeA !== typeB) {
    return false;
  }

  if (a === null || b === null) {
    return false;
  }

  switch (typeA) {
    case 'Arguments' :
    case 'Array'     :
    case 'Object'    :
      if (typeof a.constructor === 'function' && typeof a.then === 'function') {
        return a === b;
      }
      break;
    case 'Boolean' :
    case 'Number'  :
    case 'String'  :
    case 'Date'    :
      if (!identical(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error' :
      return a.name === b.name && a.message === b.message;
    case 'RegExp' :
      if (!(
        a.source     === b.source     &&
        a.global     === b.global     &&
        a.ignoreCase === b.ignoreCase &&
        a.multiline  === b.multiline  &&
        a.sticky     === b.sticky     &&
        a.unicode    === b.unicode
      )) {
        return false;
      }
      break;
  }

  stackIndex = stackA.length - 1;
  while (stackIndex >= 0) {
    if (stackA[stackIndex] === a) {
      return stackB[stackIndex] === b;
    }
    stackIndex -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case 'Arguments'         :
    case 'Array'             :
    case 'Object'            :
    case 'Boolean'           :
    case 'Number'            :
    case 'String'            :
    case 'Date'              :
    case 'Error'             :
    case 'RegExp'            :
    case 'Int8Array'         :
    case 'Uint8Array'        :
    case 'Uint8ClampedArray' :
    case 'Int16Array'        :
    case 'Uint16Array'       :
    case 'Int32Array'        :
    case 'Uint32Array'       :
    case 'Float32Array'      :
    case 'Float64Array'      :
    case 'ArrayBuffer'       :
      break;
    default:
      return false;
  }

  keysA = keys(a);
  if (keysA.length !== keys(b).length) {
    return false;
  }

  const extendedStackA = stackA.concat([a]);
  const extendedStackB = stackB.concat([b]);

  stackIndex = keysA.length - 1;
  while (stackIndex >= 0) {
    const key = keysA[stackIndex];
    if (!(has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    stackIndex -= 1;
  }
  return true;
};

module.exports = _curry((a, b) => _equals(a, b, [], []));
