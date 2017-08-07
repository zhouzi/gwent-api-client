/* @flow */

import defaultCacheHandler from './defaultCacheHandler';
import { requestList, requestOne } from './request';
import type { Client, ClientOptions } from './types';

const APIRootURL = 'https://api.gwentapi.com/v0';

function getURL(resource: string): string {
  return `${APIRootURL}/${resource}/`;
}

function createClient(options: ClientOptions = { cache: defaultCacheHandler }): Client {
  const resources = {
    cards: 'cards',
    leaders: 'cards/leaders',
    categories: 'categories',
    factions: 'factions',
    groups: 'groups',
    rarities: 'rarities',
  };
  return Object.keys(resources).reduce((acc, resource) => Object.assign(acc, {
    [resource]: {
      list: requestList.bind(null, options.cache, getURL(resources[resource])),
      one: requestOne.bind(null, options.cache),
    },
  }), {});
}

export default createClient;
