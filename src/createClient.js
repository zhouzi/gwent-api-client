/* @flow */

import defaultCacheHandler from './defaultCacheHandler';
import { requestList, requestOne } from './request';
import type { CacheHandler } from './request/request';

type Client = {
  [string]: {
    [string]: {
      list: requestList,
      one: requestOne,
    },
  },
};
type Options = {
  cache: CacheHandler,
};

const APIRootURL = 'https://api.gwentapi.com/v0';

function getURL(resource: string): string {
  return `${APIRootURL}/${resource}/`;
}

function createClient(options: Options = { cache: defaultCacheHandler }): Client {
  return {
    cards: {
      list: requestList.bind(null, options.cache, getURL('cards')),
      one: requestOne.bind(null, options.cache),
    },
    leaders: {
      list: requestList.bind(null, options.cache, getURL('cards/leaders')),
      one: requestOne.bind(null, options.cache),
    },
    categories: {
      list: requestList.bind(null, options.cache, getURL('categories')),
      one: requestOne.bind(null, options.cache),
    },
    factions: {
      list: requestList.bind(null, options.cache, getURL('factions')),
      one: requestOne.bind(null, options.cache),
    },
    groups: {
      list: requestList.bind(null, options.cache, getURL('groups')),
      one: requestOne.bind(null, options.cache),
    },
    rarities: {
      list: requestList.bind(null, options.cache, getURL('rarities')),
      one: requestOne.bind(null, options.cache),
    },
  };
}

export default createClient;
