import { initializeLocalStorage, loadActiveKey, activateKey, getInsult } from './insult-functions.mjs';
import { insultDisplay, generateButton, addSetButton, newSetNameInput, insultSets } from './ui-elements.mjs';

if (localStorage.length === 0) {
	initializeLocalStorage();
} else {
	loadActiveKey();
}

generateButton.addEventListener('click', generateInsult);

addSetButton.addEventListener('click', function () {
	const newSetName = newSetNameInput.value;
	if (localStorage.getItem(newSetName) === null) {
		localStorage.setItem(newSetName, '[["Enter text"]]');
		activateKey(newSetName);
	}
	newSetNameInput.value = '';
});

insultSets.addEventListener('change', function () {
	activateKey(insultSets.value);
	generateInsult();
});

document.addEventListener('DOMContentLoaded', generateInsult);

function generateInsult() {
	insultDisplay.innerText = getInsult();
}