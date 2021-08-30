export const detectingLetters = (e, object, list, listItems) => {
	if (e.currentTarget.value === '') return;

<<<<<<< HEAD
	let onlyLetters = new RegExp(`^[a-zA-Z]+$`);

	if (!onlyLetters.test(e.currentTarget.value)) return;

	let detectingLetters = new RegExp(`^${e.currentTarget.value}`);

=======
	let onlyLetters = new RegExp(`^[a-zA-Zćđšžč]+$`);

	if (!onlyLetters.test(e.currentTarget.value)) return;

	let counter = 0;
	let detectingLetters = new RegExp(`^${e.currentTarget.value}`);
>>>>>>> test
	let keys = Object.keys(object);

	keys.forEach((key) => {
		if (detectingLetters.test(key)) {
<<<<<<< HEAD
			console.log(key);
			listItems += `
                    <li>${key}</li>
            `;
=======
			listItems += `
                    <li>${key}</li>
            `;
			counter++;
>>>>>>> test
		}
	});

	//Render list
	list.innerHTML = listItems;
<<<<<<< HEAD
	if (list.clientHeight >= 200) {
		list.style.height = '200px';
=======

	if (counter <= 5) {
		list.classList.remove('staticHeight');
	} else {
		list.classList.add('staticHeight');
>>>>>>> test
	}
};
