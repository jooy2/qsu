import { capitalizeWord } from './_capitalizeWord.js';
import { words } from './words.js';

export function strToPascalCase(str: string): string {
	if (!str) {
		return '';
	}

	return words(str).map(capitalizeWord).join('');
}
