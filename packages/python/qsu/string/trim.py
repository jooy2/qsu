import re
from typing import Optional

def trim(str: Optional[str] = None):
	# Reject anything that is not a string. The previous `and` meant a truthy non-string
	# slipped through and raised an AttributeError on `.strip()`. An empty string is a
	# valid input and still returns ''.
	if not isinstance(str, type('')):
		return None

	return re.sub(r'\s{2,}', ' ', str.strip())
