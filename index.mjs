import { initializeLocalStorage, loadActiveKey, getInsult } from './insult-functions.mjs';
import { insultDisplay, generateButton } from './ui-elements.mjs';

if (localStorage.length === 0) {
	initializeLocalStorage();
} else {
	loadActiveKey();
}

generateButton.addEventListener('click', function () {
	insultDisplay.innerText = getInsult();
});