/* @flow */

import request from './request';
import type { CacheHandler } from './request';

function fetchField(cache, item, field) {
  /* eslint-disable no-use-before-define */
  const promise =
    Array.isArray(item[field])
      // item's field can be an array of items
      ? Promise.all(item[field].map(f => requestOne(cache, f)))
      // or an item
      : requestOne(cache, item[field]);
  /* eslint-enable no-use-before-define */

  return promise.then(fieldData => ({
    [field]: fieldData,
  }));
}

function requestOne(
  cache: CacheHandler,
  one: { href: string },
  { fields = [] }: { fields?: string[] } = {},
): Promise<*> {
  const url =
    fields.length
      ? `${one.href}?fields=${fields.slice().sort().join(',')}`
      : one.href;
  return request(cache, url)
    .then(item =>
      Promise
        // fetch all fields in parallel
        .all(fields.map(field => fetchField(cache, item, field)))
        // when they're all fetched, merge it with original data
        .then(fieldsData =>
          fieldsData.reduce((acc, fieldData) =>
            Object.assign(acc, fieldData),
            item,
          ),
        ),
    );
}

export default requestOne;
