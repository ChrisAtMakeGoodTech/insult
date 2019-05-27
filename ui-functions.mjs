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
    setUpEdit(activeKey === CONSTANTS.defaultKey);
}

export function setUpEdit(isDisabled) {
    const ActiveMap = getActiveMap();
    editContainer.innerHTML = '';
    const maxInsultCount = ActiveMap.reduce(getMaxOrCurrentLength, 0);
    const rows = maxInsultCount + 1;

    for (let i = 0; i < ActiveMap.length; i++) {
        const insultContents = ActiveMap[i].join('\n') + '\n';
        const insultBox = buildInsultBox(i, insultContents, rows, isDisabled);
        editContainer.appendChild(insultBox);
    }

    editControls.style.display = isDisabled ? 'none' : 'block';
}

export function addNewWord() {
    const ActiveMap = getActiveMap();
    const index = ActiveMap.length;
    const rows = editContainer.querySelector('textarea').rows;
    const isDisabled = localStorage.getItem(CONSTANTS.activeKey) === CONSTANTS.defaultKey;
    const insultBox = buildInsultBox(index, '', rows, isDisabled);
    editContainer.appendChild(insultBox);
    ActiveMap.push([]);
}

function buildInsultBox(index, contents, rows, isDisabled) {
    const insultBox = document.createElement('textarea');
    insultBox.rows = rows;
    insultBox.innerHTML = contents;
    insultBox.disabled = isDisabled;
    insultBox.setAttribute('data-index', index);
    insultBox.addEventListener('input', updateActiveMap);
    return insultBox;
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