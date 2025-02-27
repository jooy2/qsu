import type { PositiveNumber } from '../_types/global';

export function strRandom<N extends number>(
	length: PositiveNumber<N>,
	additionalCharacters?: string
): string {
	const availCharacters = `abcdefghijklmnopqrstuvwxyz0123456789${additionalCharacters}`;
	const availCharacterLength = availCharacters.length;
	let result = '';
	let newChar;

	for (let i = 0; i < length; i += 1) {
		newChar = availCharacters.charAt(Math.floor(Math.random() * availCharacterLength));
		newChar = Math.random() < 0.5 ? newChar.toUpperCase() : newChar;
		result += newChar;
	}

	return result;
}
