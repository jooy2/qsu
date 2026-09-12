import re
import unicodedata

# Natural ordering shared with `sortByObjectKey`.
#
# A string is cut into runs of digits and runs of everything else, and the runs are
# compared in three passes over the whole string, the way a collation algorithm does:
# letters first, then the accents on them, then upper against lower case. Without the
# passes, `Item10` would land before `item1`, because the case difference in the first
# run would decide the order before the numbers were ever reached.

# `[0-9]` rather than `\d`, which matches every Unicode digit in Python.
_DIGIT_RUN = re.compile(r'([0-9]+)')
_DIGITS_ONLY = re.compile(r'^[0-9]+$')

# Whitespace, then punctuation and symbols, then numbers, then letters. Ranking the
# classes above the characters inside them is what puts `.gitignore` before `1file`,
# where comparing code points alone would put both after it.
_WHITESPACE_CLASS = 0
_SYMBOL_CLASS = 1
_NUMBER_CLASS = 2
_LETTER_CLASS = 3


# Only a run of ASCII digits is ever `_NUMBER_CLASS`, so a class 2 run is always compared
# as a number and never as text. A digit from another script sorts among the letters.
def _characterClass(character: str) -> int:
	if character.isspace():
		return _WHITESPACE_CLASS

	category = unicodedata.category(character)

	if category.startswith('L') or category.startswith('M') or category.startswith('N'):
		return _LETTER_CLASS

	return _SYMBOL_CLASS


def _naturalKey(value) -> tuple:
	raw = value if isinstance(value, str) else ('' if value is None else str(value))
	runs: list = []
	accents = ''
	caseBits = ''

	for segment in _DIGIT_RUN.split(raw):
		if segment == '':
			continue

		if _DIGITS_ONLY.match(segment):
			# Kept as digits rather than parsed, so that the length decides first and a run
			# of any size stays exact.
			stripped = segment.lstrip('0') or '0'
			runs.append((_NUMBER_CLASS, (len(stripped), stripped)))
			continue

		decomposed = unicodedata.normalize('NFD', segment)
		letters = ''.join(c for c in decomposed if not unicodedata.combining(c))

		accents += ''.join(c for c in decomposed if unicodedata.combining(c))

		for character in letters:
			lowered = character.lower()
			group = _characterClass(character)

			caseBits += '0' if character == lowered else '1'

			if runs and runs[-1][0] == group and group != _NUMBER_CLASS:
				runs[-1] = (group, runs[-1][1] + lowered)
				continue

			runs.append((group, lowered))

	return (tuple(runs), accents, caseBits, raw)


def sortNumeric(array: list, descending: bool = False) -> list:
	# Sort a copy: `list.sort` reorders in place. Use `reverse=` rather than reversing the
	# result, which would also flip the order of equal elements.
	return sorted(array, key=_naturalKey, reverse=descending)
