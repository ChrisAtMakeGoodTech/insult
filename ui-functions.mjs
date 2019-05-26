import CONSTANTS from './constants.mjs';
import { editContainer, insultSets } from './ui-elements.mjs';

export function setUpEdit(insults, disabled) {
    editContainer.innerHTML = '';
    const maxInsultCount = insults.reduce(getMaxOrCurrentLength, 0);
    for (const insultSet of insults) {
        const insultBox = document.createElement('textarea')
        insultBox.rows = maxInsultCount + 1;
        insultBox.innerHTML = insultSet.join('\n') + '\n';
        insultBox.disabled = disabled;
        editContainer.appendChild(insultBox);
    }
}

export function setUpKitList() {
    insultSets.innerHTML = '';
    insultSets.appendChild(getOption(CONSTANTS.defaultKey, 'Default'));
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== CONSTANTS.defaultKey && key !== CONSTANTS.activeKey){
            insultSets.appendChild(getOption(key, key));
        }
    }
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