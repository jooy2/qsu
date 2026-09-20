import 'dart:convert';
import 'dart:io';

import 'package:qsu/src/object.dart';
import 'package:qsu/src/string.dart';

/// (Private) The body shapes [fetchData] knows how to write.
const Map<String, String> _contentTypes = <String, String>{
  'x-www-form-urlencoded': 'application/x-www-form-urlencoded',
  'json': 'application/json;charset=UTF-8',
  'text': 'plain/text;charset=UTF-8',
};

/// (Private) Response types that are text even though their name does not begin
/// with `text/`.
const List<String> _textTypes = <String>[
  'text/html',
  'text/css',
  'text/javascript',
  'application/json',
  'application/ld+json',
  'application/xml',
  'text/xml',
  'text/plain',
];

/// (Private) Response types whose body is a file rather than something to read.
const List<String> _fileTypePrefixes = <String>[
  'application/',
  'image/',
  'video/',
  'audio/',
  'font/',
];

const List<String> _methods = <String>['get', 'post', 'put', 'delete', 'patch'];

/// (Private) The headers a request carries when the caller does not name them.
Map<String, String> _defaultHeaders(String? bodyType,
    Map<String, dynamic>? auth, Map<String, dynamic>? headers) {
  final Map<String, String> result = <String, String>{};
  final Object? bearer = auth?['bearer'];
  final Object? apiKey = auth?['apiKey'];

  if (bearer is String && bearer.isNotEmpty) {
    result['Authorization'] = 'Bearer $bearer';
  }

  if (apiKey is String && apiKey.isNotEmpty) {
    result['x-API-key'] = apiKey;
  }

  final Object? given = headers?['Content-Type'];
  final String? contentType =
      given is String ? given : _contentTypes[bodyType ?? ''];

  if (contentType != null) {
    result['Content-Type'] = contentType;
  }

  result['Accept-Encoding'] = 'gzip, deflate, br';
  result['Charset'] = 'utf-8';

  headers?.forEach((String name, dynamic value) {
    if (value != null) {
      result[name] = '$value';
    }
  });

  return result;
}

/// (Private) Whether the response is a file to keep rather than text to read.
bool _isFileResponse(String contentType, String contentDisposition) {
  if (RegExp('attachment|filename=', caseSensitive: false)
      .hasMatch(contentDisposition)) {
    return true;
  }

  final String mime = contentType.split(';').first.trim().toLowerCase();

  if (_textTypes.contains(mime) || mime.startsWith('text/')) {
    return false;
  }

  return _fileTypePrefixes.any((String prefix) => mime.startsWith(prefix));
}

/// Make an HTTP request and return the response, decoded by what it says it is:
/// a `Map` or `List` for JSON, a `String` for text, a `List<int>` for a file,
/// and the raw `Stream<List<int>>` when [toStream] is set.
///
/// The method is named either with [method] or with one of the [get], [post],
/// [put], [delete] and [patch] flags, not with both. Where [host] is given, the
/// url has to be the path after it.
///
/// A request that fails returns `null`, after [onError] is called with the error
/// if one was given.
Future<dynamic> fetchData(String url,
    {Map<String, dynamic>? auth,
    bool get = false,
    bool post = false,
    bool put = false,
    bool delete = false,
    bool patch = false,
    bool toStream = false,
    int? timeout,
    String? method,
    String? host,
    Map<String, dynamic>? queryParameters,
    dynamic body,
    String? bodyType,
    Map<String, dynamic>? headers,
    void Function(Object error)? onError}) async {
  if (url.isEmpty) {
    throw ArgumentError('`url` is required');
  }

  final List<bool> flags = <bool>[get, post, put, delete, patch];

  if (method != null && flags.contains(true)) {
    throw ArgumentError(
        '`method` and `get|post|put|delete|patch` cannot be used together');
  }

  final int named = flags.indexOf(true);
  final String requestMethod =
      (named >= 0 ? _methods[named] : (method ?? 'get')).toUpperCase();

  if ((host == null || host.isEmpty) && !url.startsWith('/')) {
    throw ArgumentError('`url` must begin with `/`.');
  }

  if (host != null && host.isNotEmpty && url.contains('://')) {
    throw ArgumentError('If `host` is specified, `url` must begin with `/`.');
  }

  final String target =
      (host != null && host.isNotEmpty) ? urlJoin(<String?>[host, url]) : url;
  final String query = (queryParameters != null && queryParameters.isNotEmpty)
      ? '?${objToQueryString(queryParameters)}'
      : '';

  // Built before the guard below on purpose. A platform with no networking of
  // its own, which is what the web is, throws here rather than being reported
  // as a request that failed: the two are not the same thing.
  final HttpClient client = HttpClient();

  try {
    if (timeout != null) {
      client.connectionTimeout = Duration(milliseconds: timeout);
    }

    final HttpClientRequest request =
        await client.openUrl(requestMethod, Uri.parse('$target$query'));

    _defaultHeaders(bodyType, auth, headers).forEach(request.headers.set);

    if (body != null) {
      request.write(_encodeBody(body, bodyType));
    }

    HttpClientResponse response = await request.close();

    if (timeout != null) {
      response = await Future<HttpClientResponse>.value(response)
          .timeout(Duration(milliseconds: timeout));
    }

    if (response.statusCode < 200 || response.statusCode >= 300) {
      return null;
    }

    return await _readResponse(response, toStream: toStream);
  } on Object catch (error) {
    if (onError != null) {
      onError(error);
    }

    return null;
  } finally {
    // A streamed response is still being read, so the client stays open for it.
    if (!toStream) {
      client.close();
    }
  }
}

String _encodeBody(dynamic body, String? bodyType) {
  if (bodyType == 'x-www-form-urlencoded' && body is Map<String, dynamic>) {
    return objToQueryString(body);
  }

  if (body is String) {
    return body;
  }

  return jsonEncode(body);
}

Future<dynamic> _readResponse(HttpClientResponse response,
    {required bool toStream}) async {
  if (toStream) {
    return response;
  }

  final String contentType =
      response.headers.value(HttpHeaders.contentTypeHeader) ?? '';
  final String disposition =
      response.headers.value('content-disposition') ?? '';

  if (_isFileResponse(contentType, disposition)) {
    final List<int> bytes = <int>[];

    await for (final List<int> chunk in response) {
      bytes.addAll(chunk);
    }

    return bytes;
  }

  final String text = await response.transform(utf8.decoder).join();

  if (contentType.contains('application/json') && text.isNotEmpty) {
    return jsonDecode(text);
  }

  return text;
}
