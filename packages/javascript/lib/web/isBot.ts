import { BOT_PATTERN, NOT_BOT_PATTERN } from './_botPatterns.js';

export function isBot(text: string): boolean {
	// The devices and apps whose names happen to contain a generic word, such as a Cubot
	// phone, are taken out before the names are read.
	return !!text && BOT_PATTERN.test(text.replace(NOT_BOT_PATTERN, ''));
}
