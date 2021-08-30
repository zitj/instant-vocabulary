import { fromEvent, Observable, debounceTime, map, Rx } from '../node_modules/rxjs';
import { detectingLetters } from './js/suggested_words.js';
import { separateStringInNewLine } from './js/string_manipulation.js';
import { displayMatchingWord, unknownWord } from './js/display_word.js';
<<<<<<< HEAD
import { vocabulary } from './data/vocabulary.js';
=======
>>>>>>> test

const searchBar = document.querySelector('#searchBar');
const wordContainer = document.querySelector('#wordContainer');
const container = document.querySelector('.container');

<<<<<<< HEAD
let objectifiedVocabulary = {};
=======
const url = 'http://localhost:8080/getWords';

let vocabulary;
>>>>>>> test

let list = document.createElement('ul');
let listItems = ``;

container.appendChild(list);

list.style.opacity = 0;

<<<<<<< HEAD
vocabulary.forEach((word) => {
	objectifiedVocabulary[word.word] = {
		id: word.id,
		word: word.word,
		meaning: separateStringInNewLine(word.meaning),
		origin: word.origin,
	};
});

console.log(objectifiedVocabulary);
=======
const getVocabulary = async () => {
	const res = await fetch(url);
	vocabulary = await res.json();
	console.log(vocabulary);
};

getVocabulary();
>>>>>>> test

const keyup$ = fromEvent(searchBar, 'keyup');

keyup$
	.pipe(
		map((i) => {
			wordContainer.style.opacity = 0;
			if (i.currentTarget.value === '') {
<<<<<<< HEAD
=======
				list.style.opacity = 0;
>>>>>>> test
				list.innerHTML = '';
				return;
			}

<<<<<<< HEAD
			if (objectifiedVocabulary[i.currentTarget.value.trim().toLowerCase()]) {
				list.innerHTML = '';
				return objectifiedVocabulary[i.currentTarget.value.trim().toLowerCase()];
			}
			detectingLetters(i, objectifiedVocabulary, list, listItems);
			list.style.opacity = 1;
		}),
		debounceTime(300)
=======
			if (vocabulary[i.currentTarget.value.trim().toLowerCase()]) {
				list.innerHTML = '';
				return vocabulary[i.currentTarget.value.trim().toLowerCase()];
			}
			detectingLetters(i, vocabulary, list, listItems);
			list.style.opacity = 1;
		}),
		debounceTime(250)
>>>>>>> test
	)
	.subscribe({
		next: (matchingWord) => {
			if (matchingWord) {
<<<<<<< HEAD
				displayMatchingWord(matchingWord, wordContainer);
=======
				let formattedWord = {
					id: matchingWord.id,
					word: matchingWord.word,
					meaning: separateStringInNewLine(matchingWord.meaning),
					origin: matchingWord.origin,
				};

				displayMatchingWord(formattedWord, wordContainer);
>>>>>>> test
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
