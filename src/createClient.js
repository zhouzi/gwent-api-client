/* @flow */

import parallelLimit from 'async.parallellimit';
import defaultCacheHandler from './defaultCacheHandler';
import { requestList, requestOne } from './request';
import type { Client, ClientOptions } from './types';

const APIRootURL = 'https://api.gwentapi.com/v0';
const MAX_PARALLEL_REQUESTS = 30;

function map(items, request) {
    const tasks = items.map(item => callback =>
        request(item)
            .then(json => callback(null, json))
            .catch(err => callback(err))
    );
    return new Promise((resolve, reject) => {
        parallelLimit(tasks, MAX_PARALLEL_REQUESTS, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    });
}

function getURL(resource: string): string {
    return `${APIRootURL}/${resource}/`;
}

function createClient(
    options: ClientOptions = { cache: defaultCacheHandler }
): Client {
    const resources = {
        cards: 'cards',
        leaders: 'cards/leaders',
        categories: 'categories',
        factions: 'factions',
        groups: 'groups',
        rarities: 'rarities'
    };
    return Object.keys(resources).reduce(
        (acc, resource) =>
            Object.assign(acc, {
                [resource]: {
                    list: requestList.bind(
                        null,
                        options.cache,
                        getURL(resources[resource])
                    ),
                    one: requestOne.bind(null, options.cache)
                }
            }),
        { map }
    );
}

export default createClient;
