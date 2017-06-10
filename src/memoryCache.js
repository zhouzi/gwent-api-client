/* @flow */

const cache = {};

function getItem(key: string): Promise<*> {
  return Promise.resolve(cache[key]);
}

function setItem(key: string, value: *): void {
  cache[key] = value;
}

export default {
  getItem,
  setItem,
};
