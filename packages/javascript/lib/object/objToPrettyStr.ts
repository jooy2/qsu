import type { AnyValueObject } from '../_types/global';

export function objToPrettyStr(obj: AnyValueObject): string {
	return JSON.stringify(obj, null, '\t');
}
