export const detectingLetters = (e, object, list, listItems) => {
	if (e.currentTarget.value === '') return;

	let onlyLetters = new RegExp(`^[a-zA-Zćđšžč]+$`);

	if (!onlyLetters.test(e.currentTarget.value)) return;

	let counter = 0;
	let detectingLetters = new RegExp(`^${e.currentTarget.value}`);
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
