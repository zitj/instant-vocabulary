export const detectingLetters = (e, object) => {
	if (e.currentTarget.value === '') return;

	let detectingLetters = new RegExp(`^${e.currentTarget.value}`);
	let keys = Object.keys(object);
	keys.forEach((key) => {
		if (detectingLetters.test(key)) {
			console.log(key);
		}
	});
};
