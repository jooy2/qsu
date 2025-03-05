export function strToAscii(str: string): number[] {
	const arr = [];
	for (let i = 0; i < str.length; i += 1) {
		arr.push(str.charCodeAt(i));
	}
	return arr;
}
