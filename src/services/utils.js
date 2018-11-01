import yaml from 'js-yaml';
import '../libs/clunderscore';
import defaultProperties from '../data/defaultFileProperties.yml';

const origin = `${location.protocol}//${location.host}`;

// For utils.uid()
const uidLength = 16;
const crypto = window.crypto || window.msCrypto;
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const radix = alphabet.length;
const array = new Uint32Array(uidLength);

// For utils.parseQueryParams()
const parseQueryParams = (params) => {
  const result = {};
  params.split('&').forEach((param) => {
    const [key, value] = param.split('=').map(decodeURIComponent);
    if (key) {
      result[key] = value;
    }
  });
  return result;
};

// For utils.addQueryParams()
const urlParser = document.createElement('a');

export default {
  cleanTrashAfter: 7 * 24 * 60 * 60 * 1000, // 7 days
  origin,
  oauth2RedirectUri: `${origin}/oauth2/callback`,
  queryParams: parseQueryParams(location.hash.slice(1)),
  setQueryParams(params = {}) {
    this.queryParams = params;
    const serializedParams = Object.entries(this.queryParams).map(([key, value]) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    const hash = serializedParams && `#${serializedParams}`;
    if (location.hash !== hash) {
      location.hash = hash;
    }
  },
  types: [
    'contentState',
    'syncedContent',
    'content',
    'file',
    'folder',
    'syncLocation',
    'publishLocation',
    'data',
  ],
  localStorageDataIds: [
    'workspaces',
    'settings',
    'layoutSettings',
    'tokens',
  ],
  textMaxLength: 150000,
  sanitizeText(text) {
    const result = `${text || ''}`.slice(0, this.textMaxLength);
    // last char must be a `\n`.
    return `${result}\n`.replace(/\n\n$/, '\n');
  },
  sanitizeName(name) {
    return `${name || ''}`.slice(0, 250) || 'Untitled';
  },
  deepCopy(obj) {
    return obj == null ? obj : JSON.parse(JSON.stringify(obj));
  },
  serializeObject(obj) {
    return obj === undefined ? obj : JSON.stringify(obj, (key, value) => {
      if (Object.prototype.toString.call(value) !== '[object Object]') {
        return value;
      }
      // Sort keys to have a predictable result
      return Object.keys(value).sort().reduce((sorted, valueKey) => {
        sorted[valueKey] = value[valueKey];
        return sorted;
      }, {});
    });
  },
  uid() {
    crypto.getRandomValues(array);
    return array.cl_map(value => alphabet[value % radix]).join('');
  },
  hash(str) {
    let hash = 0;
    if (!str) return hash;
    for (let i = 0; i < str.length; i += 1) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char; // eslint-disable-line no-bitwise
      hash |= 0; // eslint-disable-line no-bitwise
    }
    return hash;
  },
  addItemHash(item) {
    return {
      ...item,
      hash: this.hash(this.serializeObject({
        ...item,
        // These properties must not be part of the hash
        history: undefined,
        hash: undefined,
      })),
    };
  },
  makeWorkspaceId(params) {
    return Math.abs(this.hash(this.serializeObject(params))).toString(36);
  },
  encodeBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(`0x${p1}`)));
  },
  decodeBase64(str) {
    return decodeURIComponent(atob(str).split('').map(
      c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`).join(''));
  },
  computeProperties(yamlProperties) {
    const customProperties = yaml.safeLoad(yamlProperties);
    const properties = yaml.safeLoad(defaultProperties);
    const override = (obj, opt) => {
      const objType = Object.prototype.toString.call(obj);
      const optType = Object.prototype.toString.call(opt);
      if (obj === undefined) {
        return opt;
      } else if (objType !== optType) {
        return obj;
      } else if (objType !== '[object Object]') {
        return opt === undefined ? obj : opt;
      }
      Object.keys({
        ...obj,
        ...opt,
      }).forEach((key) => {
        obj[key] = override(obj[key], opt[key]);
      });
      return obj;
    };
    return override(properties, customProperties);
  },
  randomize(value) {
    return Math.floor((1 + (Math.random() * 0.2)) * value);
  },
  setInterval(func, interval) {
    return setInterval(() => func(), this.randomize(interval));
  },
  parseQueryParams,
  addQueryParams(url = '', params = {}, hash = false) {
    const keys = Object.keys(params).filter(key => params[key] != null);
    urlParser.href = url;
    if (!keys.length) {
      return urlParser.href;
    }
    const serializedParams = keys.map(key =>
      `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
    if (hash) {
      if (urlParser.hash) {
        urlParser.hash += '&';
      } else {
        urlParser.hash = '#';
      }
      urlParser.hash += serializedParams;
    } else {
      if (urlParser.search) {
        urlParser.search += '&';
      } else {
        urlParser.search = '?';
      }
      urlParser.search += serializedParams;
    }
    return urlParser.href;
  },
  resolveUrl(url) {
    return this.addQueryParams(url);
  },
  createHiddenIframe(url) {
    const iframeElt = document.createElement('iframe');
    iframeElt.style.position = 'absolute';
    iframeElt.style.left = '-9999px';
    iframeElt.style.width = '1px';
    iframeElt.style.height = '1px';
    iframeElt.src = url;
    return iframeElt;
  },
  wrapRange(range, eltProperties) {
    const rangeLength = `${range}`.length;
    let wrappedLength = 0;
    const treeWalker = document.createTreeWalker(
      range.commonAncestorContainer, NodeFilter.SHOW_TEXT);
    let startOffset = range.startOffset;
    treeWalker.currentNode = range.startContainer;
    if (treeWalker.currentNode.nodeType === Node.TEXT_NODE || treeWalker.nextNode()) {
      do {
        if (treeWalker.currentNode.nodeValue !== '\n') {
          if (treeWalker.currentNode === range.endContainer &&
            range.endOffset < treeWalker.currentNode.nodeValue.length
          ) {
            treeWalker.currentNode.splitText(range.endOffset);
          }
          if (startOffset) {
            treeWalker.currentNode = treeWalker.currentNode.splitText(startOffset);
            startOffset = 0;
          }
          const elt = document.createElement('span');
          Object.entries(eltProperties).forEach(([key, value]) => {
            elt[key] = value;
          });
          treeWalker.currentNode.parentNode.insertBefore(elt, treeWalker.currentNode);
          elt.appendChild(treeWalker.currentNode);
        }
        wrappedLength += treeWalker.currentNode.nodeValue.length;
        if (wrappedLength >= rangeLength) {
          break;
        }
      }
      while (treeWalker.nextNode());
    }
  },
  unwrapRange(eltCollection) {
    Array.prototype.slice.call(eltCollection).forEach((elt) => {
      // Loop in case another wrapper has been added inside
      for (let child = elt.firstChild; child; child = elt.firstChild) {
        if (child.nodeType === 3) {
          if (elt.previousSibling && elt.previousSibling.nodeType === 3) {
            child.nodeValue = elt.previousSibling.nodeValue + child.nodeValue;
            elt.parentNode.removeChild(elt.previousSibling);
          }
          if (!child.nextSibling && elt.nextSibling && elt.nextSibling.nodeType === 3) {
            child.nodeValue += elt.nextSibling.nodeValue;
            elt.parentNode.removeChild(elt.nextSibling);
          }
        }
        elt.parentNode.insertBefore(child, elt);
      }
      elt.parentNode.removeChild(elt);
    });
  },
};
