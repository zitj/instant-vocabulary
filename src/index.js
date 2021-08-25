import { fromEvent, Observable, debounceTime, map, Rx } from '../node_modules/rxjs';
import { data } from './data/data.js';

const searchBar = document.querySelector('#searchBar');
const wordContainer = document.querySelector('#wordContainer');

let newData = {};

const separateStringInNewLine = (string) => {
	return string.split(';').join(';\n');
};

data.forEach((word) => {
	newData[word.word] = {
		word: word.word,
		meaning: separateStringInNewLine(word.meaning),
		origin: word.origin,
	};
});

// searchBar.addEventListener('keydown', (e) => {
// 	let keys = Object.keys(newData);
// 	keys.forEach((key) => {
// 		if (key[0] === e.target.value[0]) {
// 			console.log(key);
// 		}
// 	});
// });

const keyup$ = fromEvent(searchBar, 'keyup');

keyup$
	.pipe(
		map((i) => {
			wordContainer.style.opacity = 0;
			if (newData[i.currentTarget.value.trim().toLowerCase()]) {
				return newData[i.currentTarget.value.trim().toLowerCase()];
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
			wordContainer.style.opacity = 1;
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
	wordContainer.children[0].innerText = 'Nažalost nema te reči u rečniku...';
	for (let i = 1; i < wordContainer.children.length; i++) {
		wordContainer.children[i].innerText = '';
	}
};
