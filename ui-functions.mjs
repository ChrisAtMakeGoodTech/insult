import CONSTANTS from './constants.mjs';
import { editContainer, insultSets, editControls } from './ui-elements.mjs';

export function setUpEdit(insults, disabled) {
    editContainer.innerHTML = '';
    const maxInsultCount = insults.reduce(getMaxOrCurrentLength, 0);
    for (const insultSet of insults) {
        const insultBox = document.createElement('textarea')
        insultBox.rows = maxInsultCount + 1;
        insultBox.innerHTML = insultSet.join('\n') + '\n';
        insultBox.disabled = disabled;
        editControls.style.display = disabled ? 'none' : 'block';
        editContainer.appendChild(insultBox);
    }
}

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

function getOption(value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = text;
    return option;
}

function getMaxOrCurrentLength(maxLength, currentArray) {
    return Math.max(maxLength, currentArray.length);
}