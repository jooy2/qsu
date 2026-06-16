import re


def getGroupKeys(
	str: str, groupStart: str, groupEnd: str, ignoreValidation: bool = False
) -> list:
	if not str:
		return []
	if not groupStart or not groupEnd:
		raise ValueError('`groupStart` and `groupEnd` must be non-empty.')
	if groupStart == groupEnd:
		raise ValueError('`groupStart` and `groupEnd` must be different.')
	if len(groupStart) == 1 and len(groupEnd) != 1:
		raise ValueError(
			'When `groupStart` is a single character, `groupEnd` must also be a single character.'
		)
	if len(groupEnd) == 1 and len(groupStart) != 1:
		raise ValueError(
			'When `groupEnd` is a single character, `groupStart` must also be a single character.'
		)

	out = []
	n = len(str)
	sLen = len(groupStart)
	eLen = len(groupEnd)

	def isEscapedAt(idx):
		bs = 0
		k = idx - 1
		while k >= 0 and str[k] == '\\':
			bs += 1
			k -= 1
		return bs % 2 == 1

	isSingle = sLen == 1 and eLen == 1
	sCh = groupStart if isSingle else ''
	eCh = groupEnd if isSingle else ''

	def isValidStartAt(i):
		if i < 0 or i + sLen > n:
			return False
		if str[i : i + sLen] != groupStart:
			return False
		if isEscapedAt(i):
			return False
		if isSingle:
			if i > 0 and str[i - 1] == sCh:
				return False
			if i + 1 < n and str[i + 1] == sCh:
				return False
		return True

	def isValidEndAt(j):
		if j < 0 or j + eLen > n:
			return False
		if str[j : j + eLen] != groupEnd:
			return False
		if isEscapedAt(j):
			return False
		if isSingle:
			if j > 0 and str[j - 1] == eCh:
				return False
			if j + 1 < n and str[j + 1] == eCh:
				return False
		return True

	def isValidKey(key):
		if '\n' in key or '\r' in key:
			return False
		if groupStart in key or groupEnd in key:
			return False
		if ignoreValidation:
			return True
		return re.fullmatch(r'[A-Za-z0-9_$-]*', key) is not None

	i = 0
	while i <= n - sLen:
		if not isValidStartAt(i):
			i += 1
			continue

		begin = i + sLen
		endAt = -1

		j = begin
		while j <= n - eLen:
			if isValidEndAt(j):
				endAt = j
				break
			j += 1

		if endAt == -1:
			i += 1
			continue

		key = str[begin:endAt]
		if isValidKey(key):
			out.append(key)

		i = endAt + eLen - 1
		i += 1

	return out
