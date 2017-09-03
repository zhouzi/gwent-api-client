/* @flow */
/* global fetch */

import queryString from 'query-string';

function request(url: string, parameters: { [string]: string | number } = {}) {
    const finalURL =
        Object.keys(parameters).length > 0
            ? `${url}?${queryString.stringify(parameters)}`
            : url;

    return fetch(finalURL).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }

        throw new Error(response.statusText);
    });
}

export default request;
