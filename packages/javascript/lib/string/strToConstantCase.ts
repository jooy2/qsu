import { words } from './words.js';

export function strToConstantCase(str: string): string {
	if (!str) {
		return '';
	}

	// `toUpperCase` applies the full Unicode case mapping here and in Python, where Dart
	// applies the simple one, so `ß` becomes `SS` in two of the three languages. The
	// difference is documented rather than papered over: forcing one behavior would need a
	// copy of the Unicode special-casing table in Dart.
	return words(str)
		.map((word: string) => word.toUpperCase())
		.join('_');
}
