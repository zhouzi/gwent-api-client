/* @flow */

import createGetter from './createGetter';
import type { Getter } from './createGetter';

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

// eslint-disable-next-line no-use-before-define
type APICreator = () => API
type API = { [string]: Getter | APICreator };

function create(): API {
  return resources.reduce((acc, resource) => Object.assign(acc, {
    [getResourceName(resource)]: createGetter(resource),
  }), { create });
}

export default create();
