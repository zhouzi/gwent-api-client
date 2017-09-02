/* @flow */

import parallelLimit from 'async.parallellimit';
import defaultCacheHandler from './defaultCacheHandler';
import { requestList, requestOne } from './request';
import type { Client, ClientOptions } from './types';

const APIRootURL = 'https://api.gwentapi.com/v0';
const MAX_PARALLEL_REQUESTS = 30;

function map(items, request) {
    console.warn(
        'gwent-api-client: .map() is deprecated and will be removed in 3.0.0'
    );
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
    console.warn(
        'gwent-api-client: options.cache is deprecated and will be removed in 3.0.0'
    );
    const resources = {
        cards: 'cards',
        leaders: 'cards/leaders',
        categories: 'categories',
        factions: 'factions',
        groups: 'groups',
        rarities: 'rarities'
    };
    return Object.keys(resources).reduce(
        (acc, resource) => {
            const list = (...args) =>
                requestList(
                    options.cache,
                    getURL(resources[resource]),
                    ...args
                );
            list.list = (...args) => {
                console.warn(
                    `gwent-api-client: ${resource}.list() is deprecated and will be removed in 3.0.0`
                );
                return list(...args);
            };
            list.one = (...args) => {
                console.warn(
                    `gwent-api-client: ${resource}.one() is deprecated and will be removed in 3.0.0`
                );
                return requestOne(options.cache, ...args);
            };
            return Object.assign(acc, {
                [resource]: list
            });
        },
        { map, one: (...args) => requestOne(options.cache, ...args) }
    );
}

export default createClient;
