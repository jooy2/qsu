import re


def isEmail(email: str, onlyLowerCase: bool = False) -> bool:
	# RFC2822 Email Validation
	char = 'a-z' if onlyLowerCase else 'a-zA-Z'

	pattern = (
		r"^[" + char + r"0-9!#$%&'*+/=?^_`{|}~-]+"
		r"(?:\.[" + char + r"0-9!#$%&'*+/=?^_`{|}~-]+)*"
		r"@(?:[" + char + r"0-9](?:[" + char + r"0-9-]*[" + char + r"0-9])?\.)+"
		r"[" + char + r"0-9](?:[" + char + r"0-9-]*[" + char + r"0-9])?$"
	)

	return re.search(pattern, email) is not None
