export default class Text {
    constructor(text, wordIsNotRepeatedAfter) {
        this.wordIsNotRepeatedAfter = wordIsNotRepeatedAfter;
        this.text = text;
        this.splitText = text.split(/[ \n\t\r]/);
        this.findRepeatingWords();
    }

    findRepeatingWords() {
        const characterSet = ',.)(?!~"\t-'

        let splitText = this.splitText;
        this.repeatedWords = [];

        for (let i = 0; i < splitText.length; i++) {
            const curWord = splitText[i].replace(new RegExp(`[${characterSet}]`, 'g'), '');

            if (curWord){
                const indexInReapetedWords = this.repeatedWords.map(el => el.word.toLowerCase()).lastIndexOf(curWord.toLowerCase());

                let indexesArr;
                if (indexInReapetedWords > -1) indexesArr = this.repeatedWords[indexInReapetedWords].indexes;

                // Checks if word wasn't already repeated or if the distance between this word and first occurance in last repeat streak is greater than 50 words
                // so the words that are already counted as repeated don't get counted again
                if (indexInReapetedWords === -1 || i - indexesArr[indexesArr.length-1] > this.wordIsNotRepeatedAfter) {

                    const word = {
                        word: curWord,
                        occuranceCount: 1,
                        importance: 0,
                        indexes: [i],
                    };
                    
                    const regexAreEqual = new RegExp(`^[${characterSet}]?${curWord}[${characterSet}]?$`, 'im');
                    const loopAndUpadteLimit = index => {
                        for (let j = index+1; j <= index+this.wordIsNotRepeatedAfter && j < splitText.length; j++) {
                            if (regexAreEqual.test(splitText[j])) {
                                word.occuranceCount++;
                                word.indexes.push(j);
                                return loopAndUpadteLimit(j);
                            }
                        }
                    };
                    loopAndUpadteLimit(i);

                    if (word.occuranceCount > 1) {
                        this.calcImportance(word);
                        this.repeatedWords.push(word);
                    }
                }
            }
        }
    }

    calcImportance(wordData) {
        wordData.importance = (wordData.occuranceCount * .8 + wordData.word.length * .4).toFixed(1);
    }

    sortRepeatedWordsArr(sortBy = 'importance', order='desc') {
        function dynamicsort(property,order) {
            var sort_order = 1;
            if(order === "desc"){
                sort_order = -1;
            }
            return function (a, b){
                if(a[property] < b[property]){
                        return -1 * sort_order;
                }else if(a[property] > b[property]){
                        return 1 * sort_order;
                }else{
                        return 0 * sort_order;
                }
            }
        }

        this.repeatedWords.sort(dynamicsort(sortBy, order));
    }
}