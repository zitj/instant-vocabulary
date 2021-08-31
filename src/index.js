import { fromEvent, Observable, debounceTime, map, Rx } from '../node_modules/rxjs';
import { detectingLetters } from './js/suggested_words.js';
import { displayMatchingWord, unknownWord, formatWord } from './js/display_word.js';

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
};

getVocabulary();

const hideList = () => {
	list.innerHTML = '';
	list.classList.remove('show');
};

document.addEventListener('click', (e) => {
	if (e.target.localName === 'li') {
		hideList();
		searchBar.value = e.target.innerText;
		displayMatchingWord(formatWord(vocabulary[searchBar.value]), wordContainer);
	}
});

const keyup$ = fromEvent(searchBar, 'keyup');

keyup$
	.pipe(
		map((i) => {
			wordContainer.classList.remove('show');

			if (i.currentTarget.value === '') {
				i.currentTarget.value.trim();
				hideList();
				return;
			}

			if (vocabulary[i.currentTarget.value.trim().toLowerCase()]) {
				hideList();
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
				hideList();
				displayMatchingWord(formatWord(matchingWord), wordContainer);
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
