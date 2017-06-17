import createEndpoint from './createEndpoint';
import memoryCache from './memoryCache';

const resources = [
  'cards',
  'cards/leaders',
  'categories',
  'factions',
  'groups',
  'rarities',
];

function getResourceName(resource) {
  return resource.split('/').pop();
}

function createClient({ cache = memoryCache } = {}) {
  return resources.reduce((acc, resource) => Object.assign(acc, {
    [getResourceName(resource)]: createEndpoint(resource, cache),
  }), { createClient });
}

export default createClient;
