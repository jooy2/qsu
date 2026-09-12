/**
 * (Private, not exported from the package) Natural ordering shared by `sortNumeric` and
 * `sortByObjectKey`.
 *
 * A string is cut into runs of digits and runs of everything else, and the runs are
 * compared in three passes over the whole string, the way a collation algorithm does:
 * letters first, then the accents on them, then upper against lower case. Without the
 * passes, `Item10` would land before `item1`, because the case difference in the first
 * run would decide the order before the numbers were ever reached.
 *
 * `Intl.Collator` used to do this in JavaScript alone, which left the order depending on
 * the locale of the machine it ran on, with Dart and Python answering differently again.
 */
// `[0-9]` rather than `\\d`, which matches every Unicode digit in Python.
const DIGIT_RUN = /([0-9]+)/;
const DIGITS_ONLY = /^[0-9]+$/;
const LEADING_ZEROS = /^0+(?=\d)/;
const COMBINING = /[̀-ͯ]/g;
const NOT_COMBINING = /[^̀-ͯ]/g;
const WHITESPACE = /\s/;
const LETTER = /[\p{L}\p{M}\p{N}]/u;

// Whitespace, then punctuation and symbols, then numbers, then letters. Ranking the
// classes above the characters inside them is what puts `.gitignore` before `1file`,
// where comparing code points alone would put both after it.
const WHITESPACE_CLASS = 0;
const SYMBOL_CLASS = 1;
const NUMBER_CLASS = 2;
const LETTER_CLASS = 3;

// Only a run of ASCII digits is ever `NUMBER_CLASS`, so a class 2 run is always compared
// as a number and never as text. A digit from another script sorts among the letters.
function characterClass(character: string): number {
	if (WHITESPACE.test(character)) {
		return WHITESPACE_CLASS;
	}

	return LETTER.test(character) ? LETTER_CLASS : SYMBOL_CLASS;
}

// A run of characters sharing one class: the class, the text, and whether it is a run of
// digits, which is compared as a number rather than as text.
type Run = [number, string, boolean];

export type NaturalKey = {
	runs: Run[];
	accents: string;
	caseBits: string;
	raw: string;
};

export function naturalKey(value: unknown): NaturalKey {
	const raw = typeof value === 'string' ? value : String(value ?? '');
	const runs: Run[] = [];
	let accents = '';
	let caseBits = '';

	for (const segment of raw.split(DIGIT_RUN)) {
		if (segment === '') {
			continue;
		}

		if (DIGITS_ONLY.test(segment)) {
			// Kept as digits rather than parsed: a run longer than `Number.MAX_SAFE_INTEGER`
			// would otherwise compare equal to its neighbours.
			runs.push([NUMBER_CLASS, segment.replace(LEADING_ZEROS, ''), true]);
			continue;
		}

		const decomposed = segment.normalize('NFD');
		const letters = decomposed.replace(COMBINING, '');

		accents += decomposed.replace(NOT_COMBINING, '');

		for (const character of letters) {
			const lowered = character.toLowerCase();
			const group = characterClass(character);
			const last = runs[runs.length - 1];

			caseBits += character === lowered ? '0' : '1';

			if (last !== undefined && last[0] === group && !last[2]) {
				last[1] += lowered;
				continue;
			}

			runs.push([group, lowered, false]);
		}
	}

	return { runs, accents, caseBits, raw };
}

function compareDigits(a: string, b: string): number {
	if (a.length !== b.length) {
		return a.length < b.length ? -1 : 1;
	}

	return a < b ? -1 : a > b ? 1 : 0;
}

function compareStrings(a: string, b: string): number {
	return a < b ? -1 : a > b ? 1 : 0;
}

export function compareNaturalKey(a: NaturalKey, b: NaturalKey): number {
	const length = Math.max(a.runs.length, b.runs.length);

	for (let index = 0; index < length; index += 1) {
		const left = a.runs[index];
		const right = b.runs[index];

		if (left === undefined || right === undefined) {
			return left === undefined ? -1 : 1;
		}

		if (left[0] !== right[0]) {
			return left[0] < right[0] ? -1 : 1;
		}

		const order = left[2] ? compareDigits(left[1], right[1]) : compareStrings(left[1], right[1]);

		if (order !== 0) {
			return order;
		}
	}

	// Only reached when the letters and the numbers are the same, so an accent or a
	// capital is all that is left to separate the two.
	return (
		compareStrings(a.accents, b.accents) ||
		compareStrings(a.caseBits, b.caseBits) ||
		compareStrings(a.raw, b.raw)
	);
}

export function compareNatural(a: unknown, b: unknown): number {
	return compareNaturalKey(naturalKey(a), naturalKey(b));
}
