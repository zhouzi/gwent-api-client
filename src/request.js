/* @flow */
/* global fetch */

import queryString from 'query-string';
import type { CacheHandler } from './create';

function request(cache: CacheHandler, resource: string, opts?: Object): Promise<*> {
  const queryParams = queryString.stringify(opts);
  const url =
    queryParams
      ? `${resource}?${queryString.stringify(opts)}`
      : resource;

  return cache.getItem(url).then((item) => {
    if (item) {
      return Promise.resolve(item);
    }

    return fetch(url, { method: 'GET' })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json().then((json) => {
            cache.setItem(url, json);
            return json;
          });
        }

        throw new Error(response.statusText);
      });
  });
}

export default request;
