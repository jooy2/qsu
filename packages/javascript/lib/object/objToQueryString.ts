import type { AnyValueObject } from '../_types/global';

export function objToQueryString(obj: AnyValueObject): string {
	return Object.keys(obj)
		.map((key) => {
			let value = obj[key];

			if (typeof value === 'object') {
				value = JSON.stringify(value);
			}

			return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		})
		.join('&');
}
