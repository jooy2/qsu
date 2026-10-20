import { SEARCH_BOT_PATTERN } from './_botPatterns.js';

export function isSearchBot(text: string): boolean {
	return !!text && SEARCH_BOT_PATTERN.test(text);
}
