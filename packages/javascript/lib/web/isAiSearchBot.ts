import { AI_SEARCH_BOT_PATTERN } from './_botPatterns.js';

export function isAiSearchBot(text: string): boolean {
	return !!text && AI_SEARCH_BOT_PATTERN.test(text);
}
