import type { SlugOptions } from '../_types/global';

// Both the chosen separator and any separator-like char in the source act as a
// word boundary, so "hello-world" stays "hello-world" instead of doubling up.
const isBoundary = (ch: string): boolean => /\s/.test(ch) || ch === '-' || ch === '_';
const isAsciiLetter = (ch: string): boolean => (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
const isLetter = (ch: string): boolean => /\p{L}/u.test(ch);
const isDigit = (ch: string): boolean => ch >= '0' && ch <= '9';

// encodeURIComponent leaves !'()*.~ untouched, but for a slug we want every
// special character encoded, so escape those stragglers too.
const percentEncode = (ch: string): string =>
	encodeURIComponent(ch).replace(
		/[!'()*.~]/g,
		(c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
	);

export function getSlug(text: string, options: SlugOptions = {}): string {
	const {
		separator = '-',
		includeNumbers = true,
		includeSpecial = false,
		uppercase = false,
		includeNonLatin = true,
		baseUrl = ''
	} = options;

	if (typeof text !== 'string' || text.trim() === '') {
		return '';
	}

	const trimmed = text.trim();
	const source = uppercase ? trimmed.toUpperCase() : trimmed.toLowerCase();

	// Build the slug word by word. Letters (incl. non-Latin like Korean) are kept
	// as-is; non-Latin letters, digits and special characters are gated by options.
	const words: string[] = [];
	let current = '';
	const flush = (): void => {
		if (current) {
			words.push(current);
			current = '';
		}
	};

	for (const ch of source) {
		if (isBoundary(ch)) {
			flush();
		} else if (isAsciiLetter(ch)) {
			current += ch;
		} else if (isLetter(ch)) {
			if (includeNonLatin) current += ch;
		} else if (isDigit(ch)) {
			if (includeNumbers) current += ch;
		} else if (includeSpecial) {
			current += percentEncode(ch);
		}
	}
	flush();

	const slug = words.join(separator);

	if (!slug) {
		return '';
	}

	// Prepend the base URL as-is (no protocol required) when one is provided.
	const base = baseUrl.trim();

	if (!base) {
		return slug;
	}

	return `${base.replace(/\/+$/, '')}/${slug}`;
}
