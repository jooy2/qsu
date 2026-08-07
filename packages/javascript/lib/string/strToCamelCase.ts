import { capitalizeWord } from './_capitalizeWord.js';
import { words } from './words.js';

export function strToCamelCase(str: string): string {
	if (!str) {
		return '';
	}

	return words(str)
		.map((word: string, index: number) => (index === 0 ? word.toLowerCase() : capitalizeWord(word)))
		.join('');
}
