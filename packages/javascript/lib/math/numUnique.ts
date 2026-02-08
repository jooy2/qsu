export function numUnique() {
	const seed = [...Array(89999).keys()].map((n) => n + 10000);

	return parseInt(new Date().valueOf() + '' + seed[Math.floor(Math.random() * seed.length)], 10);
}
