import { editContainer } from './ui-elements.mjs';

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

function getMaxOrCurrentLength(maxLength, currentArray) {
    return Math.max(maxLength, currentArray.length);
}