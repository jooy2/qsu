import type { AnyValueObject, HTTPRequestOption } from '../../_types/global';
import { objToQueryString } from '../../object/objToQueryString.js';
import { urlJoin } from '../../string/urlJoin.js';

function generateDefaultRequestHeader(httpRequestOption?: HTTPRequestOption) {
	let contentType;

	if (httpRequestOption?.headers?.['Content-Type']) {
		contentType = httpRequestOption?.headers?.['Content-Type'];
	} else {
		switch (httpRequestOption?.bodyType) {
			case 'form-data':
				contentType = 'multipart/form-data';
				break;
			case 'x-www-form-urlencoded':
				contentType = 'application/x-www-form-urlencoded';
				break;
			case 'json':
				contentType = 'application/json;charset=UTF-8';
				break;
			case 'text':
				contentType = 'plain/text;charset=UTF-8';
				break;
			default:
				contentType = null;
				break;
		}
	}

	const authHeaders: AnyValueObject = {};

	if (httpRequestOption?.auth?.bearer && httpRequestOption?.auth?.bearer.length > 0) {
		authHeaders.Authorization = `Bearer ${httpRequestOption?.auth?.bearer}`;
	}
	if (httpRequestOption?.auth?.apiKey && httpRequestOption?.auth?.apiKey.length > 0) {
		authHeaders['x-API-key'] = httpRequestOption?.auth?.apiKey;
	}

	return {
		...authHeaders,
		...httpRequestOption?.headers,
		...(contentType ? { 'Content-Type': contentType } : {}),
		'Accept-Encoding': 'gzip, deflate, br',
		Charset: 'utf-8'
	};
}

export async function fetchData(url: string, options?: HTTPRequestOption): Promise<any> {
	const opt = options || {};
	const queryString = opt.queryParameters ? `?${objToQueryString(opt.queryParameters)}` : null;
	let bodyData = null;

	if (url.length < 1) {
		throw new Error('`url` is required');
	}

	if (opt.body) {
		switch (opt.bodyType) {
			case 'x-www-form-urlencoded':
				bodyData = objToQueryString(opt.body as object);
				break;
			case 'form-data':
				bodyData = opt.body as FormData;
				break;
			case 'json':
			default:
				bodyData = JSON.stringify(opt.body as object);
				break;
		}
	}

	let method;

	if (opt.method && (opt.get || opt.post || opt.put || opt.delete || opt.patch)) {
		throw new Error('`method` and `get|post|put|delete|patch` cannot be used together');
	}

	if (opt.get) {
		method = 'GET';
	} else if (opt.post) {
		method = 'POST';
	} else if (opt.put) {
		method = 'PUT';
	} else if (opt.delete) {
		method = 'DELETE';
	} else if (opt.patch) {
		method = 'PATCH';
	} else {
		method = opt.method || 'GET';
	}

	let fullRequestUrl;

	if (!opt.host && !url.startsWith('/')) {
		throw new Error('`url` must begin with `/`.');
	}

	if (opt.host && opt.host.length > 0) {
		if (url.startsWith('http') || url.includes('://')) {
			throw new Error('If `host` is specified, `url` must begin with `/`.');
		}

		fullRequestUrl = urlJoin(opt.host, url);
	} else {
		fullRequestUrl = url;
	}

	try {
		const response = await fetch(urlJoin(fullRequestUrl, queryString), {
			...(opt.auth ? { credentials: 'include' } : {}),
			method,
			body: bodyData,
			headers: opt.headers || generateDefaultRequestHeader(opt)
		});

		if (!response.ok || !response.body) {
			return null;
		}

		const responseContentType = response.headers.get('content-type');

		if (!responseContentType) {
			return await response.text();
		} else if (responseContentType.includes('application/json')) {
			return await response.json();
		} else {
			return await response.text();
		}
	} catch (error: any) {
		if (opt.onError) {
			opt.onError(error);
		}

		return null;
	}
}
