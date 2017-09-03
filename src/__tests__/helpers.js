import test from 'ava';
import * as helpers from '../helpers';

const factionIdentities = [
    ['isMonster', helpers.FACTIONS.MONSTER],
    ['isNeutral', helpers.FACTIONS.NEUTRAL],
    ['isNilfgaard', helpers.FACTIONS.NILFGAARD],
    ['isNorthernRealms', helpers.FACTIONS.NORTHERN_REALMS],
    ['isScoiatael', helpers.FACTIONS.SCOIATAEL],
    ['isSkellige', helpers.FACTIONS.SKELLIGE]
];

const rarityIdentities = [
    ['isCommon', helpers.RARITIES.COMMON],
    ['isEpic', helpers.RARITIES.EPIC],
    ['isLegendary', helpers.RARITIES.LEGENDARY],
    ['isRare', helpers.RARITIES.RARE]
];

const groupIdentities = [
    ['isBronze', helpers.GROUPS.BRONZE],
    ['isGold', helpers.GROUPS.GOLD],
    ['isLeader', helpers.GROUPS.LEADER],
    ['isSilver', helpers.GROUPS.SILVER]
];

factionIdentities.forEach(([method, expected]) => {
    test(`it should return true if card ${method}`, t => {
        t.is(
            helpers[method]({
                faction: {
                    name: expected
                }
            }),
            true
        );
    });

    test(`it should return false if card is not ${method}`, t => {
        t.is(
            helpers[method]({
                faction: {
                    name: 'not an existing faction'
                }
            }),
            false
        );
    });
});

rarityIdentities.forEach(([method, expected]) => {
    test(`it should return true if card ${method}`, t => {
        t.is(
            helpers[method]({
                variations: [
                    {
                        rarity: {
                            name: expected
                        }
                    }
                ]
            }),
            true
        );
    });

    test(`it should return false if card is not ${method}`, t => {
        t.is(
            helpers[method]({
                variations: [
                    {
                        rarity: {
                            name: 'not an existing rarity'
                        }
                    }
                ]
            }),
            false
        );
    });
});

groupIdentities.forEach(([method, expected]) => {
    test(`it should return true if card ${method}`, t => {
        t.is(
            helpers[method]({
                group: {
                    name: expected
                }
            }),
            true
        );
    });

    test(`it should return false if card is not ${method}`, t => {
        t.is(
            helpers[method]({
                group: {
                    name: 'not an existing group'
                }
            }),
            false
        );
    });
});
