// Compiled once. Building a `RegExp` inside a function recompiles the pattern on every call.
const LETTER = /\p{L}/u;
const MARK = /\p{M}/u;
// Case is read out of the Unicode general category rather than out of `toUpperCase`.
// Dart maps `ß` to itself where JavaScript and Python map it to `SS`, so asking whether the
// mapped form differs answered differently per language and split `ßtraße` into four words.
const UPPER = /\p{Lu}|\p{Lt}/u;
const LOWER = /\p{Ll}/u;

const isDigit = (char: string): boolean => char >= '0' && char <= '9';

const isLetter = (char: string): boolean => LETTER.test(char);

// A combining mark belongs to the letter in front of it, so a decomposed `é` (`e` plus
// U+0301) is not cut in two.
const isMark = (char: string): boolean => MARK.test(char);

const isUpper = (char: string): boolean => UPPER.test(char);

const isLower = (char: string): boolean => LOWER.test(char);

const hasCase = (char: string): boolean => isUpper(char) || isLower(char);

export function words(str: string): string[] {
	if (!str) {
		return [];
	}

	// Walk code points. Indexing a JavaScript string walks UTF-16 units, which would cut a
	// surrogate pair in half and disagree with the Dart and Python implementations.
	const chars = Array.from(str);
	const charsLength = chars.length;
	const result: string[] = [];
	let i = 0;

	while (i < charsLength) {
		const char = chars[i];
		let end = i + 1;

		if (isDigit(char)) {
			while (end < charsLength && isDigit(chars[end])) {
				end += 1;
			}

			result.push(chars.slice(i, end).join(''));
			i = end;
			continue;
		}

		if (!isLetter(char)) {
			i += 1;
			continue;
		}

		if (!hasCase(char)) {
			// Hangul, CJK, Thai and the like carry no case, so no camelCase boundary applies.
			while (
				end < charsLength &&
				(isMark(chars[end]) || (isLetter(chars[end]) && !hasCase(chars[end])))
			) {
				end += 1;
			}
		} else if (isUpper(char)) {
			while (end < charsLength && isLetter(chars[end]) && isUpper(chars[end])) {
				end += 1;
			}

			if (end - i > 1) {
				// `XMLHttp` is `XML` plus `Http`: the last capital of a run of capitals opens
				// the next word instead of closing this one.
				if (end < charsLength && isLetter(chars[end]) && isLower(chars[end])) {
					end -= 1;
				}
			} else {
				while (
					end < charsLength &&
					(isMark(chars[end]) || (isLetter(chars[end]) && isLower(chars[end])))
				) {
					end += 1;
				}
			}
		} else {
			while (
				end < charsLength &&
				(isMark(chars[end]) || (isLetter(chars[end]) && isLower(chars[end])))
			) {
				end += 1;
			}
		}

		result.push(chars.slice(i, end).join(''));
		i = end;
	}

	return result;
}
