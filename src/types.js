/* @flow */

export type APIItem = {
    href: string,
    name: string
};

export type Client = {
    [string]: *
};

export type Category = APIItem;
export type Faction = APIItem;
export type Group = APIItem;
export type Rarity = APIItem;

export type Variation = {
    availability: string,
    href: string,
    rarity: Rarity
};

export type Card = {
    categories: Category[],
    faction: Faction,
    flavor: string,
    group: Group,
    href: string,
    info: string,
    name: string,
    positions: string[],
    strength: number,
    uuid: string,
    variations: Variation[]
};
