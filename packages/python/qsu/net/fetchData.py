import json
import urllib.request
import urllib.error

from ..string.urlJoin import urlJoin
from ..object.objToQueryString import objToQueryString


def _generateDefaultRequestHeader(opt):
	contentType = None

	headers = opt.get('headers') or {}

	if headers.get('Content-Type'):
		contentType = headers.get('Content-Type')
	else:
		bodyType = opt.get('bodyType')

		if bodyType == 'form-data':
			contentType = 'multipart/form-data'
		elif bodyType == 'x-www-form-urlencoded':
			contentType = 'application/x-www-form-urlencoded'
		elif bodyType == 'json':
			contentType = 'application/json;charset=UTF-8'
		elif bodyType == 'text':
			contentType = 'plain/text;charset=UTF-8'
		else:
			contentType = None

	result = {}

	auth = opt.get('auth') or {}

	if auth.get('bearer') and len(auth.get('bearer')) > 0:
		result['Authorization'] = f"Bearer {auth.get('bearer')}"
	if auth.get('apiKey') and len(auth.get('apiKey')) > 0:
		result['x-API-key'] = auth.get('apiKey')

	if contentType:
		result['Content-Type'] = contentType

	result['Accept-Encoding'] = 'gzip, deflate, br'
	result['Charset'] = 'utf-8'

	for key in headers.keys():
		result[key] = headers[key]

	return result


def _isFileResponse(contentType: str, contentDisposition: str) -> bool:
	import re

	if re.search(r'attachment|filename=', contentDisposition, re.IGNORECASE):
		return True

	mime = (contentType.split(';')[0].strip().lower()) if contentType else ''

	textTypes = [
		'text/html',
		'text/css',
		'text/javascript',
		'application/json',
		'application/ld+json',
		'application/xml',
		'text/xml',
		'text/plain',
	]

	if any(mime == t for t in textTypes) or mime.startswith('text/'):
		return False

	return (
		mime.startswith('application/')
		or mime.startswith('image/')
		or mime.startswith('video/')
		or mime.startswith('audio/')
		or mime.startswith('font/')
	)


def fetchData(url: str, options=None):
	opt = options or {}
	queryString = (
		f'?{objToQueryString(opt.get("queryParameters"))}'
		if opt.get('queryParameters')
		else None
	)
	bodyData = None

	if len(url) < 1:
		raise ValueError('`url` is required')

	if opt.get('body'):
		bodyType = opt.get('bodyType')

		if bodyType == 'x-www-form-urlencoded':
			bodyData = objToQueryString(opt.get('body'))
		elif bodyType == 'form-data':
			bodyData = opt.get('body')
		else:
			bodyData = json.dumps(opt.get('body'))

	if opt.get('method') and (
		opt.get('get')
		or opt.get('post')
		or opt.get('put')
		or opt.get('delete')
		or opt.get('patch')
	):
		raise ValueError(
			'`method` and `get|post|put|delete|patch` cannot be used together'
		)

	if opt.get('get'):
		method = 'GET'
	elif opt.get('post'):
		method = 'POST'
	elif opt.get('put'):
		method = 'PUT'
	elif opt.get('delete'):
		method = 'DELETE'
	elif opt.get('patch'):
		method = 'PATCH'
	else:
		method = (opt.get('method') or 'GET').upper()

	if not opt.get('host') and not url.startswith('/'):
		raise ValueError('`url` must begin with `/`.')

	if opt.get('host') and len(opt.get('host')) > 0:
		if url.startswith('http') or '://' in url:
			raise ValueError('If `host` is specified, `url` must begin with `/`.')

		fullRequestUrl = urlJoin(opt.get('host'), url)
	else:
		fullRequestUrl = url

	try:
		requestUrl = urlJoin(fullRequestUrl, queryString)

		data = None

		if bodyData is not None:
			data = (
				bodyData.encode('utf-8')
				if isinstance(bodyData, str)
				else bodyData
			)

		request = urllib.request.Request(
			requestUrl,
			data=data,
			method=method,
			headers=_generateDefaultRequestHeader(opt),
		)

		timeout = opt.get('timeout')
		timeoutSeconds = (timeout / 1000) if timeout else None

		with urllib.request.urlopen(request, timeout=timeoutSeconds) as response:
			status = response.status
			rawBody = response.read()

			if status < 200 or status >= 300 or status == 204 or not rawBody:
				return None

			responseContentType = response.headers.get('content-type') or ''
			contentDisposition = response.headers.get('content-disposition') or ''
			isFile = _isFileResponse(responseContentType, contentDisposition)

			if opt.get('toStream'):
				return rawBody
			elif isFile:
				return rawBody
			elif len(responseContentType) < 1:
				return rawBody.decode('utf-8')
			elif 'application/json' in responseContentType:
				return json.loads(rawBody.decode('utf-8'))
			else:
				return rawBody.decode('utf-8')
	except Exception as error:
		if opt.get('onError'):
			opt.get('onError')(error)

		return None
