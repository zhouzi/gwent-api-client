/* @flow */

import request from './request';

export type Getter = (opts: void | Object | string) => Promise<*>;
const ENDPOINT = 'https://api.gwentapi.com/v0';

function createGetter(resource: string): Getter {
  return function get(opts = {}) {
    if (Array.isArray(opts.results)) {
      return Promise.all(opts.results.map(get));
    }

    if (typeof opts.href === 'string') {
      return get(opts.href);
    }

    if (typeof opts === 'string') {
      return request(opts);
    }

    return request(`${ENDPOINT}/${resource}`, opts);
  };
}

export default createGetter;
