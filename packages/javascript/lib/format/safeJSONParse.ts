import type { AnyValueObject } from '../_types/global';

export function safeJSONParse(jsonString: any, fallback = {}): AnyValueObject {
	if (!jsonString) {
		return fallback;
	}

	if (Array.isArray(jsonString) || typeof jsonString === 'object') {
		try {
			return JSON.parse(JSON.stringify(jsonString));
		} catch {
			return fallback;
		}
	}

	try {
		return JSON.parse(jsonString);
	} catch {
		return fallback;
	}
}
