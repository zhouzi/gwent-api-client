/* @flow */

export type APIItem = {
    href: string
};

export type CacheHandler = {
    getItem: (key: string) => Promise<*>,
    setItem: (key: string, value: *) => Promise<*>
};

export type Client = {
    [string]: *
};

export type ClientOptions = {
    cache: CacheHandler
};
