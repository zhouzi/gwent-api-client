import test from 'ava';
import defaultCacheHandler from '../defaultCacheHandler';

test('should return a promise', t => {
    const actual = defaultCacheHandler.getItem('whatever') instanceof Promise;
    const expected = true;

    t.is(actual, expected);
});

test('should resolve to undefined if value is not found', async t => {
    const actual = await defaultCacheHandler.getItem('whatever');
    const expected = undefined;

    t.is(actual, expected);
});

test('should return a promise from setter', async t => {
    const actual =
        defaultCacheHandler.setItem('whatever', 'super value') instanceof
        Promise;
    const expected = true;

    t.is(actual, expected);
});

test('should store a value', async t => {
    await defaultCacheHandler.setItem('whatever', 'super value');

    const actual = await defaultCacheHandler.getItem('whatever');
    const expected = 'super value';

    t.is(actual, expected);
});

test('should store a different value', async t => {
    await defaultCacheHandler.setItem('wow', 'such value');

    const actual = await defaultCacheHandler.getItem('wow');
    const expected = 'such value';

    t.is(actual, expected);
});

test('should return the stored value', async t => {
    const actual = await defaultCacheHandler.setItem('wow', 'such value');
    const expected = 'such value';

    t.is(actual, expected);
});
