/* @flow */

import type { CacheHandler } from './types';

function createDefaultCacheHandler(): CacheHandler {
  const cache = {};

  return {
    getItem: (key: string): Promise<*> => Promise.resolve(cache[key]),
    setItem: (key: string, value: *): Promise<*> => {
      cache[key] = value;
      return Promise.resolve(value);
    },
  };
}

export {
  createDefaultCacheHandler,
};
export default createDefaultCacheHandler();
