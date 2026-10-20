import { AI_TRAINING_BOT_PATTERN } from './_botPatterns.js';

export function isAiTrainingBot(text: string): boolean {
	return !!text && AI_TRAINING_BOT_PATTERN.test(text);
}
