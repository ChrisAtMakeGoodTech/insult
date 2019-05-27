import { initializeLocalStorage, loadActiveKey, activateKey, getInsult } from './insult-functions.mjs';
import { insultDisplay, generateButton, addSetButton, newSetNameInput, insultSets, addInsultWordButton, saveChangesButton } from './ui-elements.mjs';
import { addNewWord } from './ui-functions.mjs';

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

addInsultWordButton.addEventListener('click', addNewWord);

saveChangesButton.addEventListener('click', function () {

});

document.addEventListener('DOMContentLoaded', generateInsult);

function generateInsult() {
	insultDisplay.innerText = getInsult();
}