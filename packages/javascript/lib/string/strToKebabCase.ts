import { words } from './words.js';

export function strToKebabCase(str: string): string {
	if (!str) {
		return '';
	}

	return words(str)
		.map((word: string) => word.toLowerCase())
		.join('-');
}
