import { elements } from './base';

export const clearVisualizationText = () => elements.visualizationText.innerHTML = ''

export const renderVisualization = (text, wordData) => {
    let markup = text.split(' ');

    wordData.indexes.forEach((indexInText, i) => {
        let highlightClass;
        i === 0 ? highlightClass = 'visualization__highlight--first' : highlightClass = 'visualization__highlight--next';

        markup[indexInText] = `<span style="opacity: ${(100-i*5)}%;" class="visualization__highlight ${highlightClass}" data-id="${i}">${markup[indexInText]}</span>`;
    });

    markup = markup.join(' ');

    elements.visualizationText.insertAdjacentHTML('afterbegin', markup);
}

export const scrollToFirstHighlight = () => {
    const   textRect = elements.visualizationText.getBoundingClientRect(),
            firstHighlightRect = document.querySelector('.visualization__highlight--first').getBoundingClientRect(),
            offset   = firstHighlightRect.top - textRect.top;

    elements.visualizationText.scrollTo(0, offset);
}