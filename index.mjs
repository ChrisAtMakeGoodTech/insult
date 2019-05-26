import { initializeLocalStorage, loadActiveKey, getInsult } from './insult-functions.mjs';

const theSpan = document.getElementById('insult-display');
const generateButton = document.getElementById('generate-insult');
const editContainer = document.getElementById('edit-insults');

if (localStorage.length === 0) {
	initializeLocalStorage();
} else {
	loadActiveKey();
}

generateButton.addEventListener('click', function () {
	theSpan.innerText = getInsult();
});