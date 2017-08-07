/* @flow */

import type { requestList, requestOne } from './request';

export type CacheHandler = {
  getItem: (key: string) => Promise<*>,
  setItem: (key: string, value: *) => Promise<*>,
};

export type Client = {
  [string]: {
    [string]: {
      list: requestList,
      one: requestOne,
    },
  },
};

export type ClientOptions = {
  cache: CacheHandler,
};
