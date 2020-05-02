import { elements } from './base';

export const getInput = () => elements.textInput.value;

export const getWordIsNotRepeatedAfter = () => elements.wordIsNotRepeatedAfter.value;

export const clearList = () =>  elements.wordList.innerHTML = '';

export const resetRepeatedWordsCount = () => elements.repeatedWordsCount.textContent = 0;

export const displayRepeatedWordsCount = (count) => elements.repeatedWordsCount.textContent = count;

export const renderListItem = (id, wordData) => {
    const markup = `
        <li class="data__item" data-id="${id}">
            <div class="data__item-word">${wordData.word}</div>
            <div class="data__item-occurance-count">${wordData.occuranceCount}</div>
            <div class="data__item-importance">${wordData.importance}</div>
        </li>
        `;

    elements.wordList.insertAdjacentHTML('beforeend', markup);
}

export const renderListItems = (repeatedWords) => {
    repeatedWords.forEach((el, i) => {
        renderListItem(i, el);
    });
}

export const highlightSelected = item => {
    const wordArr = Array.from(document.querySelectorAll('.data__item'));
    
    wordArr.forEach(el => el.classList.remove('data__item--active'));

    item.classList.add('data__item--active');
};

export const getFirstRepeatedWord = () => document.querySelector('.data__item:nth-of-type(1)');