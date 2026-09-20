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
  });
}
