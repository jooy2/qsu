import { AI_AGENT_BOT_PATTERN } from './_botPatterns.js';

export function isAiAgentBot(text: string): boolean {
	return !!text && AI_AGENT_BOT_PATTERN.test(text);
}
