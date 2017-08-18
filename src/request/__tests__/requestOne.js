import test from 'ava';
import sinon from 'sinon';
import { createDefaultCacheHandler } from '../../defaultCacheHandler';
import requestOne from '../requestOne';

test.beforeEach(t => {
    /* eslint-disable no-param-reassign */

    t.context.cache = createDefaultCacheHandler();
    t.context.card = {
        uuid: '1',
        faction: {
            href: '/factions/1'
        },
        variations: [
            {
                href: '/variations/1'
            }
        ]
    };
    t.context.faction = {
        uuid: '1',
        name: 'faction 1'
    };
    t.context.variation = {
        uuid: '1',
        name: 'variation 1'
    };

    global.fetch = sinon.stub();

    global.fetch.resolves({
        status: 200,
        json: () => Promise.resolve(t.context.card)
    });

    global.fetch.withArgs('/factions/1').resolves({
        status: 200,
        json: () => Promise.resolve(t.context.faction)
    });

    global.fetch.withArgs('/variations/1').resolves({
        status: 200,
        json: () => Promise.resolve(t.context.variation)
    });

    /* eslint-enable no-param-reassign */
});

test.serial('should fetch the item', async t => {
    await requestOne(t.context.cache, {
        href: '/cards/1'
    });

    t.is(global.fetch.lastCall.args[0], '/cards/1');
});

test.serial('should fetch the provided fields', async t => {
    await requestOne(
        t.context.cache,
        {
            href: '/cards/1'
        },
        {
            fields: ['faction']
        }
    );

    t.is(global.fetch.lastCall.args[0], '/factions/1');
});

test.serial(
    'should fetch the provided fields when they are array as well',
    async t => {
        await requestOne(
            t.context.cache,
            {
                href: '/cards/1'
            },
            {
                fields: ['variations']
            }
        );

        t.is(global.fetch.lastCall.args[0], '/variations/1');
    }
);

test.serial('should replace fields by their resulting data', async t => {
    const res = await requestOne(
        t.context.cache,
        {
            href: '/cards/1'
        },
        {
            fields: ['faction']
        }
    );

    const actual = res.faction;
    const expected = t.context.faction;

    t.deepEqual(actual, expected);
});

test.serial(
    'should replace fields by their resulting data when they are array as well',
    async t => {
        const res = await requestOne(
            t.context.cache,
            {
                href: '/cards/1'
            },
            {
                fields: ['variations']
            }
        );

        const actual = res.variations;
        const expected = [t.context.variation];

        t.deepEqual(actual, expected);
    }
);

test.serial('should add the fields to the url', async t => {
    await requestOne(
        t.context.cache,
        {
            href: '/cards/1'
        },
        {
            fields: ['variations']
        }
    );

    t.is(global.fetch.firstCall.args[0], '/cards/1?fields=variations');
});

test.serial('should sort the fields', async t => {
    await requestOne(
        t.context.cache,
        {
            href: '/cards/1'
        },
        {
            fields: ['variations', 'faction']
        }
    );

    t.is(global.fetch.firstCall.args[0], '/cards/1?fields=faction,variations');
});

test.serial(
    'should replace fields with their resulting data for multiple fields',
    async t => {
        const actual = await requestOne(
            t.context.cache,
            {
                href: '/cards/1'
            },
            {
                fields: ['variations', 'faction']
            }
        );
        const expected = {
            uuid: '1',
            variations: [t.context.variation],
            faction: t.context.faction
        };

        t.deepEqual(actual, expected);
    }
);

test.serial('should not fetch missing fields', async t => {
    global.fetch.resolves({
        status: 200,
        json: () =>
            Promise.resolve({
                uuid: '1',
                faction: {
                    href: '/factions/1'
                }
            })
    });

    const actual = await requestOne(
        t.context.cache,
        {
            href: '/cards/1'
        },
        {
            fields: ['variations', 'faction']
        }
    );
    const expected = {
        uuid: '1',
        faction: t.context.faction
    };

    t.deepEqual(actual, expected);
});
