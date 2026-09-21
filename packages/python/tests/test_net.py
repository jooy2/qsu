import json
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer

import pytest

from qsu.net import fetchData, parseAddress


class _Handler(BaseHTTPRequestHandler):
	def log_message(self, *args):
		pass

	def _send_json(self, status, payload):
		body = json.dumps(payload).encode('utf-8')
		self.send_response(status)
		self.send_header('Content-Type', 'application/json')
		self.send_header('Content-Length', str(len(body)))
		self.end_headers()
		self.wfile.write(body)

	def do_GET(self):
		if self.path == '/posts/1':
			self._send_json(200, {'id': 1, 'title': 'foo'})
		elif self.path.startswith('/search'):
			self._send_json(200, {'query': self.path})
		elif self.path == '/text':
			body = b'hello world'
			self.send_response(200)
			self.send_header('Content-Type', 'text/plain')
			self.send_header('Content-Length', str(len(body)))
			self.end_headers()
			self.wfile.write(body)
		elif self.path == '/empty':
			self.send_response(204)
			self.end_headers()
		else:
			self._send_json(404, {'error': 'not found'})

	def do_POST(self):
		length = int(self.headers.get('Content-Length') or 0)
		raw = self.rfile.read(length) if length else b''

		try:
			received = json.loads(raw.decode('utf-8')) if raw else {}
		except json.JSONDecodeError:
			received = {'raw': raw.decode('utf-8')}

		self._send_json(200, {'id': 101, 'received': received})


@pytest.fixture(scope='module')
def server():
	httpd = HTTPServer(('127.0.0.1', 0), _Handler)
	thread = threading.Thread(target=httpd.serve_forever, daemon=True)
	thread.start()

	host = f'http://127.0.0.1:{httpd.server_address[1]}'

	yield host

	httpd.shutdown()
	httpd.server_close()
	thread.join()


def test_fetchData_get(server):
	response = fetchData('/posts/1', {'host': server})
	assert response['id'] == 1
	assert response['title'] == 'foo'


def test_fetchData_accepts_keyword_arguments(server):
	# The options may arrive as keyword arguments instead of as a dict.
	response = fetchData('/posts/1', host=server)

	assert response['id'] == 1


def test_fetchData_post_with_json_body(server):
	response = fetchData(
		'/posts',
		{
			'post': True,
			'host': server,
			'body': {'title': 'foo', 'body': 'bar', 'userId': 1},
		},
	)
	assert response['id'] == 101
	assert response['received'] == {'title': 'foo', 'body': 'bar', 'userId': 1}


def test_fetchData_query_parameters(server):
	response = fetchData(
		'/search', {'host': server, 'queryParameters': {'q': 'hello world', 'page': 2}}
	)
	assert 'q=hello%20world' in response['query']
	assert 'page=2' in response['query']


def test_fetchData_text_response(server):
	response = fetchData('/text', {'host': server})
	assert response == 'hello world'


def test_fetchData_no_content_returns_none(server):
	response = fetchData('/empty', {'host': server})
	assert response is None


def test_fetchData_empty_url_raises():
	with pytest.raises(ValueError):
		fetchData('')


def test_fetchData_relative_url_without_host_raises():
	with pytest.raises(ValueError):
		fetchData('posts/1')


def test_fetchData_method_and_flag_conflict_raises(server):
	with pytest.raises(ValueError):
		fetchData('/posts/1', {'host': server, 'method': 'get', 'post': True})


def test_fetchData_host_with_absolute_url_raises(server):
	with pytest.raises(ValueError):
		fetchData('http://example.com/posts/1', {'host': server})


def test_fetchData_on_error_callback():
	captured = {}

	def on_error(error):
		captured['error'] = error

	response = fetchData(
		'/posts/1', {'host': 'http://127.0.0.1:1', 'onError': on_error}
	)
	assert response is None
	assert 'error' in captured


def test_parseAddress():
	# Each case: 'url' plus only the fields that differ from the defaults
	# (error, isIP and isIPv6 False, everything else None).
	cases = [
		# Full form: scheme, user, password and port.
		{'url': 'ssh://test:pass@host:1234', 'protocol': 'SSH', 'defaultPort': 22, 'host': 'host', 'hostname': 'host', 'port': 1234, 'user': 'test', 'pass': 'pass'},
		# Web URL. Missing values stay `None`, not an error.
		{'url': 'https://google.com', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'google.com', 'hostname': 'google.com'},
		# No scheme -> protocol is `None` (no SSH default).
		{'url': 'user:test@host', 'host': 'host', 'hostname': 'host', 'user': 'user', 'pass': 'test'},
		{'url': 'host:1234', 'host': 'host', 'hostname': 'host', 'port': 1234},
		{'url': '192.168.1.123:1234', 'host': '192.168.1.123', 'hostname': '192.168.1.123', 'port': 1234, 'isIP': True},
		{'url': 'hostname', 'host': 'hostname', 'hostname': 'hostname'},
		{'url': 'ssh://test@hostname', 'protocol': 'SSH', 'defaultPort': 22, 'host': 'hostname', 'hostname': 'hostname', 'user': 'test'},
		# IPv6 without brackets keeps the raw address and cannot carry a port.
		{'url': 'ssh://::1', 'protocol': 'SSH', 'defaultPort': 22, 'host': '::1', 'hostname': '::1', 'isIP': True, 'isIPv6': True},
		{'url': '::1', 'host': '::1', 'hostname': '::1', 'isIP': True, 'isIPv6': True},
		{'url': 'ssh://fe80::f9e9:1d57:9f2d:fb87', 'protocol': 'SSH', 'defaultPort': 22, 'host': 'fe80::f9e9:1d57:9f2d:fb87', 'hostname': 'fe80::f9e9:1d57:9f2d:fb87', 'isIP': True, 'isIPv6': True},
		# IPv6 with brackets keeps the brackets on `host` and drops them from `hostname`.
		{'url': 'ssh://[fe80::f9e9:1d57:9f2d:fb87]', 'protocol': 'SSH', 'defaultPort': 22, 'host': '[fe80::f9e9:1d57:9f2d:fb87]', 'hostname': 'fe80::f9e9:1d57:9f2d:fb87', 'isIP': True, 'isIPv6': True},
		{'url': '[fe80::f9e9:1d57:9f2d:fb87]:1234', 'host': '[fe80::f9e9:1d57:9f2d:fb87]', 'hostname': 'fe80::f9e9:1d57:9f2d:fb87', 'port': 1234, 'isIP': True, 'isIPv6': True},
		{'url': 'test:pass@[fe80::f9e9:1d57:9f2d:fb87]:1234', 'host': '[fe80::f9e9:1d57:9f2d:fb87]', 'hostname': 'fe80::f9e9:1d57:9f2d:fb87', 'port': 1234, 'user': 'test', 'pass': 'pass', 'isIP': True, 'isIPv6': True},
		{'url': '[::1]', 'host': '[::1]', 'hostname': '::1', 'isIP': True, 'isIPv6': True},
		{'url': '192.168.1.1', 'host': '192.168.1.1', 'hostname': '192.168.1.1', 'isIP': True},
		# Unknown scheme is parsed as-is (generic parser, no error) and has no default port.
		{'url': 'asd://192.168.1.1', 'protocol': 'ASD', 'host': '192.168.1.1', 'hostname': '192.168.1.1', 'isIP': True},
		# Scheme only: empty host is `None`, not an error.
		{'url': 'ssh://', 'protocol': 'SSH', 'defaultPort': 22},
		{'url': 'sftp://test@localhost', 'protocol': 'SFTP', 'defaultPort': 22, 'host': 'localhost', 'hostname': 'localhost', 'user': 'test'},
		{'url': 'test@localhost', 'host': 'localhost', 'hostname': 'localhost', 'user': 'test'},
		{'url': 'test@192.168.1.1:1234', 'host': '192.168.1.1', 'hostname': '192.168.1.1', 'port': 1234, 'user': 'test', 'isIP': True},
		{'url': 'test@fe80::f9e9:1d57:9f2d:fb87', 'host': 'fe80::f9e9:1d57:9f2d:fb87', 'hostname': 'fe80::f9e9:1d57:9f2d:fb87', 'user': 'test', 'isIP': True, 'isIPv6': True},
		# The host is split by the last `@`; the password may keep `@` and `:`.
		{'url': 'test:hell@test@192.168.1.1', 'host': '192.168.1.1', 'hostname': '192.168.1.1', 'user': 'test', 'pass': 'hell@test', 'isIP': True},
		{'url': 'ssh://test:he::@test@192.168.1.1:1234', 'protocol': 'SSH', 'defaultPort': 22, 'host': '192.168.1.1', 'hostname': '192.168.1.1', 'port': 1234, 'user': 'test', 'pass': 'he::@test', 'isIP': True},
		{'url': 'test@test:pass@host', 'host': 'host', 'hostname': 'host', 'user': 'test@test', 'pass': 'pass'},
		{'url': 'test:test@test@host:1234', 'host': 'host', 'hostname': 'host', 'port': 1234, 'user': 'test', 'pass': 'test@test'},
		{'url': 'kara', 'host': 'kara', 'hostname': 'kara'},
		# Empty user and password become `None`.
		{'url': ':@test', 'host': 'test', 'hostname': 'test'},

		# --- Path, query and fragment ---
		{'url': 'https://user:pw@example.com:8080/path?q=1#frag', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'port': 8080, 'user': 'user', 'pass': 'pw', 'path': '/path', 'query': 'q=1', 'params': {'q': '1'}, 'hash': 'frag'},
		# An empty authority still leaves a path to read.
		{'url': 'file:///etc/hosts', 'protocol': 'FILE', 'path': '/etc/hosts'},
		{'url': 'https://example.com/', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/'},
		{'url': 'https://example.com/a/b/c', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/a/b/c'},
		{'url': 'https://example.com?q=1', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'query': 'q=1', 'params': {'q': '1'}},
		{'url': 'https://example.com#top', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'hash': 'top'},
		{'url': 'https://example.com/#top', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/', 'hash': 'top'},
		{'url': 'https://example.com/p?a=1&b=2#f', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/p', 'query': 'a=1&b=2', 'params': {'a': '1', 'b': '2'}, 'hash': 'f'},
		# A repeated key keeps its last value.
		{'url': 'https://example.com/p?a=1&a=2', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/p', 'query': 'a=1&a=2', 'params': {'a': '2'}},
		# A key with no `=` is an empty value, and an empty pair is skipped.
		{'url': 'https://example.com/p?flag&&a=1', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/p', 'query': 'flag&&a=1', 'params': {'flag': '', 'a': '1'}},
		# A pair with an empty key is dropped; the raw query keeps it.
		{'url': 'https://example.com/p?=novalue&a=1', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/p', 'query': '=novalue&a=1', 'params': {'a': '1'}},
		# An empty query or fragment is absent, not an empty string.
		{'url': 'https://example.com/p?', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/p'},
		{'url': 'https://example.com/p#', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/p'},
		# The fragment starts at the first `#`, so a `?` after it belongs to the fragment.
		{'url': 'https://example.com/#/route?x=1', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/', 'hash': '/route?x=1'},
		{'url': 'host/path', 'host': 'host', 'hostname': 'host', 'path': '/path'},
		{'url': 'ssh://user@host:22/var/log', 'protocol': 'SSH', 'defaultPort': 22, 'host': 'host', 'hostname': 'host', 'port': 22, 'user': 'user', 'path': '/var/log'},

		# --- Default port per protocol ---
		{'url': 'http://example.com', 'protocol': 'HTTP', 'defaultPort': 80, 'host': 'example.com', 'hostname': 'example.com'},
		# The port in the address and the protocol's default are reported separately.
		{'url': 'https://example.com:8443', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'port': 8443},
		{'url': 'redis://localhost', 'protocol': 'REDIS', 'defaultPort': 6379, 'host': 'localhost', 'hostname': 'localhost'},
		{'url': 'postgres://user@db', 'protocol': 'POSTGRES', 'defaultPort': 5432, 'host': 'db', 'hostname': 'db', 'user': 'user'},
		{'url': 'mongodb://db:27018', 'protocol': 'MONGODB', 'defaultPort': 27017, 'host': 'db', 'hostname': 'db', 'port': 27018},
		{'url': 'ws://host', 'protocol': 'WS', 'defaultPort': 80, 'host': 'host', 'hostname': 'host'},
		{'url': 'wss://host', 'protocol': 'WSS', 'defaultPort': 443, 'host': 'host', 'hostname': 'host'},
		{'url': 'telnet://host', 'protocol': 'TELNET', 'defaultPort': 23, 'host': 'host', 'hostname': 'host'},
		{'url': 'vnc://host', 'protocol': 'VNC', 'defaultPort': 5900, 'host': 'host', 'hostname': 'host'},
		{'url': 'ftps://host', 'protocol': 'FTPS', 'defaultPort': 990, 'host': 'host', 'hostname': 'host'},
		# The scheme is matched without regard to case.
		{'url': 'FTP://host', 'protocol': 'FTP', 'defaultPort': 21, 'host': 'host', 'hostname': 'host'},
		# A scheme nobody serves has no default.
		{'url': 'whatever://host', 'protocol': 'WHATEVER', 'host': 'host', 'hostname': 'host'},

		# --- Percent-decoded user information ---
		{'url': 'ssh://us%40er:p%40ss@host', 'protocol': 'SSH', 'defaultPort': 22, 'host': 'host', 'hostname': 'host', 'user': 'us@er', 'pass': 'p@ss'},
		{'url': 'ssh://user:pa%2Fss@host', 'protocol': 'SSH', 'defaultPort': 22, 'host': 'host', 'hostname': 'host', 'user': 'user', 'pass': 'pa/ss'},
		{'url': 'https://%ED%85%8C%EC%8A%A4%ED%8A%B8@example.com', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'user': '테스트'},
		# `%ZZ` is not an escape, so the value is left exactly as it was written.
		{'url': 'ssh://user:p%ZZss@host', 'protocol': 'SSH', 'defaultPort': 22, 'host': 'host', 'hostname': 'host', 'user': 'user', 'pass': 'p%ZZss'},
		# Well-formed escapes that are not valid UTF-8 are left alone too.
		{'url': 'ssh://user:%E0%A4@host', 'protocol': 'SSH', 'defaultPort': 22, 'host': 'host', 'hostname': 'host', 'user': 'user', 'pass': '%E0%A4'},
		# The query is reported raw and its values decoded.
		{'url': 'https://example.com/s?q=a%20b&t=%ED%85%8C', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/s', 'query': 'q=a%20b&t=%ED%85%8C', 'params': {'q': 'a b', 't': '테'}},
		# `+` is not a space outside form encoding, so it is left as it is.
		{'url': 'https://example.com/s?q=a+b', 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/s', 'query': 'q=a+b', 'params': {'q': 'a+b'}},

		# --- IPv4 and IPv6 detection ---
		{'url': '127.0.0.1', 'host': '127.0.0.1', 'hostname': '127.0.0.1', 'isIP': True},
		{'url': '0.0.0.0', 'host': '0.0.0.0', 'hostname': '0.0.0.0', 'isIP': True},
		{'url': '255.255.255.255', 'host': '255.255.255.255', 'hostname': '255.255.255.255', 'isIP': True},
		# An octet over 255, a leading zero or a missing octet is not an address.
		{'url': '256.1.1.1', 'host': '256.1.1.1', 'hostname': '256.1.1.1'},
		{'url': '01.2.3.4', 'host': '01.2.3.4', 'hostname': '01.2.3.4'},
		{'url': '1.2.3', 'host': '1.2.3', 'hostname': '1.2.3'},
		{'url': 'example.com', 'host': 'example.com', 'hostname': 'example.com'},
		{'url': '[::]', 'host': '[::]', 'hostname': '::', 'isIP': True, 'isIPv6': True},
		{'url': '::', 'host': '::', 'hostname': '::', 'isIP': True, 'isIPv6': True},
		{'url': '[1:2:3:4:5:6:7:8]', 'host': '[1:2:3:4:5:6:7:8]', 'hostname': '1:2:3:4:5:6:7:8', 'isIP': True, 'isIPv6': True},
		{'url': '1:2:3:4:5:6:7:8', 'host': '1:2:3:4:5:6:7:8', 'hostname': '1:2:3:4:5:6:7:8', 'isIP': True, 'isIPv6': True},
		# An IPv4 tail fills the last two groups.
		{'url': '[::ffff:192.168.1.1]:443', 'host': '[::ffff:192.168.1.1]', 'hostname': '::ffff:192.168.1.1', 'port': 443, 'isIP': True, 'isIPv6': True},
		{'url': '[1:2:3:4:5:6:1.2.3.4]', 'host': '[1:2:3:4:5:6:1.2.3.4]', 'hostname': '1:2:3:4:5:6:1.2.3.4', 'isIP': True, 'isIPv6': True},
		# Nine groups, a group outside hex, a second `::` and a bad IPv4 tail are all rejected.
		{'url': '[1:2:3:4:5:6:7:8:9]', 'host': '[1:2:3:4:5:6:7:8:9]', 'hostname': '1:2:3:4:5:6:7:8:9'},
		{'url': '[1:2:3:4:5:6:7]', 'host': '[1:2:3:4:5:6:7]', 'hostname': '1:2:3:4:5:6:7'},
		{'url': '[gggg::1]', 'host': '[gggg::1]', 'hostname': 'gggg::1'},
		{'url': '[1::2::3]', 'host': '[1::2::3]', 'hostname': '1::2::3'},
		{'url': '[::ffff:256.1.1.1]', 'host': '[::ffff:256.1.1.1]', 'hostname': '::ffff:256.1.1.1'},
		{'url': '[:1:2]', 'host': '[:1:2]', 'hostname': ':1:2'},
		# Two colons make a host look like a bare IPv6 even when it is not one.
		{'url': 'host:1234:5678', 'host': 'host:1234:5678', 'hostname': 'host:1234:5678'},

		# --- Ports at the edges ---
		{'url': 'host:0', 'host': 'host', 'hostname': 'host', 'port': 0},
		{'url': 'host:65535', 'host': 'host', 'hostname': 'host', 'port': 65535},
		# A trailing `:` with nothing after it leaves the port absent rather than in error.
		{'url': 'host:', 'host': 'host', 'hostname': 'host'},

		# --- Invalid input ---
		{'url': '', 'error': True},
		{'url': '   ', 'error': True},
		{'url': 'host:abc', 'error': True, 'host': 'host', 'hostname': 'host'},
		{'url': 'host:70000', 'error': True, 'host': 'host', 'hostname': 'host'},
		{'url': 'host:65536', 'error': True, 'host': 'host', 'hostname': 'host'},
		{'url': 'host:-1', 'error': True, 'host': 'host', 'hostname': 'host'},
		{'url': 'host: 22', 'error': True, 'host': 'host', 'hostname': 'host'},
		# An unclosed `[` leaves nothing that can be read as a host.
		{'url': '[fe80::1', 'error': True},
		# A bracketed host followed by anything other than `:port`.
		{'url': '[fe80::1]x', 'error': True, 'host': '[fe80::1]', 'hostname': 'fe80::1', 'isIP': True, 'isIPv6': True},
		{'url': '[fe80::1]:70000', 'error': True, 'host': '[fe80::1]', 'hostname': 'fe80::1', 'isIP': True, 'isIPv6': True},
		# The path is still read from an address whose port is in error.
		{'url': 'https://example.com:abc/path', 'error': True, 'protocol': 'HTTPS', 'defaultPort': 443, 'host': 'example.com', 'hostname': 'example.com', 'path': '/path'},
		# Surrounding whitespace is trimmed before anything is read.
		{'url': '  ssh://host:22  ', 'protocol': 'SSH', 'defaultPort': 22, 'host': 'host', 'hostname': 'host', 'port': 22},
	]

	for case in cases:
		url = case['url']
		result = parseAddress(url)

		assert result['error'] == case.get('error', False), url
		assert result['protocol'] == case.get('protocol'), url
		assert result['host'] == case.get('host'), url
		assert result['hostname'] == case.get('hostname'), url
		assert result['port'] == case.get('port'), url
		assert result['defaultPort'] == case.get('defaultPort'), url
		assert result['user'] == case.get('user'), url
		assert result['pass'] == case.get('pass'), url
		assert result['path'] == case.get('path'), url
		assert result['query'] == case.get('query'), url
		assert result['params'] == case.get('params'), url
		assert result['hash'] == case.get('hash'), url
		assert result['isIP'] == case.get('isIP', False), url
		assert result['isIPv6'] == case.get('isIPv6', False), url

	# `decode` is on by default and turns the escapes in the user information and
	# in the query values back into the characters they stand for.
	raw = parseAddress('ssh://us%40er:p%40ss@host', decode=False)
	assert raw['user'] == 'us%40er'
	assert raw['pass'] == 'p%40ss'

	rawQuery = parseAddress('https://example.com/s?q=a%20b', {'decode': False})
	assert rawQuery['query'] == 'q=a%20b'
	assert rawQuery['params'] == {'q': 'a%20b'}

	assert parseAddress('ssh://us%40er@host', decode=True)['user'] == 'us@er'

	# Anything that is not a string cannot be parsed.
	for value in [None, 123, {}, []]:
		assert parseAddress(value)['error'] is True
