// Hangul jamo tables, used to rebuild syllables from decomposed input
// ('ㅁㅓㅇㅊㅓㅇ' -> '멍청').
const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
const JONG = ' ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ';

const JUNG_COMPOUND: Record<string, string> = {
	ㅗㅏ: 'ㅘ',
	ㅗㅐ: 'ㅙ',
	ㅗㅣ: 'ㅚ',
	ㅜㅓ: 'ㅝ',
	ㅜㅔ: 'ㅞ',
	ㅜㅣ: 'ㅟ',
	ㅡㅣ: 'ㅢ'
};

const JONG_COMPOUND: Record<string, string> = {
	ㄱㅅ: 'ㄳ',
	ㄴㅈ: 'ㄵ',
	ㄴㅎ: 'ㄶ',
	ㄹㄱ: 'ㄺ',
	ㄹㅁ: 'ㄻ',
	ㄹㅂ: 'ㄼ',
	ㄹㅅ: 'ㄽ',
	ㄹㅌ: 'ㄾ',
	ㄹㅍ: 'ㄿ',
	ㄹㅎ: 'ㅀ',
	ㅂㅅ: 'ㅄ'
};

// Latin letters borrowed as Hangul vowels for their shape ('ㅂr보' -> '바보').
const LATIN_JUNG: Record<string, string> = { r: 'ㅏ', i: 'ㅣ' };

// Characters that imitate a letter are folded onto the first character of their
// group, so leetspeak, accents and Cyrillic/Greek homoglyphs all collapse onto
// the same text ('f00l' and 'foo1' both become 'fooi', just like 'fool').
const CHAR_GROUPS = [
	'a4àáâãäåāăąаα',
	'b8вβ',
	'cçćčс',
	'dďđ',
	'e3èéêëēĕėęěеёε',
	'g9ğ',
	'hн',
	'i1lìíîïīįıłіι',
	'jј',
	'kкκ',
	'mм',
	'nñńň',
	'o0òóôõöøōőоο',
	'pрρ',
	's5śšşѕ',
	't7ţťтτ',
	'uùúûüūůűų',
	'xхχ',
	'yýÿу',
	'zźżž'
];

// Symbols are ambiguous: they may stand for a letter ('a$$') or merely break a
// word up ('ad$min'), so the text is scanned once with them read as letters and
// once with them removed.
const SYMBOL_GROUPS = ['a@', 'c¢', 'e€£', 'i!|¡', 's$§', 't+', 'o°'];

const buildMap = (groups: string[]): Record<string, string> => {
	const map: Record<string, string> = {};

	for (const group of groups) {
		for (const ch of group.slice(1)) map[ch] = group[0];
	}

	return map;
};

const CHAR_MAP = buildMap(CHAR_GROUPS);
const SYMBOL_MAP = buildMap(SYMBOL_GROUPS);
const ALPHANUMERIC = /[\p{L}\p{N}]/u;

const isJung = (ch: string | undefined): boolean =>
	ch !== undefined && (JUNG.includes(ch) || LATIN_JUNG[ch] !== undefined);

// Puts loose jamo back together. A consonant is only taken as a final when it is
// not the lead of the next syllable ('ㅂㅏㅂㅗ' -> '바보', not '밥ㅗ').
const composeHangul = (chars: string[]): string => {
	const out: string[] = [];
	const len = chars.length;
	let i = 0;

	while (i < len) {
		const lead = CHO.indexOf(chars[i]);
		let j = i + 1;
		let vowel = j < len ? JUNG.indexOf(LATIN_JUNG[chars[j]] ?? chars[j]) : -1;

		if (lead === -1 || vowel === -1) {
			out.push(chars[i]);
			i += 1;
			continue;
		}

		j += 1;

		const vowelCompound = j < len ? JUNG_COMPOUND[JUNG[vowel] + chars[j]] : undefined;

		if (vowelCompound !== undefined) {
			vowel = JUNG.indexOf(vowelCompound);
			j += 1;
		}

		let tail = j < len && !isJung(chars[j + 1]) ? Math.max(JONG.indexOf(chars[j]), 0) : 0;

		if (tail > 0) {
			j += 1;

			const tailCompound = j < len ? JONG_COMPOUND[JONG[tail] + chars[j]] : undefined;

			if (tailCompound !== undefined && !isJung(chars[j + 1])) {
				tail = JONG.indexOf(tailCompound);
				j += 1;
			}
		}

		out.push(String.fromCharCode(0xac00 + (lead * 21 + vowel) * 28 + tail));
		i = j;
	}

	return out.join('');
};

const normalize = (text: string, readSymbols: boolean): string => {
	const chars: string[] = [];

	for (const raw of text.toLowerCase()) {
		let ch = raw;
		const code = ch.codePointAt(0) as number;

		if (code >= 0xff01 && code <= 0xff5e) {
			// Fullwidth ASCII ('ａｄｍｉｎ').
			ch = String.fromCharCode(code - 0xfee0).toLowerCase();
		} else if (code >= 0x1100 && code <= 0x1112) {
			// Conjoining jamo (decomposed Hangul) to compatibility jamo.
			ch = CHO[code - 0x1100];
		} else if (code >= 0x1161 && code <= 0x1175) {
			ch = JUNG[code - 0x1161];
		} else if (code >= 0x11a8 && code <= 0x11c2) {
			ch = JONG[code - 0x11a7];
		}

		if (CHAR_MAP[ch] !== undefined) chars.push(CHAR_MAP[ch]);
		else if (ALPHANUMERIC.test(ch)) chars.push(ch);
		else if (readSymbols && SYMBOL_MAP[ch] !== undefined) chars.push(SYMBOL_MAP[ch]);
	}

	// 'ㅇ' sitting next to Latin letters is meant as an 'o' ('fㅇㅇl' -> 'fool'),
	// so it is read that way before it can be composed into a syllable.
	for (let i = 1, iLen = chars.length; i < iLen; i += 1) {
		if (chars[i] === 'ㅇ' && chars[i - 1] >= 'a' && chars[i - 1] <= 'z') chars[i] = 'o';
	}

	// Whatever 'ㅇ' is left over after composing is a lookalike of 'o' as well.
	return composeHangul(chars).replace(/ㅇ/g, 'o');
};

// A match may run over the space between two tokens ('ad min'), but only when it
// starts where a token starts. That keeps 'admin' out of 'read min' and, in
// Korean, keeps '사과' out of '이거사 과일이야'.
const isAligned = (at: number, length: number, starts: number[], ends: number[]): boolean => {
	for (let i = 0, iLen = starts.length; i < iLen; i += 1) {
		if (at >= starts[i] && at < ends[i]) return at === starts[i] || at + length <= ends[i];
	}

	return false;
};

export function hasBadWords(str: string, words: string[] = []): boolean {
	if (!str || !words || words.length === 0) return false;

	const targets: string[] = [];

	for (const word of words) {
		if (typeof word !== 'string') continue;

		const target = normalize(word, true);

		if (target) targets.push(target);
	}

	if (targets.length === 0) return false;

	const tokens = str.split(/\s+/).filter((token) => token !== '');

	for (const readSymbols of [true, false]) {
		const starts: number[] = [];
		const ends: number[] = [];
		let joined = '';

		for (const token of tokens) {
			const normalized = normalize(token, readSymbols);

			if (!normalized) continue;

			starts.push(joined.length);
			joined += normalized;
			ends.push(joined.length);
		}

		for (const target of targets) {
			let at = joined.indexOf(target);

			while (at !== -1) {
				if (isAligned(at, target.length, starts, ends)) return true;

				at = joined.indexOf(target, at + 1);
			}
		}
	}

	return false;
}
