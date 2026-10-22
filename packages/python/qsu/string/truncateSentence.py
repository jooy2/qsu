from typing import List, Optional, Union

# The full stop as each script writes it: ASCII, the CJK ideographic full stop and its
# fullwidth and halfwidth forms. `!` and `?` are deliberately left out — an ASCII `!` has
# never ended a sentence here, so accepting `！` would split the same text differently
# depending on the script it is written in. Pass them explicitly to opt in.
_DEFAULT_SENTENCE_ENDS = ['.', '。', '．', '｡']


def truncateSentence(
	str: str,
	minLength: int,
	sentenceEnds: Optional[Union[str, List[str]]] = None,
) -> str:
	if not str:
		return ''

	if len(str) <= minLength:
		return str

	if sentenceEnds is None:
		given = _DEFAULT_SENTENCE_ENDS
	elif isinstance(sentenceEnds, (list, tuple)):
		given = list(sentenceEnds)
	else:
		given = [sentenceEnds]

	# Longest first, so an ending character that starts with another one (`.` next to `...`)
	# is matched whole instead of being cut short by the shorter one.
	endStrings = sorted(
		(endString for endString in given if endString), key=len, reverse=True
	)

	if not endStrings:
		return str

	strLength = len(str)
	index = 0

	while index < strLength:
		matched = next(
			(
				endString
				for endString in endStrings
				if str.startswith(endString, index)
			),
			None,
		)

		if matched is None:
			index += 1
			continue

		index += len(matched)

		# The sentence that crosses `minLength` is still kept whole.
		if index >= minLength:
			return str[:index]

	# Every sentence fit within `minLength`, so whatever trails the last ending character
	# is kept as well.
	return str
