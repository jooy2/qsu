import type { AnyValueObject } from '../_types/global.js';

export function objToPrettyStr(obj: AnyValueObject): string {
	return JSON.stringify(obj, null, '\t');
}
