const CONSTANTS = {
	activeKey: '__activeKey',
};
let activeMap = null;

if (localStorage.length === 0) {
	initializeLocalStorage();
}

function activateKey(key) {
	if (key !== CONSTANTS.activeKey) {
		const keyValue = localStorage.getItem(key);
		if (keyValue !== null) {
			activeMap = JSON.parse(keyValue);
			localStorage.setItem(CONSTANTS.activeKey, key);
		}
	}
}

function initializeLocalStorage() {
	const insultMap = [
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
	localStorage.setItem('Shakespeare', JSON.stringify(insultMap));
	localStorage.setItem(CONSTANTS.activeKey, 'Shakespeare');
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
const theSpan = document.querySelector('span');
document.querySelector('button').addEventListener('click', function () {
	let insult = '';
	for (const insults of insultMap) {
		const randomIndex = getRandomInt(0, insults.length);
		console.log(randomIndex, insults);

		insult += insults[randomIndex] + ' ';
	}
	theSpan.innerText = insult;
});