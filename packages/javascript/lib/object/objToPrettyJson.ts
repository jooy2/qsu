import type { AnyValueObject } from '../_types/global.js';

export function objToPrettyJson(obj: AnyValueObject): string {
	return JSON.stringify(obj, null, '\t');
}
