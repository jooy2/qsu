// Compiled once. The set is the union of the characters that are special *outside* a
// character class in JavaScript, Dart and Python: all three read `^ $ . * + ? ( ) [ ] { } |`
// and `\` as syntax. `-` and `#` are special only inside a character class or in Python's
// verbose mode, and `\-` outside a class is itself a syntax error in JavaScript's unicode
// mode, so they are left alone.
const REGEXP_SPECIAL_CHARACTERS = /[\\^$.*+?()[\]{}|]/g;

export function escapeRegExp(str: string): string {
	if (!str) {
		return '';
	}

	return str.replace(REGEXP_SPECIAL_CHARACTERS, '\\$&');
}
