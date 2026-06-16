import json
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer

import pytest

from qsu.net import fetchData


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
