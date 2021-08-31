import { separateStringInNewLine } from './string_manipulation.js';

export const displayMatchingWord = (matchingWord, wordContainer, list) => {
	let keys = Object.keys(matchingWord);

	keys.forEach((key) => {
		if (key === wordContainer.children[key].dataset.name) {
			wordContainer.children[key].innerText = matchingWord[key];
		}
	});

	wordContainer.classList.add('show');
};

export const unknownWord = (wordContainer) => {
	wordContainer.children[0].innerText = '';
	for (let i = 1; i < wordContainer.children.length; i++) {
		wordContainer.children[i].innerText = '';
	}
};

export const formatWord = (word) => {
	let formatedWord = {
		id: word.id,
		word: word.word,
		meaning: separateStringInNewLine(word.meaning),
		origin: word.origin,
	};

	return formatedWord;
};
