export const displayMatchingWord = (matchingWord, element) => {
	let keys = Object.keys(matchingWord);

	keys.forEach((key) => {
		if (key === element.children[key].dataset.name) {
			element.children[key].innerText = matchingWord[key];
		}
	});
};

export const unknownWord = (element) => {
	element.children[0].innerText = 'Nažalost nema te reči u rečniku...';
	for (let i = 1; i < element.children.length; i++) {
		element.children[i].innerText = '';
	}
};
