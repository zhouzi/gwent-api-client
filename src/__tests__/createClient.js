import test from 'ava';
import sinon from 'sinon';
import createClient from '../createClient';

const resources = {
    cards: 'https://api.gwentapi.com/v0/cards/',
    leaders: 'https://api.gwentapi.com/v0/cards/leaders/',
    categories: 'https://api.gwentapi.com/v0/categories/',
    factions: 'https://api.gwentapi.com/v0/factions/',
    groups: 'https://api.gwentapi.com/v0/groups/',
    rarities: 'https://api.gwentapi.com/v0/rarities/'
};
const client = createClient();

test('should expose a "one" method for each supported resources', t => {
    Object.keys(resources).forEach(resource =>
        t.truthy(client[resource].one, `${resource}.one()`)
    );
});

test.serial(
    'should call the relevant endpoint for each supported resources',
    async t => {
        global.fetch = sinon.stub().resolves({
            status: 200,
            json: () => Promise.resolve({})
        });
        await Object.keys(resources).reduce(
            (promise, resource) =>
                promise
                    .then(() => client[resource].list())
                    .then(() =>
                        t.is(global.fetch.lastCall.args[0], resources[resource])
                    ),
            Promise.resolve()
        );
    }
);

test('should expose a "list" method for each supported resources', t => {
    Object.keys(resources).forEach(resource =>
        t.truthy(client[resource].list, `${resource}.list()`)
    );
});
