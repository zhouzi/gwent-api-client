/* @flow */

import type { Card } from './types';

function is(
    getValue: (card: Card) => string,
    constantValue: string
): (card: Card) => boolean {
    return card => getValue(card) === constantValue;
}

export const FACTIONS = {
    MONSTER: 'Monster',
    NEUTRAL: 'Neutral',
    NILFGAARD: 'Nilfgaard',
    NORTHERN_REALMS: 'Northern Realms',
    SCOIATAEL: "Scoia'tael",
    SKELLIGE: 'Skellige'
};

export const getFaction = (card: Card): string => card.faction.name;
export const isMonster = is(getFaction, FACTIONS.MONSTER);
export const isNeutral = is(getFaction, FACTIONS.NEUTRAL);
export const isNilfgaard = is(getFaction, FACTIONS.NILFGAARD);
export const isNorthernRealms = is(getFaction, FACTIONS.NORTHERN_REALMS);
export const isScoiatael = is(getFaction, FACTIONS.SCOIATAEL);
export const isSkellige = is(getFaction, FACTIONS.SKELLIGE);

export const RARITIES = {
    COMMON: 'Common',
    EPIC: 'Epic',
    LEGENDARY: 'Legendary',
    RARE: 'Rare'
};

export const getRarity = (card: Card): string => card.variations[0].rarity.name;
export const isCommon = is(getRarity, RARITIES.COMMON);
export const isEpic = is(getRarity, RARITIES.EPIC);
export const isLegendary = is(getRarity, RARITIES.LEGENDARY);
export const isRare = is(getRarity, RARITIES.RARE);

export const GROUPS = {
    BRONZE: 'Bronze',
    GOLD: 'Gold',
    LEADER: 'Leader',
    SILVER: 'Silver'
};

export const getGroup = (card: Card): string => card.group.name;
export const isBronze = is(getGroup, GROUPS.BRONZE);
export const isGold = is(getGroup, GROUPS.GOLD);
export const isLeader = is(getGroup, GROUPS.LEADER);
export const isSilver = is(getGroup, GROUPS.SILVER);
