# gwent-api-client

[![NPM version](https://badge.fury.io/js/gwent-api-client.svg)](http://badge.fury.io/js/gwent-api-client)
[![Build Status](https://travis-ci.org/zhouzi/gwent-api-client.png?branch=master)](https://travis-ci.org/zhouzi/gwent-api-client)

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
  .then(res => Promise.all(res.results.map(GwentAPI.cards.one)));
```

## Documentation

## `createClient({ cache: CacheHandler }): Client`

Creates a new client with the provided cache handler.
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

## `cards.list({ offset?: number, limit?: number }): Card[]`

Fetch a list of cards starting from `offset` until `limit`.

**Example:**

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.cards.list({
  offset: 0,
  limit: 20
});
```

## `cards.one(card: Card, opts: { fields?: string[] }): Card`

Fetch a card, optionally fetch the card's `fields`.

**Example:**

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.cards.one({
  href: '/url/to/card'
});
```

## `leaders.list({ offset?: number, limit?: number }): Leader[]`

Fetch a list of leaders starting from `offset` until `limit`.

**Example:**

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.leaders.list({
  offset: 0,
  limit: 20
});
```

## `leaders.one(leader: Leader, opts: { fields?: string[] }): Leader`

Fetch a leader, optionally fetch the leader's `fields`.

**Example:**

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.leaders.one({
  href: '/url/to/leader'
});
```

## `categories.list({ offset?: number, limit?: number }): Category[]`

Fetch a list of categories starting from `offset` until `limit`.

**Example:**

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.categories.list({
  offset: 0,
  limit: 20
});
```

## `categories.one(category: Category, opts: { fields?: string[] }): Category`

Fetch a category, optionally fetch the category's `fields`.

**Example:**

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.categories.one({
  href: '/url/to/category'
});
```

## `factions.list({ offset?: number, limit?: number }): Faction[]`

Fetch a list of factions starting from `offset` until `limit`.

**Example:**

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.factions.list({
  offset: 0,
  limit: 20
});
```

## `factions.one(faction: Faction, opts: { fields?: string[] }): Faction`

Fetch a faction, optionally fetch the faction's `fields`.

**Example:**

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.factions.one({
  href: '/url/to/faction'
});
```

## `groups.list({ offset?: number, limit?: number }): Group[]`

Fetch a list of groups starting from `offset` until `limit`.

**Example:**

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.groups.list({
  offset: 0,
  limit: 20
});
```

## `groups.one(group: Group, opts: { fields?: string[] }): Group`

Fetch a group, optionally fetch the group's `fields`.

**Example:**

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.groups.one({
  href: '/url/to/group'
});
```

## `rarities.list({ offset?: number, limit?: number }): Rarity[]`

Fetch a list of rarities starting from `offset` until `limit`.

**Example:**

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.rarities.list({
  offset: 0,
  limit: 20
});
```

## `rarities.one(rarity: Rarity, opts: { fields?: string[] }): Rarity`

Fetch a rarity, optionally fetch the rarity's `fields`.

**Example:**

```js
import GwentAPI from 'gwent-api-client';

GwentAPI.rarities.one({
  href: '/url/to/rarity'
});
```

## Changelog

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
