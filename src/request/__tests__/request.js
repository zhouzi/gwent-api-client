import test from 'ava';
import sinon from 'sinon';
import request from '../request';

test.beforeEach(t => {
    /* eslint-disable no-param-reassign */

    t.context.json = {
        foo: 'bar'
    };

    global.fetch = sinon.stub().resolves({
        status: 200,
        json: () => Promise.resolve(t.context.json)
    });

    /* eslint-enable no-param-reassign */
});

test.serial('should fetch an url', async t => {
    await request('/test/url');
    t.is(global.fetch.lastCall.args[0], '/test/url');
});

test.serial('should fetch a different url', async t => {
    await request('/another/url');
    t.is(global.fetch.lastCall.args[0], '/another/url');
});

test.serial('should fetch url with provided query parameters', async t => {
    await request('/another/url', { offset: 0, limit: 20 });
    t.is(global.fetch.lastCall.args[0], '/another/url?limit=20&offset=0');
});

test.serial('should resolve to json', async t => {
    const actual = await request('/url');
    const expected = t.context.json;

    t.is(actual, expected);
});

test.serial('should throw with a 500 response', async t => {
    global.fetch = sinon.stub().returns(
        Promise.resolve({
            status: 500,
            statusText: 'request failed'
        })
    );

    const error = await t.throws(request('/url'));
    const actual = error.message;
    const expected = 'request failed';

    t.is(actual, expected);
});
