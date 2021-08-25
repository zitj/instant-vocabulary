import { fromEvent, Observable, debounceTime, map, Rx } from '../node_modules/rxjs';
import { data } from './data/data.js';

const searchBar = document.querySelector('#searchBar');
const wordContainer = document.querySelector('#wordContainer');

let newData = {};

data.forEach((word) => {
	newData[word.word] = {
		word: word.word,
		meaning: word.meaning,
		origin: word.origin,
	};
});

const keyup$ = fromEvent(searchBar, 'keyup');

keyup$
	.pipe(
		map((i) => {
			if (newData[i.currentTarget.value]) {
				return newData[i.currentTarget.value];
			}
		}),
		debounceTime(500)
	)
	.subscribe({
		next: (matchingWord) => {
			if (matchingWord) {
				displayMatchingWord(matchingWord);
			} else {
				unknownWord();
			}
		},
		error: () => {
			console.log('error');
		},
		complete: () => {
			console.log('completed');
		},
	});

const displayMatchingWord = (matchingWord) => {
	let keys = Object.keys(matchingWord);

	keys.forEach((key) => {
		if (key === wordContainer.children[key].dataset.name) {
			wordContainer.children[key].innerText = matchingWord[key];
		}
	});
};

const unknownWord = () => {
	wordContainer.children[0].innerText = 'Unknown word';
	for (let i = 1; i < wordContainer.children.length; i++) {
		wordContainer.children[i].innerText = '/';
	}
};
