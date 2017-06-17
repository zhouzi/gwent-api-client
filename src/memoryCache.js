const cache = {};

function getItem(key) {
  return Promise.resolve(cache[key]);
}

function setItem(key, value) {
  cache[key] = value;
}

export default {
  getItem,
  setItem,
};
