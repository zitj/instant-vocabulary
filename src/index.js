import { fromEvent, Observable, debounceTime, map, Rx } from '../node_modules/rxjs';
import { detectingLetters } from './js/suggested_words.js';
import { separateStringInNewLine } from './js/string_manipulation.js';
import { displayMatchingWord, unknownWord } from './js/display_word.js';
import { vocabulary } from './data/vocabulary.js';

const searchBar = document.querySelector('#searchBar');
const wordContainer = document.querySelector('#wordContainer');
const container = document.querySelector('.container');

let objectifiedVocabulary = {};

let list = document.createElement('ul');
let listItems = ``;

container.appendChild(list);

list.style.opacity = 0;

vocabulary.forEach((word) => {
	objectifiedVocabulary[word.word] = {
		id: word.id,
		word: word.word,
		meaning: separateStringInNewLine(word.meaning),
		origin: word.origin,
	};
});

console.log(objectifiedVocabulary);

const keyup$ = fromEvent(searchBar, 'keyup');

keyup$
	.pipe(
		map((i) => {
			wordContainer.style.opacity = 0;
			if (i.currentTarget.value === '') {
				list.style.opacity = 0;
				list.innerHTML = '';
				return;
			}

			if (objectifiedVocabulary[i.currentTarget.value.trim().toLowerCase()]) {
				list.innerHTML = '';
				return objectifiedVocabulary[i.currentTarget.value.trim().toLowerCase()];
			}
			detectingLetters(i, objectifiedVocabulary, list, listItems);
			list.style.opacity = 1;
		}),
		debounceTime(300)
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
		error: (err) => {
			console.log('error', err);
		},
		complete: () => {
			console.log('completed');
		},
	});
