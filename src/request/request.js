/* @flow */
/* global fetch */

import queryString from 'query-string';
import type { CacheHandler } from '../types';

const ONE_DAY = 1000 * 60 * 60 * 24;
const MAX_DAYS_CACHE = 3;

function getCached(cached) {
  if (cached == null) {
    return null;
  }

  if (cached.cachedAt == null) {
    return null;
  }

  return cached;
}

function setCached(value) {
  return {
    cachedAt: Date.now(),
    value,
  };
}

function request(
  cache: CacheHandler,
  url: string,
  parameters: { [string]: string | number } = {},
) {
  const finalURL =
    Object.keys(parameters).length > 0
      ? `${url}?${queryString.stringify(parameters)}`
      : url;

  return cache.getItem(finalURL).then(getCached).then((cached) => {
    if (cached != null) {
      const daysSinceCached = (Date.now() - cached.cachedAt) / ONE_DAY;

      if (daysSinceCached <= MAX_DAYS_CACHE) {
        return Promise.resolve(cached.value);
      }
    }

    const headers = {};

    if (cached != null) {
      headers['If-Modified-Since'] = new Date(cached.cachedAt).toUTCString();
    }

    return fetch(finalURL, { headers })
      .then((response) => {
        if (cached != null && response.status === 304) {
          return Promise.resolve(cached.value);
        }

        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        throw new Error(response.statusText);
      })
      .then(json =>
        cache
          .setItem(finalURL, setCached(json))
          .then(() => json),
      );
  });
}

export default request;
