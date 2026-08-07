def _capitalizeWord(word: str) -> str:
	"""(Private) Uppercase the first character of a word and lowercase the rest, so `XML`
	becomes `Xml`.

	This is not `str.capitalize`, which titlecases the first character rather than
	uppercasing it, and it is not the public `capitalizeFirst`, which leaves the rest of
	the string alone.
	"""
	if not word:
		return ''

	return word[0].upper() + word[1:].lower()
