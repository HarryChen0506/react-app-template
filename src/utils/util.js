/* eslint-disable */
import { parse, stringify } from 'qs'
import { compile } from 'path-to-regexp'

export const LocalStorage = {
  save(key, value) {
    return window.localStorage.setItem(key, value);
  },
  get(key) {
    return window.localStorage.getItem(key);
  },
  remove(key) {
    return window.localStorage.removeItem(key);
  },
};

export const SessionStorage = {
  save: function (key, value) {
    return window.sessionStorage.setItem(key, value)
  },
  get: function (key) {
    return window.sessionStorage.getItem(key)
  },
  remove: function (key) {
    return window.sessionStorage.removeItem(key)
  }
}

export const cloneDeep = (obj) => {
  // Handle the 3 simple types, and null or undefined
  if (obj === null || typeof obj !== 'object') return obj;
  // Handle Date
  if (obj instanceof Date) {
    const copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  // Handle Array
  if (obj instanceof Array) {
    const copy = [];
    const len = obj.length;
    for (let i = 0; i < len; ++i) {
      copy[i] = cloneDeep(obj[i]);
    }
    return copy;
  }
  // Handle Moment
  // eslint-disable-next-line no-underscore-dangle
  if (obj._isAMomentObject) {
    return obj.clone();
  }
  // Handle Object
  const copy = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const attr in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, attr)) {
      copy[attr] = cloneDeep(obj[attr]);
    }
  }
  return copy;
};

export const isEmpty = (obj) => {
  if (obj === null || obj === undefined || obj === '') {
    return true;
  }
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  return obj.constructor === Object && Object.keys(obj).length === 0;
};

/**
 * 分组函数
 * @param {*} array
 * @param {*} fn
 * @return [{type: '', list: []},...]
 */
export const groupBy = (array = [], fn) => {
  const groups = {};
  array.forEach((o) => {
    const group = fn(o);
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(group => ({
    type: group,
    list: groups[group],
  }));
};

// eslint-disable-next-line no-new-wrappers
export const numberToFixed = (value, length = 0) => parseFloat(new Number(value).toFixed(length));

export const padStartNumber = (value, length = 2) => {
  if (String(value).length > length) return value;
  return (Array(length).join('0') + value).slice(-length);
};

/** lodash获取对象的值
* const object = { 'a': [{ 'b': { 'c': 3 } }] }
* get(object, 'a[0].b.c')
* // => 3
* get(object, ['a', '0', 'b', 'c'])
* // => 3
* get(object, 'a.b.c', 'default')
* // => 'default'
*/
export const objectTool = {
  isKey: function isKey(value, object) {
    const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    const reIsPlainProp = /^\w*$/;
    if (Array.isArray(value)) {
      return false;
    }
    const type = typeof value;
    if (type === 'number' || type === 'boolean' || value == null) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value)
      || (object != null && value in Object(object));
  },
  toKey: function toKey(value) {
    if (typeof value === 'string') {
      return value;
    }
    const result = `${value}`;
    return (result === '0' && (1 / value) === -INFINITY) ? '-0' : result;
  },
  stringToPath(string) {
    const charCodeOfDot = '.'.charCodeAt(0);
    const reEscapeChar = /\\(\\)?/g;
    const rePropName = RegExp(
      '[^.[\\]]+' + '|'
      + '\\[(?:'
      + '([^"\'][^[]*)' + '|'
      + '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2'
      + ')\\]' + '|'
      + '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
      'g',
    );
    const result = [];
    if (string.charCodeAt(0) === charCodeOfDot) {
      result.push('');
    }
    string.replace(rePropName, (match, expression, quote, subString) => {
      let key = match;
      if (quote) {
        key = subString.replace(reEscapeChar, '$1');
      } else if (expression) {
        key = expression.trim();
      }
      result.push(key);
    });
    return result;
  },
  castPath: function castPath(value, object) {
    if (Array.isArray(value)) {
      return value;
    }
    return this.isKey(value, object) ? [value] : this.stringToPath(value);
  },
  get(object, path, defaultValue) {
    const baseGet = (object, path) => {
      path = this.castPath(path, object);
      let index = 0;
      const { length } = path;
      while (object != null && index < length) {
        object = object[this.toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    };
    const result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  },
  set(object, path, targetValue) {
    const baseSet = (object, path, targetValue) => {
      path = this.castPath(path, object);
      let index = 0;
      const { length } = path;
      if (length === 1) {
        return object[path[0]] = targetValue;
      }
      while (object != null && index < length - 1) {
        object = object[this.toKey(path[index++])];
      }
      if (index && index == length - 1) {
        return object[path[index]] = targetValue;
      }
    };
    if (object === null) {
      return;
    }
    const result = baseSet(object, path, targetValue);
    return result;
  },
};

export const objectGet = function (object, path, defaultValue) {
  return objectTool.get(object, path, defaultValue);
};

export const objectSet = function (object, path, targetValue) {
  return objectTool.set(object, path, targetValue);
};

export const flatten = (arr = [], depth = 1) => {
  return arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), [])
}

export const isPlainObject = (value) => {
  function isObjectLike(value) {
    return typeof value === 'object' && value !== null
  }
  function getTag(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return Object.prototype.toString.call(value)
  }
  if (!isObjectLike(value) || getTag(value) != '[object Object]') {
    return false
  }
  if (Object.getPrototypeOf(value) === null) {
    return true
  }
  let proto = value
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(value) === proto
}

export const throttle = function (func, delay) {
  let timer = null
  let startTime = Date.now()
  return function () {
    const curTime = Date.now()
    const remaining = delay - (curTime - startTime)
    const context = this
    const args = arguments
    clearTimeout(timer)
    if (remaining <= 0) {
      func.apply(context, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, remaining)
    }
  }
}

export const debounce = function (fn, delay) {
  let timer = null
  return function (...args) {
    let context = this
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(context, [...args])
      }, delay)
    } else {
      timer = setTimeout(function () {
        fn.apply(context, [...args])
      }, delay)
    }
  }
}

export const parseUrlQueryInfo = function () {
  return parse(window.location.href.split('?')[1])
}

export const stringifyUrl = function (url = '', params = {}) {
  const queryStr = stringify(params)
  if (!queryStr) {
    return url
  }
  if (url.indexOf('?') < 0) {
    return url += `?${queryStr}`
  }
  if (url.endsWith('&') || url.endsWith('?')) {
    url += queryStr
  } else {
    url += `&${queryStr}`
  }
  return url
}

export const compilePath = function (path = '', params = {}) {
  return compile(path, { encode: encodeURIComponent })(params);
}

export const copyToClipboard = function (text) {
  return new Promise((resolve, reject) => {
    const span = document.createElement("span")
    span.style.position = 'fixed';
    span.style.top = '0';
    span.style.left = '0';
    span.style.width = '0';
    span.style.height = '0';
    span.innerText = text
    document.body.appendChild(span)
    try {
      const range = document.createRange()
      range.selectNodeContents(span)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      resolve({
        success: true,
        msg: '成功复制到剪贴板'
      })
    } catch (err) {
      reject({
        success: false,
        meg: '该浏览器不支持点击复制到剪贴板'
      })
    } finally {
      document.body.removeChild(span)
    }
  })
}

export default {
  LocalStorage,
  SessionStorage,
  cloneDeep,
  isEmpty,
  groupBy,
  numberToFixed,
  padStartNumber,
  objectTool,
  objectGet,
  objectSet,
  flatten,
  isPlainObject,
  throttle,
  debounce,
  parseUrlQueryInfo,
  stringifyUrl,
  compilePath,
  copyToClipboard,
};
