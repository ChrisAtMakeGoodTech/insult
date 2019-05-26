import CONSTANTS from './constants.mjs';

let ActiveMap = null;

export function initializeLocalStorage() {
    const defaultInsults = [
        ['Thou'],
        [
            'artless',
            'bawdy',
            'beslubbering',
            'churlish',
            'cockered',
            'clouted',
            'craven',
            'currish',
            'dankish',
            'dissembling',
            'droning',
            'errant',
            'fawning',
            'fobbing',
            'froward',
            'frothy',
            'gleeking',
            'goatish',
            'gorbellied',
            'impertinent',
            'infectious',
            'jarring',
            'loggerheaded',
            'lumpish',
            'mammering',
            'mangled',
        ],
        [
            'base-court',
            'bat-fowling',
            'beef-witted',
            'beetle-headed',
            'boil-brained',
            'clapper-clawed',
            'clay-brained',
            'common-kissing',
            'crook-pated',
            'dismal-dreaming',
            'dizzy-eyed',
            'doghearted',
            'dread-bolted',
            'earth-vexing',
            'elf-skinned',
            'fat-kidneyed',
            'fen-sucked',
            'flap-mouthed',
            'fly-bitten',
            'folly-fallen',
            'fool-born',
            'full-gorged',
            'guts-griping',
            'half-faced',
            'hasty-witted',
            'hedge-born',
            'hell-hated',
        ],
        [
            'apple-john',
            'baggage',
            'barnacle',
            'bladder',
            'boar-pig',
            'bugbear',
            'bum-bailey',
            'canker-blossom',
            'clack-dish',
            'clotpole',
            'coxcomb',
            'codpiece',
            'death-token',
            'dewberry',
            'flap-dragon',
            'flax-wench',
            'flirt-gill',
            'foot-licker',
            'fustilarian',
            'giglet',
            'gudgeon',
            'haggard',
            'harpy',
            'hedge-pig',
            'horn-beast',
            'hugger-mug',
            'joithead',
        ],
    ];
    localStorage.setItem(CONSTANTS.defaultKey, JSON.stringify(defaultInsults));
    activateKey(CONSTANTS.defaultKey);
};

export function activateKey(key) {
    if (key !== CONSTANTS.activeKey) {
        const keyValue = localStorage.getItem(key);
        if (keyValue !== null) {
            localStorage.setItem(CONSTANTS.activeKey, key);
            ActiveMap = JSON.parse(keyValue);
            setUpEdit(ActiveMap);
        }
    }
}

export function setUpEdit(activeMap) {

}

export function loadActiveKey() {
    activateKey(localStorage.getItem(CONSTANTS.activeKey));
}

export function getInsult() {
    let insult = '';
    for (const insults of ActiveMap) {
        const randomIndex = getRandomInt(0, insults.length);
        insult += insults[randomIndex] + ' ';
    }
    return insult;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}