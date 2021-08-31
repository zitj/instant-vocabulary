export const detectingLetters = (e, object, list, listItems) => {
	if (e.currentTarget.value === '') return;

	// let onlyLetters = new RegExp(`^[a-zA-Zćđšžč]+( [a-zA-Zćđšžč_]+)*$`);
	let onlyLetters = new RegExp(`^[a-zA-Zćđšžč]+( [a-zA-Zćđšžč]+)*$`);

	if (!onlyLetters.test(e.currentTarget.value.toLowerCase())) return;

	let counter = 0;
	let detectingLetters = new RegExp(`^${e.currentTarget.value.toLowerCase()}`);
	let keys = Object.keys(object);

	keys.forEach((key) => {
		if (detectingLetters.test(key)) {
			listItems += `
                    <li>${key}</li>
            `;
			counter++;
		}
	});

	//Render list
	list.innerHTML = listItems;

	if (counter <= 5) {
		list.classList.remove('staticHeight');
	} else {
		list.classList.add('staticHeight');
	}
};
