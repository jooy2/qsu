import unicodedata


def _isDigit(char: str) -> bool:
	return '0' <= char <= '9'


def _isLetter(char: str) -> bool:
	return char.isalpha()


def _isMark(char: str) -> bool:
	# A combining mark belongs to the letter in front of it, so a decomposed `é` (`e` plus
	# U+0301) is not cut in two.
	return unicodedata.category(char)[0] == 'M'


def _isUpper(char: str) -> bool:
	# Case is read out of the Unicode general category rather than out of `upper()`. Dart
	# maps `ß` to itself where JavaScript and Python map it to `SS`, so asking whether the
	# mapped form differs answered differently per language and split `ßtraße` into four
	# words.
	return unicodedata.category(char) in ('Lu', 'Lt')


def _isLower(char: str) -> bool:
	return unicodedata.category(char) == 'Ll'


def _hasCase(char: str) -> bool:
	return _isUpper(char) or _isLower(char)


def words(str: str) -> list:
	if not str:
		return []

	chars = list(str)
	charsLength = len(chars)
	result = []
	i = 0

	while i < charsLength:
		char = chars[i]
		end = i + 1

		if _isDigit(char):
			while end < charsLength and _isDigit(chars[end]):
				end += 1

			result.append(''.join(chars[i:end]))
			i = end
			continue

		if not _isLetter(char):
			i += 1
			continue

		if not _hasCase(char):
			# Hangul, CJK, Thai and the like carry no case, so no camelCase boundary applies.
			while end < charsLength and (
				_isMark(chars[end]) or (_isLetter(chars[end]) and not _hasCase(chars[end]))
			):
				end += 1
		elif _isUpper(char):
			while end < charsLength and _isLetter(chars[end]) and _isUpper(chars[end]):
				end += 1

			if end - i > 1:
				# `XMLHttp` is `XML` plus `Http`: the last capital of a run of capitals opens
				# the next word instead of closing this one.
				if end < charsLength and _isLetter(chars[end]) and _isLower(chars[end]):
					end -= 1
			else:
				while end < charsLength and (
					_isMark(chars[end]) or (_isLetter(chars[end]) and _isLower(chars[end]))
				):
					end += 1
		else:
			while end < charsLength and (
				_isMark(chars[end]) or (_isLetter(chars[end]) and _isLower(chars[end]))
			):
				end += 1

		result.append(''.join(chars[i:end]))
		i = end

	return result
