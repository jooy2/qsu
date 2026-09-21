import 'dart:convert';
import 'dart:io';

import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

/// A server of its own, so the tests never reach out to the network.
Future<HttpServer> _startServer() async {
  final HttpServer server =
      await HttpServer.bind(InternetAddress.loopbackIPv4, 0);

  server.listen((HttpRequest request) async {
    void sendJson(int status, Object payload) {
      final String body = jsonEncode(payload);

      request.response
        ..statusCode = status
        ..headers.contentType = ContentType('application', 'json')
        ..write(body);
      request.response.close();
    }

    if (request.method == 'POST') {
      final String raw = await utf8.decoder.bind(request).join();
      Object received;

      try {
        received =
            raw.isEmpty ? <String, dynamic>{} : jsonDecode(raw) as Object;
      } on FormatException {
        received = <String, dynamic>{'raw': raw};
      }

      sendJson(200, <String, dynamic>{'id': 101, 'received': received});

      return;
    }

    final String path = request.uri.toString();

    if (path == '/posts/1') {
      sendJson(200, <String, dynamic>{'id': 1, 'title': 'foo'});
    } else if (path.startsWith('/search')) {
      sendJson(200, <String, dynamic>{'query': path});
    } else if (path == '/text') {
      request.response
        ..statusCode = 200
        ..headers.contentType = ContentType('text', 'plain')
        ..write('hello world');
      request.response.close();
    } else if (path == '/empty') {
      request.response.statusCode = 204;
      request.response.close();
    } else {
      sendJson(404, <String, dynamic>{'error': 'not found'});
    }
  });

  return server;
}

void main() {
  group('Net', () {
    late HttpServer server;
    late String host;

    setUpAll(() async {
      server = await _startServer();
      host = 'http://127.0.0.1:${server.port}';
    });

    tearDownAll(() async {
      await server.close(force: true);
    });

    test('fetchData reads JSON', () async {
      final dynamic response = await fetchData('/posts/1', host: host);

      expect(response['id'], 1);
      expect(response['title'], 'foo');
    });

    test('fetchData reads text as text', () async {
      expect(await fetchData('/text', host: host), 'hello world');
    });

    test('fetchData sends a JSON body', () async {
      final dynamic response = await fetchData('/posts',
          post: true,
          host: host,
          bodyType: 'json',
          body: <String, dynamic>{'title': 'foo'});

      expect(response['id'], 101);
      expect(response['received']['title'], 'foo');
    });

    test('fetchData carries the query parameters', () async {
      final dynamic response = await fetchData('/search',
          host: host, queryParameters: <String, dynamic>{'q': 'dart'});

      expect('${response['query']}'.contains('q=dart'), isTrue);
    });

    test('fetchData returns null for a response that is not a success',
        () async {
      expect(await fetchData('/missing', host: host), isNull);
    });

    test('fetchData reports the error it was given a handler for', () async {
      Object? seen;

      final dynamic response = await fetchData('/posts/1',
          host: 'http://127.0.0.1:1', onError: (Object error) => seen = error);

      expect(response, isNull);
      expect(seen, isNotNull);
    });

    test('fetchData checks the arguments it was given', () async {
      expect(() => fetchData(''), throwsArgumentError);
      // A url with no host has to be a full one.
      expect(() => fetchData('relative/path'), throwsArgumentError);
      expect(() => fetchData('/a', host: host, method: 'get', post: true),
          throwsArgumentError);
      expect(() => fetchData('http://example.com/a', host: host),
          throwsArgumentError);
    });

    test('parseAddress', () {
      // Each case: 'url' plus only the fields that differ from the defaults
      // (error, isIP and isIPv6 false, everything else null).
      final List<Map<String, dynamic>> cases = [
        // Full form: scheme, user, password and port.
        {
          'url': 'ssh://test:pass@host:1234',
          'protocol': 'SSH',
          'defaultPort': 22,
          'host': 'host',
          'hostname': 'host',
          'port': 1234,
          'user': 'test',
          'pass': 'pass'
        },
        // Web URL. Missing values stay `null`, not an error.
        {
          'url': 'https://google.com',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'google.com',
          'hostname': 'google.com'
        },
        // No scheme -> protocol is `null` (no SSH default).
        {
          'url': 'user:test@host',
          'host': 'host',
          'hostname': 'host',
          'user': 'user',
          'pass': 'test'
        },
        {'url': 'host:1234', 'host': 'host', 'hostname': 'host', 'port': 1234},
        {
          'url': '192.168.1.123:1234',
          'host': '192.168.1.123',
          'hostname': '192.168.1.123',
          'port': 1234,
          'isIP': true
        },
        {'url': 'hostname', 'host': 'hostname', 'hostname': 'hostname'},
        {
          'url': 'ssh://test@hostname',
          'protocol': 'SSH',
          'defaultPort': 22,
          'host': 'hostname',
          'hostname': 'hostname',
          'user': 'test'
        },
        // IPv6 without brackets keeps the raw address and cannot carry a port.
        {
          'url': 'ssh://::1',
          'protocol': 'SSH',
          'defaultPort': 22,
          'host': '::1',
          'hostname': '::1',
          'isIP': true,
          'isIPv6': true
        },
        {
          'url': '::1',
          'host': '::1',
          'hostname': '::1',
          'isIP': true,
          'isIPv6': true
        },
        {
          'url': 'ssh://fe80::f9e9:1d57:9f2d:fb87',
          'protocol': 'SSH',
          'defaultPort': 22,
          'host': 'fe80::f9e9:1d57:9f2d:fb87',
          'hostname': 'fe80::f9e9:1d57:9f2d:fb87',
          'isIP': true,
          'isIPv6': true
        },
        // IPv6 with brackets keeps the brackets on `host` and drops them from `hostname`.
        {
          'url': 'ssh://[fe80::f9e9:1d57:9f2d:fb87]',
          'protocol': 'SSH',
          'defaultPort': 22,
          'host': '[fe80::f9e9:1d57:9f2d:fb87]',
          'hostname': 'fe80::f9e9:1d57:9f2d:fb87',
          'isIP': true,
          'isIPv6': true
        },
        {
          'url': '[fe80::f9e9:1d57:9f2d:fb87]:1234',
          'host': '[fe80::f9e9:1d57:9f2d:fb87]',
          'hostname': 'fe80::f9e9:1d57:9f2d:fb87',
          'port': 1234,
          'isIP': true,
          'isIPv6': true
        },
        {
          'url': 'test:pass@[fe80::f9e9:1d57:9f2d:fb87]:1234',
          'host': '[fe80::f9e9:1d57:9f2d:fb87]',
          'hostname': 'fe80::f9e9:1d57:9f2d:fb87',
          'port': 1234,
          'user': 'test',
          'pass': 'pass',
          'isIP': true,
          'isIPv6': true
        },
        {
          'url': '[::1]',
          'host': '[::1]',
          'hostname': '::1',
          'isIP': true,
          'isIPv6': true
        },
        {
          'url': '192.168.1.1',
          'host': '192.168.1.1',
          'hostname': '192.168.1.1',
          'isIP': true
        },
        // Unknown scheme is parsed as-is (generic parser, no error) and has no default port.
        {
          'url': 'asd://192.168.1.1',
          'protocol': 'ASD',
          'host': '192.168.1.1',
          'hostname': '192.168.1.1',
          'isIP': true
        },
        // Scheme only: empty host is `null`, not an error.
        {'url': 'ssh://', 'protocol': 'SSH', 'defaultPort': 22},
        {
          'url': 'sftp://test@localhost',
          'protocol': 'SFTP',
          'defaultPort': 22,
          'host': 'localhost',
          'hostname': 'localhost',
          'user': 'test'
        },
        {
          'url': 'test@localhost',
          'host': 'localhost',
          'hostname': 'localhost',
          'user': 'test'
        },
        {
          'url': 'test@192.168.1.1:1234',
          'host': '192.168.1.1',
          'hostname': '192.168.1.1',
          'port': 1234,
          'user': 'test',
          'isIP': true
        },
        {
          'url': 'test@fe80::f9e9:1d57:9f2d:fb87',
          'host': 'fe80::f9e9:1d57:9f2d:fb87',
          'hostname': 'fe80::f9e9:1d57:9f2d:fb87',
          'user': 'test',
          'isIP': true,
          'isIPv6': true
        },
        // The host is split by the last `@`; the password may keep `@` and `:`.
        {
          'url': 'test:hell@test@192.168.1.1',
          'host': '192.168.1.1',
          'hostname': '192.168.1.1',
          'user': 'test',
          'pass': 'hell@test',
          'isIP': true
        },
        {
          'url': 'ssh://test:he::@test@192.168.1.1:1234',
          'protocol': 'SSH',
          'defaultPort': 22,
          'host': '192.168.1.1',
          'hostname': '192.168.1.1',
          'port': 1234,
          'user': 'test',
          'pass': 'he::@test',
          'isIP': true
        },
        {
          'url': 'test@test:pass@host',
          'host': 'host',
          'hostname': 'host',
          'user': 'test@test',
          'pass': 'pass'
        },
        {
          'url': 'test:test@test@host:1234',
          'host': 'host',
          'hostname': 'host',
          'port': 1234,
          'user': 'test',
          'pass': 'test@test'
        },
        {'url': 'kara', 'host': 'kara', 'hostname': 'kara'},
        // Empty user and password become `null`.
        {'url': ':@test', 'host': 'test', 'hostname': 'test'},

        // --- Path, query and fragment ---
        {
          'url': 'https://user:pw@example.com:8080/path?q=1#frag',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'port': 8080,
          'user': 'user',
          'pass': 'pw',
          'path': '/path',
          'query': 'q=1',
          'params': {'q': '1'},
          'hash': 'frag'
        },
        // An empty authority still leaves a path to read.
        {'url': 'file:///etc/hosts', 'protocol': 'FILE', 'path': '/etc/hosts'},
        {
          'url': 'https://example.com/',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/'
        },
        {
          'url': 'https://example.com/a/b/c',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/a/b/c'
        },
        {
          'url': 'https://example.com?q=1',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'query': 'q=1',
          'params': {'q': '1'}
        },
        {
          'url': 'https://example.com#top',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'hash': 'top'
        },
        {
          'url': 'https://example.com/#top',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/',
          'hash': 'top'
        },
        {
          'url': 'https://example.com/p?a=1&b=2#f',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/p',
          'query': 'a=1&b=2',
          'params': {'a': '1', 'b': '2'},
          'hash': 'f'
        },
        // A repeated key keeps its last value.
        {
          'url': 'https://example.com/p?a=1&a=2',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/p',
          'query': 'a=1&a=2',
          'params': {'a': '2'}
        },
        // A key with no `=` is an empty value, and an empty pair is skipped.
        {
          'url': 'https://example.com/p?flag&&a=1',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/p',
          'query': 'flag&&a=1',
          'params': {'flag': '', 'a': '1'}
        },
        // A pair with an empty key is dropped; the raw query keeps it.
        {
          'url': 'https://example.com/p?=novalue&a=1',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/p',
          'query': '=novalue&a=1',
          'params': {'a': '1'}
        },
        // An empty query or fragment is absent, not an empty string.
        {
          'url': 'https://example.com/p?',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/p'
        },
        {
          'url': 'https://example.com/p#',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/p'
        },
        // The fragment starts at the first `#`, so a `?` after it belongs to the fragment.
        {
          'url': 'https://example.com/#/route?x=1',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/',
          'hash': '/route?x=1'
        },
        {
          'url': 'host/path',
          'host': 'host',
          'hostname': 'host',
          'path': '/path'
        },
        {
          'url': 'ssh://user@host:22/var/log',
          'protocol': 'SSH',
          'defaultPort': 22,
          'host': 'host',
          'hostname': 'host',
          'port': 22,
          'user': 'user',
          'path': '/var/log'
        },

        // --- Default port per protocol ---
        {
          'url': 'http://example.com',
          'protocol': 'HTTP',
          'defaultPort': 80,
          'host': 'example.com',
          'hostname': 'example.com'
        },
        // The port in the address and the protocol's default are reported separately.
        {
          'url': 'https://example.com:8443',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'port': 8443
        },
        {
          'url': 'redis://localhost',
          'protocol': 'REDIS',
          'defaultPort': 6379,
          'host': 'localhost',
          'hostname': 'localhost'
        },
        {
          'url': 'postgres://user@db',
          'protocol': 'POSTGRES',
          'defaultPort': 5432,
          'host': 'db',
          'hostname': 'db',
          'user': 'user'
        },
        {
          'url': 'mongodb://db:27018',
          'protocol': 'MONGODB',
          'defaultPort': 27017,
          'host': 'db',
          'hostname': 'db',
          'port': 27018
        },
        {
          'url': 'ws://host',
          'protocol': 'WS',
          'defaultPort': 80,
          'host': 'host',
          'hostname': 'host'
        },
        {
          'url': 'wss://host',
          'protocol': 'WSS',
          'defaultPort': 443,
          'host': 'host',
          'hostname': 'host'
        },
        {
          'url': 'telnet://host',
          'protocol': 'TELNET',
          'defaultPort': 23,
          'host': 'host',
          'hostname': 'host'
        },
        {
          'url': 'vnc://host',
          'protocol': 'VNC',
          'defaultPort': 5900,
          'host': 'host',
          'hostname': 'host'
        },
        {
          'url': 'ftps://host',
          'protocol': 'FTPS',
          'defaultPort': 990,
          'host': 'host',
          'hostname': 'host'
        },
        // The scheme is matched without regard to case.
        {
          'url': 'FTP://host',
          'protocol': 'FTP',
          'defaultPort': 21,
          'host': 'host',
          'hostname': 'host'
        },
        // A scheme nobody serves has no default.
        {
          'url': 'whatever://host',
          'protocol': 'WHATEVER',
          'host': 'host',
          'hostname': 'host'
        },

        // --- Percent-decoded user information ---
        {
          'url': 'ssh://us%40er:p%40ss@host',
          'protocol': 'SSH',
          'defaultPort': 22,
          'host': 'host',
          'hostname': 'host',
          'user': 'us@er',
          'pass': 'p@ss'
        },
        {
          'url': 'ssh://user:pa%2Fss@host',
          'protocol': 'SSH',
          'defaultPort': 22,
          'host': 'host',
          'hostname': 'host',
          'user': 'user',
          'pass': 'pa/ss'
        },
        {
          'url': 'https://%ED%85%8C%EC%8A%A4%ED%8A%B8@example.com',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'user': '테스트'
        },
        // `%ZZ` is not an escape, so the value is left exactly as it was written.
        {
          'url': 'ssh://user:p%ZZss@host',
          'protocol': 'SSH',
          'defaultPort': 22,
          'host': 'host',
          'hostname': 'host',
          'user': 'user',
          'pass': 'p%ZZss'
        },
        // Well-formed escapes that are not valid UTF-8 are left alone too.
        {
          'url': 'ssh://user:%E0%A4@host',
          'protocol': 'SSH',
          'defaultPort': 22,
          'host': 'host',
          'hostname': 'host',
          'user': 'user',
          'pass': '%E0%A4'
        },
        // The query is reported raw and its values decoded.
        {
          'url': 'https://example.com/s?q=a%20b&t=%ED%85%8C',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/s',
          'query': 'q=a%20b&t=%ED%85%8C',
          'params': {'q': 'a b', 't': '테'}
        },
        // `+` is not a space outside form encoding, so it is left as it is.
        {
          'url': 'https://example.com/s?q=a+b',
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/s',
          'query': 'q=a+b',
          'params': {'q': 'a+b'}
        },

        // --- IPv4 and IPv6 detection ---
        {
          'url': '127.0.0.1',
          'host': '127.0.0.1',
          'hostname': '127.0.0.1',
          'isIP': true
        },
        {
          'url': '0.0.0.0',
          'host': '0.0.0.0',
          'hostname': '0.0.0.0',
          'isIP': true
        },
        {
          'url': '255.255.255.255',
          'host': '255.255.255.255',
          'hostname': '255.255.255.255',
          'isIP': true
        },
        // An octet over 255, a leading zero or a missing octet is not an address.
        {'url': '256.1.1.1', 'host': '256.1.1.1', 'hostname': '256.1.1.1'},
        {'url': '01.2.3.4', 'host': '01.2.3.4', 'hostname': '01.2.3.4'},
        {'url': '1.2.3', 'host': '1.2.3', 'hostname': '1.2.3'},
        {
          'url': 'example.com',
          'host': 'example.com',
          'hostname': 'example.com'
        },
        {
          'url': '[::]',
          'host': '[::]',
          'hostname': '::',
          'isIP': true,
          'isIPv6': true
        },
        {
          'url': '::',
          'host': '::',
          'hostname': '::',
          'isIP': true,
          'isIPv6': true
        },
        {
          'url': '[1:2:3:4:5:6:7:8]',
          'host': '[1:2:3:4:5:6:7:8]',
          'hostname': '1:2:3:4:5:6:7:8',
          'isIP': true,
          'isIPv6': true
        },
        {
          'url': '1:2:3:4:5:6:7:8',
          'host': '1:2:3:4:5:6:7:8',
          'hostname': '1:2:3:4:5:6:7:8',
          'isIP': true,
          'isIPv6': true
        },
        // An IPv4 tail fills the last two groups.
        {
          'url': '[::ffff:192.168.1.1]:443',
          'host': '[::ffff:192.168.1.1]',
          'hostname': '::ffff:192.168.1.1',
          'port': 443,
          'isIP': true,
          'isIPv6': true
        },
        {
          'url': '[1:2:3:4:5:6:1.2.3.4]',
          'host': '[1:2:3:4:5:6:1.2.3.4]',
          'hostname': '1:2:3:4:5:6:1.2.3.4',
          'isIP': true,
          'isIPv6': true
        },
        // Nine groups, a group outside hex, a second `::` and a bad IPv4 tail are all rejected.
        {
          'url': '[1:2:3:4:5:6:7:8:9]',
          'host': '[1:2:3:4:5:6:7:8:9]',
          'hostname': '1:2:3:4:5:6:7:8:9'
        },
        {
          'url': '[1:2:3:4:5:6:7]',
          'host': '[1:2:3:4:5:6:7]',
          'hostname': '1:2:3:4:5:6:7'
        },
        {'url': '[gggg::1]', 'host': '[gggg::1]', 'hostname': 'gggg::1'},
        {'url': '[1::2::3]', 'host': '[1::2::3]', 'hostname': '1::2::3'},
        {
          'url': '[::ffff:256.1.1.1]',
          'host': '[::ffff:256.1.1.1]',
          'hostname': '::ffff:256.1.1.1'
        },
        {'url': '[:1:2]', 'host': '[:1:2]', 'hostname': ':1:2'},
        // Two colons make a host look like a bare IPv6 even when it is not one.
        {
          'url': 'host:1234:5678',
          'host': 'host:1234:5678',
          'hostname': 'host:1234:5678'
        },

        // --- Ports at the edges ---
        {'url': 'host:0', 'host': 'host', 'hostname': 'host', 'port': 0},
        {
          'url': 'host:65535',
          'host': 'host',
          'hostname': 'host',
          'port': 65535
        },
        // A trailing `:` with nothing after it leaves the port absent rather than in error.
        {'url': 'host:', 'host': 'host', 'hostname': 'host'},

        // --- Invalid input ---
        {'url': '', 'error': true},
        {'url': '   ', 'error': true},
        {'url': 'host:abc', 'error': true, 'host': 'host', 'hostname': 'host'},
        {
          'url': 'host:70000',
          'error': true,
          'host': 'host',
          'hostname': 'host'
        },
        {
          'url': 'host:65536',
          'error': true,
          'host': 'host',
          'hostname': 'host'
        },
        {'url': 'host:-1', 'error': true, 'host': 'host', 'hostname': 'host'},
        {'url': 'host: 22', 'error': true, 'host': 'host', 'hostname': 'host'},
        // An unclosed `[` leaves nothing that can be read as a host.
        {'url': '[fe80::1', 'error': true},
        // A bracketed host followed by anything other than `:port`.
        {
          'url': '[fe80::1]x',
          'error': true,
          'host': '[fe80::1]',
          'hostname': 'fe80::1',
          'isIP': true,
          'isIPv6': true
        },
        {
          'url': '[fe80::1]:70000',
          'error': true,
          'host': '[fe80::1]',
          'hostname': 'fe80::1',
          'isIP': true,
          'isIPv6': true
        },
        // The path is still read from an address whose port is in error.
        {
          'url': 'https://example.com:abc/path',
          'error': true,
          'protocol': 'HTTPS',
          'defaultPort': 443,
          'host': 'example.com',
          'hostname': 'example.com',
          'path': '/path'
        },
        // Surrounding whitespace is trimmed before anything is read.
        {
          'url': '  ssh://host:22  ',
          'protocol': 'SSH',
          'defaultPort': 22,
          'host': 'host',
          'hostname': 'host',
          'port': 22
        },
      ];

      for (final Map<String, dynamic> c in cases) {
        final String url = c['url'] as String;
        final ParsedAddress result = parseAddress(url);

        expect(result.error, c['error'] ?? false, reason: 'error for "$url"');
        expect(result.protocol, c['protocol'], reason: 'protocol for "$url"');
        expect(result.host, c['host'], reason: 'host for "$url"');
        expect(result.hostname, c['hostname'], reason: 'hostname for "$url"');
        expect(result.port, c['port'], reason: 'port for "$url"');
        expect(result.defaultPort, c['defaultPort'],
            reason: 'defaultPort for "$url"');
        expect(result.user, c['user'], reason: 'user for "$url"');
        expect(result.pass, c['pass'], reason: 'pass for "$url"');
        expect(result.path, c['path'], reason: 'path for "$url"');
        expect(result.query, c['query'], reason: 'query for "$url"');
        expect(result.params, c['params'], reason: 'params for "$url"');
        expect(result.hash, c['hash'], reason: 'hash for "$url"');
        expect(result.isIP, c['isIP'] ?? false, reason: 'isIP for "$url"');
        expect(result.isIPv6, c['isIPv6'] ?? false,
            reason: 'isIPv6 for "$url"');
      }

      // `decode` is on by default and turns the escapes in the user
      // information and in the query values back into the characters they
      // stand for.
      final ParsedAddress raw =
          parseAddress('ssh://us%40er:p%40ss@host', decode: false);

      expect(raw.user, 'us%40er');
      expect(raw.pass, 'p%40ss');

      final ParsedAddress rawQuery =
          parseAddress('https://example.com/s?q=a%20b', decode: false);

      expect(rawQuery.query, 'q=a%20b');
      expect(rawQuery.params, {'q': 'a%20b'});

      expect(parseAddress('ssh://us%40er@host', decode: true).user, 'us@er');
    });
  });
}
