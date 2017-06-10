/* @flow */
/* global fetch */

import queryString from 'query-string';

function request(resource: string, opts?: Object): Promise<*> {
  const queryParams = queryString.stringify(opts);
  const url =
    queryParams
      ? `${resource}?${queryString.stringify(opts)}`
      : resource;

  return fetch(url, { method: 'GET' })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }

      throw new Error(response.statusText);
    });
}

export default request;
