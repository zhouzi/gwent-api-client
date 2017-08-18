/* @flow */

import request from './request';
import type { CacheHandler, APIItem } from '../types';

function requestField(
    cache: CacheHandler,
    item: APIItem | APIItem[]
): Promise<any> {
    if (Array.isArray(item)) {
        return Promise.all(item.map(entry => requestField(cache, entry)));
    }

    return requestOne(cache, item);
}

function requestFields(
    cache: CacheHandler,
    item: APIItem,
    fields: string[]
): Promise<Object> {
    return Promise.all(
        fields
            .filter(field => Object.prototype.hasOwnProperty.call(item, field))
            .map(field =>
                requestField(cache, item[field]).then(data => ({
                    [field]: data
                }))
            )
    ).then(loadedFields => Object.assign({}, item, ...loadedFields));
}

function requestOne(
    cache: CacheHandler,
    one: APIItem,
    { fields = [] }: { fields?: string[] } = {}
): Promise<Object> {
    const url = fields.length
        ? `${one.href}?fields=${fields.slice().sort().join(',')}`
        : one.href;
    return request(cache, url).then(item => requestFields(cache, item, fields));
}

export default requestOne;
