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

function create(): { [resource: string]: Getter } {
  return resources.reduce((acc, resource) => Object.assign(acc, {
    [getResourceName(resource)]: createGetter(resource),
  }), {});
}

export default create();
