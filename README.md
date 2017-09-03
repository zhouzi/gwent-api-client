# gwent-api-client

[![NPM version](https://badge.fury.io/js/gwent-api-client.svg)](http://badge.fury.io/js/gwent-api-client)
[![Build Status](https://travis-ci.org/Zhouzi/gwent-api-client.svg?branch=master)](https://travis-ci.org/zhouzi/gwent-api-client)

JavaScript client for [Gwent API](https://gwentapi.com/).

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

  // fetch each cards in the list
  .then(res => Promise.all(res.results.map(GwentAPI.one)));
```

## Documentation

The client exports convenient methods to request [Gwent API](https://gwentapi.com/).
You will find a method for each [API endpoints](https://gwentapi.com/swagger/index.html).

### `GwentAPI.one({ href: string }, { fields?: string[] })`

1. `{ href: string }` is the structure of an item returned by Gwent API. You can pass it directly to this method to fetch it.
2. `{ fields?: string[] }` array of properties to fetch.

For example, if you need the card arts you must fetch the `variations` list.
You can do so as follows:

```js
import GwentAPI from 'gwent-api-client';

GwentAPI
  // Will resolve to the card with all its variations loaded
  .one(card, { fields: ['variations'] });
```

### `GwentAPI.<resource>(requestParameters?: Object)`

Where `<resource>` is one of:

* [cards](https://gwentapi.com/swagger/index.html#operation--v0-cards-get)
* [leaders](https://gwentapi.com/swagger/index.html#operation--v0-cards-leaders-get)
* [categories](https://gwentapi.com/swagger/index.html#operation--v0-categories-get)
* [factions](https://gwentapi.com/swagger/index.html#operation--v0-factions-get)
* [groups](https://gwentapi.com/swagger/index.html#operation--v0-groups-get)
* [rarities](https://gwentapi.com/swagger/index.html#operation--v0-rarities-get)

This method request the relevant endpoint and simply pass through the request parameters as query parameters.
Please see [Gwent API documentation](https://gwentapi.com/swagger/index.html) for more details on the available options.

For example, you can fetch cards from a given offset to a given limit like so:

```js
import GwentAPI from 'gwent-api-client';

GwentAPI
  .cards({ offset: 10, limit: 20 });
```

### Helpers

Also exported are a set of useful helpers:

* `GwentAPI.getFaction(card)`: returns the card's faction
* `GwentAPI.isMonster(card)`: returns true if card is of Monster faction
* `GwentAPI.isNeutral(card)`: returns true if card is of Neutral faction
* `GwentAPI.isNilfgaard(card)`: returns true if card is of Nilfgaard faction
* `GwentAPI.isNorthernRealms(card)`: returns true if card is of Northern Realms faction
* `GwentAPI.isScoiatael(card)`: returns true if card is of Scoia'tael faction
* `GwentAPI.isSkellige(card)`: returns true if card is of Skellige faction

* `GwentAPI.Rarity(card)`: returns the card's rarity
* `GwentAPI.isCommon(card)`: returns true if card is common
* `GwentAPI.isEpic(card)`: returns true if card is common
* `GwentAPI.isLegendary(card)`: returns true if card is legendary
* `GwentAPI.isRare(card)`: returns true if card is rare

* `GwentAPI.Rarity(card)`: returns the card's group
* `GwentAPI.isBronze(card)`: returns true if card is bronze
* `GwentAPI.isGold(card)`: returns true if card is gold
* `GwentAPI.isLeader(card)`: returns true if card is leader
* `GwentAPI.isSilver(card)`: returns true if card is silver

## Changelog

### [3.0.0](https://github.com/Zhouzi/gwent-api-client/compare/2.1.0...3.0.0) - 2017-09-03

- Remove `.map()`
- Remove `<resource>.one()` and `<resource>.list()` (use `<resource>()` and `one()` instead)
- Remove cache handler
- Add helpers

### [2.1.0](https://github.com/Zhouzi/gwent-api-client/compare/2.0.1...2.1.0) - 2017-09-02

- Add deprecation warning when calling `<resource>.one()`, `<resource>.list()`, `.map()` and using `options.cache`
- Add `<resource>()` as a replacement for `<resource>.list()`
- Add `.one()` as a replacement for `<resource>.one()`

### [2.0.1](https://github.com/Zhouzi/gwent-api-client/compare/2.0.0...2.0.1) - 2017-08-18

- Fix `GwentAPI.one()` fields option

### [2.0.0](https://github.com/Zhouzi/gwent-api-client/compare/1.1.1...2.0.0) - 2017-08-07

- Add `GwentAPI.map()` to make a maximum of 30 requests at a time
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
