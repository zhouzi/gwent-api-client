/* @flow */

import request from './request';
import type { APIItem } from '../types';

function requestField(item: APIItem | APIItem[]): Promise<any> {
    if (Array.isArray(item)) {
        return Promise.all(item.map(entry => requestField(entry)));
    }

    return requestOne(item);
}

function requestFields(item: APIItem, fields: string[]): Promise<Object> {
    return Promise.all(
        fields
            .filter(field => Object.prototype.hasOwnProperty.call(item, field))
            .map(field =>
                requestField(item[field]).then(data => ({
                    [field]: data
                }))
            )
    ).then(loadedFields => Object.assign({}, item, ...loadedFields));
}

function requestOne(
    one: APIItem,
    { fields = [] }: { fields?: string[] } = {}
): Promise<Object> {
    return request(one.href).then(item => requestFields(item, fields));
}

export default requestOne;
