# gwent-api-client

[![NPM version](https://badge.fury.io/js/gwent-api-client.svg)](http://badge.fury.io/js/gwent-api-client)
[![Build Status](https://travis-ci.org/Zhouzi/gwent-api-client.svg?branch=master)](https://travis-ci.org/zhouzi/gwent-api-client)

HTTP client for the [non-official Gwent API](https://gwentapi.com/).

## Installation

```
yarn add gwent-api-client
```

## Usage

```js
import GwentAPI from 'gwent-api-client';

GwentAPI
  // fetch the first 20 cards
  .cards
  .list({ offset: 0, limit: 20 })

  // fetch each cards in the list
  .then(res => GwentAPI.cards.map(res.results, GwentAPI.cards.one));
```

## Documentation

This library's main export is an object with a property for each of the [API endpoints](https://gwentapi.com/swagger/index.html).
Each resources have two methods: `one()` and `list()`.

### `.<resource>.one({ href: string }, { fields?: string[] })`

1. `{ href: string }` is an object returned by the API. They all have a `href` property pointing to the resource.
2. `{ fields?: string[] }` fields is an array of paths to the object's properties. It offers a way to enrich an object by fetching properties that reference other resources.

For example, you can fetch the `variations` of a card like so:

```js
import GwentAPI from 'gwent-api-client';

GwentAPI
  // Will resolve to the card with all its variations loaded
  .cards.one(card, { fields: ['variations'] });
```

### `.<resource>.list(requestParameters)`

This method request resources to the relevant endpoint and pass through the request parameters.
It means that every properties of `requestParameters` will be passed as query parameters to the API.

For example, you can fetch cards from a given offset to a given limit like so:

```js
import GwentAPI from 'gwent-api-client';

GwentAPI
  .cards.list({ offset: 10, limit: 20 });
```

Read more in the [API documentation](https://gwentapi.com/swagger/index.html).

### Available endpoints

* [`.cards.list()`](https://gwentapi.com/swagger/index.html#operation--v0-cards-get)
* [`.cards.one()`](https://gwentapi.com/swagger/index.html#operation--v0-cards--cardID--get)
* [`.leaders.list()`](https://gwentapi.com/swagger/index.html#operation--v0-cards-leaders-get)
* [`.leaders.one()`](https://gwentapi.com/swagger/index.html#operation--v0-cards--cardID--get)
* [`.categories.list()`](https://gwentapi.com/swagger/index.html#operation--v0-categories-get)
* [`.categories.one()`](https://gwentapi.com/swagger/index.html#operation--v0-categories--categoryID--get)
* [`.factions.list()`](https://gwentapi.com/swagger/index.html#operation--v0-factions-get)
* [`.factions.one()`](https://gwentapi.com/swagger/index.html#operation--v0-factions--factionID--get)
* [`.groups.list()`](https://gwentapi.com/swagger/index.html#operation--v0-groups-get)
* [`.groups.one()`](https://gwentapi.com/swagger/index.html#operation--v0-groups--groupID--get)
* [`.rarities.list()`](https://gwentapi.com/swagger/index.html#operation--v0-rarities-get)
* [`.rarities.one()`](https://gwentapi.com/swagger/index.html#operation--v0-rarities--rarityID--get)

### `createClient({ cache: CacheHandler }): Client`

Also exported is a method that lets you create a client with a custom cache handler.
In order to prevent flooding the Gwent API, please make sure to implement the cache handler that best suits your use case.

The cache handler must have two methods:

* `getItem(key: string): Promise<*>` the promise should resolve to the resource or `null`.
* `setItem(key: string, value: any): Promise<*>` should store `value` in the cache.

Here's an example implementing localStorage:

```js
import { createClient } from 'gwent-api-client';

const GwentAPI = createClient({
  cache: {
      getItem: key => Promise.resolve(JSON.parse(localStorage.getItem(key))),
      setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value));
          return Promise.resolve(value);
      },
  },
});
```

By default is implemented an in-memory cache handler.

### `map(cards, client.cards.one): Promise`

Request detailed resources for each items passed as first argument.
This method is equivalent to a normal `.map` except it makes a maximum of 30 requests at a time and returns a promise out of the box.

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.cards
  .list()
  .then(res => GwentAPI.map(res.results, GwentAPI.cards.one))
  .then((cards) => {
    // resolves to fully loaded cards
  });
```

## Changelog

### [2.0.0](https://github.com/Zhouzi/gwent-api-client/compare/1.1.1...2.0.0) - 2017-08-07

- Add map to make a maximum of 30 requests at a time
- Add support for the `If-Modified-Since` header
- Remove fetch polyfill

### [1.1.0](https://github.com/Zhouzi/gwent-api-client/compare/1.0.1...1.1.1) - 2017-07-09

- Add NodeJS support

### [1.0.1](https://github.com/Zhouzi/gwent-api-client/compare/1.0.0...1.0.1) - 2017-06-26

- Fix fields parameter when provided with several fields
- Fix cache to differentiate urls when requiring fields

### [1.0.0](https://github.com/Zhouzi/gwent-api-client/compare/0.2.0...1.0.0) - 2017-06-21

- Replace the unique methods (`cards()`, `leaders()`, ...) by `.list()` and `.one()`
- Remove shorthand to load a list of items from a list
- Move `createClient` to a separate method
- Add a way to fetch an item's fields

### [0.2.0](https://github.com/Zhouzi/gwent-api-client/compare/0.1.0...0.2.0) - 2017-06-17

- Fix package build

### [0.1.0](https://github.com/Zhouzi/gwent-api-client/compare/...0.1.0) - 2017-06-10

- Add wrappers for cards, leaders, categories, factions, groups and rarities
- Add cache handler to avoid flooding Gwent API
