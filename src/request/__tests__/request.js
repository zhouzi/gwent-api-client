import test from 'ava';
import sinon from 'sinon';
import request from '../request';
import { createDefaultCacheHandler } from '../../defaultCacheHandler';

const ONE_DAY = 1000 * 60 * 60 * 24;

test.beforeEach((t) => {
  /* eslint-disable no-param-reassign */

  t.context.cache = createDefaultCacheHandler();
  t.context.json = {
    foo: 'bar',
  };

  global.fetch = sinon
    .stub()
    .resolves({
      status: 200,
      json: () => Promise.resolve(t.context.json),
    });

  /* eslint-enable no-param-reassign */
});

test.serial('should fetch an url', async (t) => {
  await request(t.context.cache, '/test/url');
  t.is(global.fetch.lastCall.args[0], '/test/url');
});

test.serial('should fetch a different url', async (t) => {
  await request(t.context.cache, '/another/url');
  t.is(global.fetch.lastCall.args[0], '/another/url');
});

test.serial('should fetch url with provided query parameters', async (t) => {
  await request(t.context.cache, '/another/url', { offset: 0, limit: 20 });
  t.is(global.fetch.lastCall.args[0], '/another/url?limit=20&offset=0');
});

test.serial('should resolve to json', async (t) => {
  const actual = await request(t.context.cache, '/url');
  const expected = t.context.json;

  t.is(actual, expected);
});

test.serial('should throw with a 500 response', async (t) => {
  global.fetch = sinon.stub().returns(Promise.resolve({
    status: 500,
    statusText: 'request failed',
  }));

  const error = await t.throws(request(t.context.cache, '/url'));
  const actual = error.message;
  const expected = 'request failed';

  t.is(actual, expected);
});

test.serial('should not make an http request if value is cached', async (t) => {
  await request({
    getItem: () => Promise.resolve({
      cachedAt: Date.now(),
      value: 'some value',
    }),
  }, '/url');

  t.is(global.fetch.callCount, 0);
});

test.serial('should resolve to cached value', async (t) => {
  const actual = await request({
    getItem: () => Promise.resolve({
      cachedAt: Date.now(),
      value: 'some value',
    }),
  }, '/url');
  const expected = 'some value';

  t.is(actual, expected);
});

test.serial('should cache the value', async (t) => {
  await request(t.context.cache, '/url');
  await request(t.context.cache, '/url');

  t.is(global.fetch.callCount, 1);
});

test.serial('should ignore cached value that is more than 3 days long', async (t) => {
  await request({
    getItem: () => Promise.resolve({
      cachedAt: Date.now() - (4 * ONE_DAY),
      value: 'some value',
    }),
    setItem: () => Promise.resolve({}),
  }, '/url');

  t.is(global.fetch.callCount, 1);
});

test.serial('should ignore cached value that doesn\'t have a cachedAt property', async (t) => {
  await request({
    getItem: () => Promise.resolve({
      value: 'some value',
    }),
    setItem: () => Promise.resolve({}),
  }, '/url');

  t.is(global.fetch.callCount, 1);
});

test.serial('should add If-Modified-Since header', async (t) => {
  const cachedAt = Date.now() - (4 * ONE_DAY);
  await request({
    getItem: () => Promise.resolve({
      cachedAt,
      value: 'some value',
    }),
    setItem: () => Promise.resolve({}),
  }, '/url');

  t.deepEqual(global.fetch.lastCall.args[1].headers, {
    'If-Modified-Since': new Date(cachedAt).toUTCString(),
  });
});

test.serial('should resolve to cached value if not modified', async (t) => {
  global.fetch = sinon
    .stub()
    .resolves({
      status: 304,
    });

  const actual = await request({
    getItem: () => Promise.resolve({
      cachedAt: Date.now() - (4 * ONE_DAY),
      value: 'cached value',
    }),
    setItem: () => Promise.resolve({}),
  }, '/url');
  const expected = 'cached value';

  t.is(actual, expected);
});

test.serial('should update cached value if not modified', async (t) => {
  global.fetch = sinon
    .stub()
    .resolves({
      status: 304,
    });

  const values = {
    '/url': {
      cachedAt: Date.now() - (4 * ONE_DAY),
      value: 'cached value',
    },
  };
  const cache = {
    getItem: key => Promise.resolve(values[key]),
    setItem: (key, value) => {
      values[key] = value;
      return Promise.resolve(values[key]);
    },
  };

  await request(cache, '/url');
  await request(cache, '/url');

  t.is(global.fetch.callCount, 1);
});
