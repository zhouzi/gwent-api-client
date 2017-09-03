/* @flow */

import { requestList, requestOne } from './request';
import type { Client } from './types';

const APIRootURL = 'https://api.gwentapi.com/v0';

function getURL(resource: string): string {
    return `${APIRootURL}/${resource}/`;
}

function createClient(): Client {
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
                requestList(getURL(resources[resource]), ...args);
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
                return requestOne(...args);
            };
            return Object.assign(acc, {
                [resource]: list
            });
        },
        { one: requestOne }
    );
}

export default createClient;
