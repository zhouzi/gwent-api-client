/* @flow */

import request from './request';
import type { CacheHandler } from './createClient';

export type Endpoint = (opts: void | Object | string) => Promise<*>;
const ENDPOINT = 'https://api.gwentapi.com/v0';

function createEndpoint(resource: string, cache: CacheHandler): Endpoint {
  return function fetch(opts = {}) {
    if (Array.isArray(opts.results)) {
      return Promise.all(opts.results.map(fetch));
    }

    if (typeof opts.href === 'string') {
      return fetch(opts.href);
    }

    if (typeof opts === 'string') {
      return request(cache, opts);
    }

    return request(cache, `${ENDPOINT}/${resource}`, opts);
  };
}

export default createEndpoint;
