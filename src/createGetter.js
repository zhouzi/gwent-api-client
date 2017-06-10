/* @flow */

import request from './request';
import type { CacheHandler } from './create';

export type Getter = (opts: void | Object | string) => Promise<*>;
const ENDPOINT = 'https://api.gwentapi.com/v0';

function createGetter(resource: string, cache: CacheHandler): Getter {
  return function get(opts = {}) {
    if (Array.isArray(opts.results)) {
      return Promise.all(opts.results.map(get));
    }

    if (typeof opts.href === 'string') {
      return get(opts.href);
    }

    if (typeof opts === 'string') {
      return request(cache, opts);
    }

    return request(cache, `${ENDPOINT}/${resource}`, opts);
  };
}

export default createGetter;
