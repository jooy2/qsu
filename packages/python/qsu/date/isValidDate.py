import re

_FORMAT_RE = re.compile(r'^[0-9]{4}-[0-9]{2}-[0-9]{2}$')

# Support range: 1600-01-01 ~ 9999/12/31
_VALID_RE = re.compile(
	r'^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:1[6-9]|[2-9]\d)?'
	r'(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)(?:\x20|$))|'
	r'(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d'
	r'(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|'
	r'([01]\d|2[0-3])(:[0-5]\d){1,2})?$'
)


def isValidDate(dateYYYYMMDD: str) -> bool:
	if not _FORMAT_RE.match(dateYYYYMMDD):
		raise ValueError("The date format must be 'YYYY-MM-DD'")

	converted_date = dateYYYYMMDD.split('-')

	candidate = (
		f'{int(converted_date[2], 10)}-'
		f'{int(converted_date[1], 10)}-'
		f'{int(converted_date[0], 10)}'
	)

	return bool(_VALID_RE.match(candidate))
