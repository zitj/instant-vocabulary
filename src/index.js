import { fromEvent, Observable, debounceTime, map, Rx } from '../node_modules/rxjs';
import { detectingLetters } from './js/suggested_words.js';
import { separateStringInNewLine } from './js/string_manipulation.js';
import { displayMatchingWord, unknownWord } from './js/display_word.js';
import { data } from './data/data.js';

const searchBar = document.querySelector('#searchBar');
const wordContainer = document.querySelector('#wordContainer');

let newData = {};

data.forEach((word) => {
	newData[word.word] = {
		word: word.word,
		meaning: separateStringInNewLine(word.meaning),
		origin: word.origin,
	};
});

const keyup$ = fromEvent(searchBar, 'keyup');

keyup$
	.pipe(
		map((i) => {
			wordContainer.style.opacity = 0;
			if (newData[i.currentTarget.value.trim().toLowerCase()]) {
				return newData[i.currentTarget.value.trim().toLowerCase()];
			}
			detectingLetters(i, newData);
		}),
		debounceTime(500)
	)
	.subscribe({
		next: (matchingWord) => {
			if (matchingWord) {
				displayMatchingWord(matchingWord, wordContainer);
			} else {
				unknownWord(wordContainer);
			}
			wordContainer.style.opacity = 1;
		},
		error: () => {
			console.log('error');
		},
		complete: () => {
			console.log('completed');
		},
	});
