# gwent-api-client

HTTP client for the non-official Gwent API.

## Installation

```
yarn add gwent-api-client
```

## Usage

```js
import GwentAPI from 'gwent-api-client';

GwentAPI
  // fetch the first 20 cards
  .cards({ offset: 0, limit: 20 })

  // fetch details about each of them
  .then(GwentAPI.cards)

  // resolves to an array of cards with their details
  .then(cards => console.log(cards));
```

## Documentation

`gwent-api-client` wraps each resources provided by the [Gwent API](https://gwentapi.com/), namely:

* cards
* leaders
* categories
* factions
* groups
* rarities

They all share the same signature:

```
(opts: void | Object | string) => Promise<*>
```

* `opts: void` fetch the resource list
* `opts: { offset: number, limit: number }` fetch the resource list with given `offset` and `limit`
* `opts: { href: string, ... }` fetch the resource at `href`
* `opts: { results: [] }` fetch the `href` of each `results`, resolves to an array

Have a look at [GwentAPI's documentation](https://gwentapi.com/) for more details.

## Changelog

### [0.1.0](https://github.com/Zhouzi/gwent-api-client/compare/...0.1.0) - Unreleased

- Add wrappers for cards, leaders, categories, factions, groups and rarities
