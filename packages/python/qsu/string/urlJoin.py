import re


def urlJoin(*args) -> str:
	if not args:
		return ''

	urlResult = ''
	joinCount = 0

	for arg in args:
		if arg is not None:
			value = arg if isinstance(arg, type('')) else f'{arg}'

			if (
				joinCount == 0
				or value.startswith('/')
				or value.startswith('?')
				or value.startswith('&')
			):
				urlResult += value
			else:
				urlResult += '/' + value

			joinCount += 1

	return re.sub(r'/$', '', urlResult)
