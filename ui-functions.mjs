import CONSTANTS from './constants.mjs';
import { getActiveMap } from './insult-functions.mjs';
import { editContainer, insultSets, editControls } from './ui-elements.mjs';

export function setUpKitList() {
    insultSets.innerHTML = '';
    insultSets.appendChild(getOption(CONSTANTS.defaultKey, 'Default'));
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== CONSTANTS.defaultKey && key !== CONSTANTS.activeKey) {
            insultSets.appendChild(getOption(key, key));
        }
    }
    const activeKey = localStorage.getItem(CONSTANTS.activeKey);
    insultSets.value = activeKey;
    setUpEdit(JSON.parse(localStorage.getItem(activeKey)), activeKey === CONSTANTS.defaultKey);
}

export function setUpEdit(insults, disabled) {
    editContainer.innerHTML = '';
    const maxInsultCount = insults.reduce(getMaxOrCurrentLength, 0);

    for (let i = 0; i < insults.length; i++) {
        const insultSet = insults[i];
        const insultBox = document.createElement('textarea');
        insultBox.rows = maxInsultCount + 1;
        insultBox.innerHTML = insultSet.join('\n') + '\n';
        insultBox.disabled = disabled;
        insultBox.setAttribute('data-index', i);
        insultBox.addEventListener('input', updateActiveMap);
        editContainer.appendChild(insultBox);
    }

    editControls.style.display = disabled ? 'none' : 'block';
}

function updateActiveMap(ev) {
    const target = ev.target;
    const value = target.value;
    const index = target.getAttribute('data-index');
    const ActiveMap = getActiveMap();
    ActiveMap[index] = value.split('\n').filter(v => v !== '');

    const lines = countLines(value);
    if (lines >= target.rows) {
        editContainer.querySelectorAll('textarea').forEach(t => t.rows = lines + 1);
    }
}

const newLineRegEx = /\n/g;
// https://stackoverflow.com/a/4009768
function countLines(value) {
    return (value.match(newLineRegEx) || []).length;
}

function getOption(value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = text;
    return option;
}

function getMaxOrCurrentLength(maxLength, currentArray) {
    return Math.max(maxLength, currentArray.length);
}