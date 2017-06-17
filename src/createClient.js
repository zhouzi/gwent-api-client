/* @flow */

import createEndpoint from './createEndpoint';
import type { Endpoint } from './createEndpoint';
import memoryCache from './memoryCache';

const resources = [
  'cards',
  'cards/leaders',
  'categories',
  'factions',
  'groups',
  'rarities',
];

function getResourceName(resource: string): string {
  return resource.split('/').pop();
}

export type CacheHandler = {
  getItem: (key: string) => Promise<*>,
  setItem: (key: string, value: *) => void
};
type APICreatorOptions = {
  cache: CacheHandler
};
// eslint-disable-next-line no-use-before-define
type APICreator = (APICreatorOptions) => API
type API = { [string]: Endpoint | APICreator };

function createClient({ cache = memoryCache }: APICreatorOptions = {}): API {
  return resources.reduce((acc, resource) => Object.assign(acc, {
    [getResourceName(resource)]: createEndpoint(resource, cache),
  }), { createClient });
}

export default createClient;
