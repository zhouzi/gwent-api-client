import request from './request';

const ENDPOINT = 'https://api.gwentapi.com/v0';

function createEndpoint(resource, cache) {
  return function fetch(opts = {}) {
    if (Array.isArray(opts.results)) {
      return Promise.all(opts.results.map(fetch));
    }

    if (typeof opts.href === 'string') {
      return fetch(opts.href);
    }

    if (typeof opts === 'string') {
      return request(cache, opts);
    }

    return request(cache, `${ENDPOINT}/${resource}`, opts);
  };
}

export default createEndpoint;
