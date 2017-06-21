/* @flow */

import request from './request';
import type { CacheHandler } from './request';

async function fetchField(
  cache: CacheHandler,
  item: Object,
  field: string,
): { [string]: * } {
  return Object.assign(item, {
    [field]:
      /* eslint-disable no-use-before-define */
      Array.isArray(item[field])
        ? await Promise.all(item[field].map(fieldItem => requestOne(cache, fieldItem)))
        : await requestOne(cache, item[field]),
    /* eslint-enable no-use-before-define */
  });
}

function requestOne(
  cache: CacheHandler,
  one: { href: string },
  { fields = [] }: { fields?: string[] } = {},
): Promise<*> {
  return request(cache, one.href)
    .then(data => fields.reduce(fetchField.bind(null, cache), data));
}

export default requestOne;
