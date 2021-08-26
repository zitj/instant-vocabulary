export const detectingLetters = (e, object, list, listItems) => {
	if (e.currentTarget.value === '') return;

	let detectingLetters = new RegExp(`^${e.currentTarget.value}`);
	let keys = Object.keys(object);

	keys.forEach((key) => {
		if (detectingLetters.test(key)) {
			console.log(key);
			listItems += `
                    <li>${key}</li>
            `;
		}
	});

	//Render list
	list.innerHTML = listItems;
	if (list.clientHeight >= 200) {
		list.style.height = '200px';
	}
};
