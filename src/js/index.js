/* CSS */
import '../css/style.css'; 
/* JS */
import Text from './models/Text';
import { elements } from './views/base';
import * as textView from './views/textView';
import * as visualizationView from './views/visualizationView';


/** Global state of the app
 * - Text object
 */
const state = {
    hotReloading: false
}

/**
 * VISUALIZATION CONTROLLER
 */
const controlVisualization = item => {
    // 1) Get id
    const id = item.dataset.id;
    
    // 2) Prepare UI
    visualizationView.clearVisualizationText();
    textView.highlightSelected(item);

    // 3) Render visualization
    visualizationView.renderVisualization(state.text.splitText, state.text.repeatedWords[id]);

    // 4) Scorll to the first higlighted word
    visualizationView.scrollToFirstHighlight();
}

elements.wordList.addEventListener('click', e => {
    const item = e.target.closest('.data__item');
    if(item && !item.classList.contains('data__item--active')) {
        controlVisualization(item);
    }
});

/**
 * TEXT CONTROLLER
*/
const controlText = () => {
    // 1) Get input
    const input = textView.getInput();

    if (input) {
        // 2) Add text object to the state
        state.text = new Text(input, textView.getWordIsNotRepeatedAfter());
        
        // 3) Prepare UI for data
        textView.clearList();
        textView.resetRepeatedWordsCount();
        visualizationView.clearVisualizationText();

        // 4) Sort repeatedWords array according to importance
        state.text.sortRepeatedWordsArr();

        // 5) Display number of repeated words
        textView.displayRepeatedWordsCount(state.text.repeatedWords.length);

        // 6) Render text data
        textView.renderListItems(state.text.repeatedWords);

        const fistRepeatedWordEl = textView.getFirstRepeatedWord();
        if(fistRepeatedWordEl) {
            // 7) Render first word visualization
            controlVisualization(fistRepeatedWordEl);
        }
    }
}

elements.button.addEventListener('click', controlText);

elements.hotReload.addEventListener('change', function() {
    if (this.checked) {
        state.hotReloading = true;
        textView.toDisableButton(true);
        elements.textInput.addEventListener('input', function() {
            if (state.hotReloading) controlText();
        });
        controlText();
    } else {
        state.hotReloading = false;
        textView.toDisableButton(false);
        elements.textInput.removeEventListener('input', function() {
            if (state.hotReloading) controlText();
        });
    }
})

elements.wordIsNotRepeatedAfter.addEventListener('input', () => {
    if (state.hotReloading) controlText();
});