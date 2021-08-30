import { fromEvent, Observable, debounceTime, map, Rx } from '../node_modules/rxjs';
import { detectingLetters } from './js/suggested_words.js';
import { separateStringInNewLine } from './js/string_manipulation.js';
import { displayMatchingWord, unknownWord } from './js/display_word.js';

const searchBar = document.querySelector('#searchBar');
const wordContainer = document.querySelector('#wordContainer');
const container = document.querySelector('.container');

const url = 'http://localhost:8080/getWords';

let vocabulary;

let list = document.createElement('ul');
let listItems = ``;

container.appendChild(list);

const getVocabulary = async () => {
	const res = await fetch(url);
	vocabulary = await res.json();
	console.log(vocabulary);
};

getVocabulary();

const keyup$ = fromEvent(searchBar, 'keyup');

//TU SI STAO

// document.addEventListener('click', (e) => {
// 	if (e.target.localName === 'li') {
// 		list.innerHTML = '';
// 		list.classList.remove('show');
// 		searchBar.value = e.target.innerText;
// 		return vocabulary[e.target.innerText];
// 	}
// });

keyup$
	.pipe(
		map((i) => {
			wordContainer.classList.remove('show');
			if (i.currentTarget.value === '') {
				list.classList.remove('show');
				list.innerHTML = '';
				return;
			}

			if (vocabulary[i.currentTarget.value.trim().toLowerCase()]) {
				list.innerHTML = '';
				return vocabulary[i.currentTarget.value.trim().toLowerCase()];
			}

			detectingLetters(i, vocabulary, list, listItems);

			list.classList.add('show');
		}),
		debounceTime(250)
	)
	.subscribe({
		next: (matchingWord) => {
			if (matchingWord) {
				let formattedWord = {
					id: matchingWord.id,
					word: matchingWord.word,
					meaning: separateStringInNewLine(matchingWord.meaning),
					origin: matchingWord.origin,
				};

				displayMatchingWord(formattedWord, wordContainer);
				wordContainer.classList.add('show');
				list.classList.remove('show');
			} else {
				unknownWord(wordContainer);
			}
		},
		error: (err) => {
			console.log('error', err);
		},
		complete: () => {
			console.log('completed');
		},
	});
