import re
from typing import List, Union
from urllib.parse import urlsplit


def removeLocalePrefix(urlOrPathname: str, locales: Union[str, List[str]]) -> str:
	localeLists = locales if isinstance(locales, list) else [locales]

	if re.sub(r'^/', '', urlOrPathname) in localeLists:
		return ''

	if urlOrPathname == '/':
		return '/'

	joinLocaleLists = '|'.join(localeLists)

	parsed = urlsplit(urlOrPathname)

	if parsed.scheme and parsed.netloc:
		origin = f'{parsed.scheme}://{parsed.netloc}'
		pathname = parsed.path if parsed.path else '/'

		if pathname == '/' or re.sub(r'^/', '', pathname) in localeLists:
			return origin

		newPathname = re.sub(rf'^/({joinLocaleLists})/', '/', pathname)
		return re.sub(r'/$', '', f'{origin}{newPathname}')

	realPathname = urlOrPathname

	if not realPathname.startswith('/'):
		realPathname = f'/{realPathname}'

	if realPathname.endswith('/'):
		realPathname = re.sub(r'/$', '', realPathname)

	if re.match(rf'^/({joinLocaleLists})$', realPathname):
		return '/'

	return re.sub(rf'^/({joinLocaleLists})/', '/', realPathname)
