/* @flow */
/* global fetch */

import queryString from 'query-string';
import type { CacheHandler } from '../types';

function request(
  cache: CacheHandler,
  url: string,
  parameters: { [string]: string | number } = {},
) {
  const finalURL =
    Object.keys(parameters).length > 0
      ? `${url}?${queryString.stringify(parameters)}`
      : url;

  return cache.getItem(finalURL).then((value) => {
    if (value != null) {
      return Promise.resolve(value);
    }

    return fetch(finalURL)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response
            .json()
            .then(json => cache.setItem(finalURL, json));
        }

        throw new Error(response.statusText);
      });
  });
}

export default request;
