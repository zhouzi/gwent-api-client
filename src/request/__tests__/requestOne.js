import test from 'ava';
import sinon from 'sinon';
import { createDefaultCacheHandler } from '../../defaultCacheHandler';
import requestOne from '../requestOne';

test.beforeEach((t) => {
  /* eslint-disable no-param-reassign */

  t.context.cache = createDefaultCacheHandler();
  t.context.faction = {
    id: '1',
    name: 'faction 1',
  };
  t.context.variation = {
    id: '1',
    name: 'variation 1',
  };

  global.fetch = sinon
    .stub()
    .resolves({
      status: 200,
      json: () => Promise.resolve({
        faction: {
          href: '/factions/1',
        },
        variations: [
          {
            href: '/variations/1',
          },
        ],
      }),
    });

  global
    .fetch
    .withArgs('/factions/1')
    .resolves({
      status: 200,
      json: () => Promise.resolve(t.context.faction),
    });

  global
    .fetch
    .withArgs('/variations/1')
    .resolves({
      status: 200,
      json: () => Promise.resolve(t.context.variation),
    });

  /* eslint-enable no-param-reassign */
});

test.serial('should fetch the item', async (t) => {
  await requestOne(t.context.cache, {
    href: '/some/url',
  });

  t.is(global.fetch.lastCall.args[0], '/some/url');
});

test.serial('should fetch the provided fields', async (t) => {
  await requestOne(t.context.cache, {
    href: '/some/url',
  }, {
    fields: [
      'faction',
    ],
  });

  t.is(global.fetch.lastCall.args[0], '/factions/1');
});

test.serial('should fetch the provided fields when they are array as well', async (t) => {
  await requestOne(t.context.cache, {
    href: '/some/url',
  }, {
    fields: [
      'variations',
    ],
  });

  t.is(global.fetch.lastCall.args[0], '/variations/1');
});

test('should replace fields by their resulting data', async (t) => {
  const res = await requestOne(t.context.cache, {
    href: '/some/url',
  }, {
    fields: [
      'faction',
    ],
  });

  const actual = res.faction;
  const expected = t.context.faction;

  t.deepEqual(actual, expected);
});

test('should replace fields by their resulting data when they are array as well', async (t) => {
  const res = await requestOne(t.context.cache, {
    href: '/some/url',
  }, {
    fields: [
      'variations',
    ],
  });

  const actual = res.variations;
  const expected = [t.context.variation];

  t.deepEqual(actual, expected);
});
