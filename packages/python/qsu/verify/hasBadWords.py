# Hangul jamo tables, used to rebuild syllables from decomposed input
# ('ㅁㅓㅇㅊㅓㅇ' -> '멍청').
_CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
_JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'
_JONG = ' ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'

_JUNG_COMPOUND = {
	'ㅗㅏ': 'ㅘ',
	'ㅗㅐ': 'ㅙ',
	'ㅗㅣ': 'ㅚ',
	'ㅜㅓ': 'ㅝ',
	'ㅜㅔ': 'ㅞ',
	'ㅜㅣ': 'ㅟ',
	'ㅡㅣ': 'ㅢ',
}

_JONG_COMPOUND = {
	'ㄱㅅ': 'ㄳ',
	'ㄴㅈ': 'ㄵ',
	'ㄴㅎ': 'ㄶ',
	'ㄹㄱ': 'ㄺ',
	'ㄹㅁ': 'ㄻ',
	'ㄹㅂ': 'ㄼ',
	'ㄹㅅ': 'ㄽ',
	'ㄹㅌ': 'ㄾ',
	'ㄹㅍ': 'ㄿ',
	'ㄹㅎ': 'ㅀ',
	'ㅂㅅ': 'ㅄ',
}

# Latin letters borrowed as Hangul vowels for their shape ('ㅂr보' -> '바보').
_LATIN_JUNG = {'r': 'ㅏ', 'i': 'ㅣ'}

# Characters that imitate a letter are folded onto the first character of their
# group, so leetspeak, accents and Cyrillic/Greek homoglyphs all collapse onto
# the same text ('f00l' and 'foo1' both become 'fooi', just like 'fool').
_CHAR_GROUPS = [
	'a4àáâãäåāăąаα',
	'b8вβ',
	'cçćčс',
	'dďđ',
	'e3èéêëēĕėęěеёε',
	'g69ğ',
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
	'z2źżž',
]

# Symbols are ambiguous: they may stand for a letter ('a$$') or merely break a
# word up ('ad$min'), so the text is scanned once with them read as letters and
# once with them removed.
_SYMBOL_GROUPS = ['a@', 'c¢(', 'e€£', 'i!|¡/', 's$§', 't+', 'o°']


def _build_map(groups: list) -> dict:
	built = {}

	for group in groups:
		for ch in group[1:]:
			built[ch] = group[0]

	return built


# Stylized Latin letters that keep their shape: circled ('ⓐ') and the
# Mathematical Alphanumeric blocks with no gaps ('𝐚', '𝗮', '𝘢', '𝚊'). Every
# block holds A-Z followed by a-z, so one offset per block is enough.
_STYLIZED_BLOCKS = [
	0x24B6,
	0x1D400,
	0x1D434,
	0x1D468,
	0x1D5A0,
	0x1D5D4,
	0x1D608,
	0x1D63C,
	0x1D670,
]


def _from_stylized(code: int):
	for start in _STYLIZED_BLOCKS:
		if start <= code <= start + 51:
			return chr(0x61 + (code - start) % 26)

	return None


_CHAR_MAP = _build_map(_CHAR_GROUPS)
_SYMBOL_MAP = _build_map(_SYMBOL_GROUPS)


def _char_at(chars: list, index: int):
	return chars[index] if 0 <= index < len(chars) else None


def _is_jung(ch) -> bool:
	return ch is not None and (ch in _JUNG or ch in _LATIN_JUNG)


def _compose_hangul(chars: list) -> str:
	"""Puts loose jamo back together. A consonant is only taken as a final when
	it is not the lead of the next syllable ('ㅂㅏㅂㅗ' -> '바보', not '밥ㅗ')."""
	out = []
	length = len(chars)
	i = 0

	while i < length:
		lead = _CHO.find(chars[i])
		j = i + 1
		nextChar = _char_at(chars, j)
		vowel = _JUNG.find(_LATIN_JUNG.get(nextChar, nextChar)) if nextChar else -1

		if lead == -1 or vowel == -1:
			out.append(chars[i])
			i += 1
			continue

		j += 1
		vowelCompound = (
			_JUNG_COMPOUND.get(_JUNG[vowel] + chars[j]) if j < length else None
		)

		if vowelCompound is not None:
			vowel = _JUNG.find(vowelCompound)
			j += 1

		tail = (
			max(_JONG.find(chars[j]), 0)
			if j < length and not _is_jung(_char_at(chars, j + 1))
			else 0
		)

		if tail > 0:
			j += 1
			tailCompound = (
				_JONG_COMPOUND.get(_JONG[tail] + chars[j]) if j < length else None
			)

			if tailCompound is not None and not _is_jung(_char_at(chars, j + 1)):
				tail = _JONG.find(tailCompound)
				j += 1

		out.append(chr(0xAC00 + (lead * 21 + vowel) * 28 + tail))
		i = j

	return ''.join(out)


def _without_inner_digits(chars: list, digits: list) -> list:
	"""Digits wedged between two other characters ('바1보', 'ad1min') usually just
	break a word up, so the text is read once more with them removed. A digit that
	opens or closes a word is kept, so a counted noun ('2시 발표') keeps its number
	— a banned word that merely carries a digit around ('바보1') is still found
	inside the word anyway."""
	out = []
	length = len(chars)
	i = 0

	while i < length:
		if not digits[i]:
			out.append(chars[i])
			i += 1
			continue

		j = i

		while j < length and digits[j]:
			j += 1

		if i == 0 or j == length:
			out.extend(chars[i:j])

		i = j

	return out


def _normalize(text: str, readSymbols: bool, dropDigits: bool) -> str:
	chars = []
	digits = []

	for raw in text.lower():
		ch = raw
		code = ord(ch)

		if 0xFF01 <= code <= 0xFF5E:
			# Fullwidth ASCII ('ａｄｍｉｎ').
			ch = chr(code - 0xFEE0).lower()
		elif 0x1100 <= code <= 0x1112:
			# Conjoining jamo (decomposed Hangul) to compatibility jamo.
			ch = _CHO[code - 0x1100]
		elif 0x1161 <= code <= 0x1175:
			ch = _JUNG[code - 0x1161]
		elif 0x11A8 <= code <= 0x11C2:
			ch = _JONG[code - 0x11A7]
		elif code >= 0x24B6:
			# Circled or Mathematical Alphanumeric letter ('ⓐ', '𝗮').
			ch = _from_stylized(code) or ch

		isDigit = '0' <= ch <= '9'

		if ch in _CHAR_MAP:
			chars.append(_CHAR_MAP[ch])
			digits.append(isDigit)
		elif ch.isalnum():
			chars.append(ch)
			digits.append(isDigit)
		elif readSymbols and ch in _SYMBOL_MAP:
			chars.append(_SYMBOL_MAP[ch])
			digits.append(False)

	read = _without_inner_digits(chars, digits) if dropDigits else chars

	# 'ㅇ' sitting next to Latin letters is meant as an 'o' ('fㅇㅇl' -> 'fool'),
	# so it is read that way before it can be composed into a syllable.
	for i in range(1, len(read)):
		if read[i] == 'ㅇ' and 'a' <= read[i - 1] <= 'z':
			read[i] = 'o'

	# Whatever 'ㅇ' is left over after composing is a lookalike of 'o' as well.
	return _compose_hangul(read).replace('ㅇ', 'o')


def _normalize_all(words: list) -> list:
	normalized = []

	for word in words:
		if not isinstance(word, str):
			continue

		target = _normalize(word, True, False)

		if target:
			normalized.append(target)

	return normalized


# Every way the text is read, as (readSymbols, dropDigits). Symbols and digits
# are both ambiguous — they may stand for a letter or merely break a word up —
# so each combination gets a scan of its own.
_READINGS = ((True, False), (False, False), (True, True), (False, True))


# Allowed words are blanked out with a character normalization never produces,
# so a banned word can no longer be found inside them. Blanking keeps the text
# length intact, which the token positions depend on.
_MASK = ' '


def _is_aligned(at: int, length: int, starts: list, ends: list) -> bool:
	"""A match may run over the space between two tokens ('ad min'), but only
	when it starts where a token starts. That keeps 'admin' out of 'read min'
	and, in Korean, keeps '사과' out of '이거사 과일이야'."""
	for i in range(len(starts)):
		if starts[i] <= at < ends[i]:
			return at == starts[i] or at + length <= ends[i]

	return False


def hasBadWords(str: str, words: list = None, allowWords: list = None) -> bool:
	if not str or not words:
		return False

	targets = _normalize_all(words)

	if not targets:
		return False

	allowed = _normalize_all(allowWords) if allowWords else []
	tokens = str.split()

	for readSymbols, dropDigits in _READINGS:
		starts = []
		ends = []
		joined = ''

		for token in tokens:
			normalized = _normalize(token, readSymbols, dropDigits)

			if not normalized:
				continue

			starts.append(len(joined))
			joined += normalized
			ends.append(len(joined))

		for term in allowed:
			at = joined.find(term)

			while at != -1:
				joined = joined[:at] + _MASK * len(term) + joined[at + len(term) :]
				at = joined.find(term, at + len(term))

		for target in targets:
			at = joined.find(target)

			while at != -1:
				if _is_aligned(at, len(target), starts, ends):
					return True

				at = joined.find(target, at + 1)

	return False
