import re
from typing import List, Union


def isMatchPathname(pathname: str, matcher: Union[str, List[str]]) -> bool:
	if not pathname or not matcher or (matcher is not None and len(matcher) < 1):
		raise ValueError('`url` and `matcher` must be set')

	matcherSet = [matcher] if isinstance(matcher, str) else matcher
	realPathname = re.sub(r'/$', '', pathname.split('?')[0])

	for m in matcherSet:
		if m == '*' or m == '/*':
			return True

		realMatcher = re.sub(r'\*$', '', m)

		if m.endswith('*'):
			if realPathname.startswith(realMatcher):
				return True
		elif realMatcher == realPathname:
			return True

	return False
