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

/// (Private) The port each scheme is served on when the address does not name
/// one. It is reported as [ParsedAddress.defaultPort] and never as
/// [ParsedAddress.port], so a caller can still tell an address that carried a
/// port from one that did not.
const Map<String, int> _defaultPorts = <String, int>{
  'dns': 53,
  'ftp': 21,
  'ftps': 990,
  'git': 9418,
  'http': 80,
  'https': 443,
  'imap': 143,
  'imaps': 993,
  'ldap': 389,
  'ldaps': 636,
  'mongodb': 27017,
  'mssql': 1433,
  'mysql': 3306,
  'pop3': 110,
  'pop3s': 995,
  'postgres': 5432,
  'postgresql': 5432,
  'rdp': 3389,
  'redis': 6379,
  'sftp': 22,
  'smb': 445,
  'smtp': 25,
  'smtps': 465,
  'ssh': 22,
  'telnet': 23,
  'vnc': 5900,
  'ws': 80,
  'wss': 443,
};

// Compiled once. Building a `RegExp` inside a function recompiles the pattern
// on every call.
final RegExp _schemePrefix = RegExp(r'^([a-zA-Z][a-zA-Z0-9+.-]*):\/\/');
final RegExp _authorityDelimiter = RegExp(r'[/?#]');
final RegExp _digitsOnly = RegExp(r'^\d+$');
final RegExp _hexGroup = RegExp(r'^[0-9a-fA-F]{1,4}$');
final RegExp _ipv4Part = RegExp(r'^(0|[1-9][0-9]{0,2})$');

/// (Private) A `%` that is not the start of a `%XX` escape, which makes the
/// whole value undecodable.
final RegExp _malformedPercent = RegExp(r'%(?![0-9a-fA-F]{2})');

/// (Private) Whether [host] is a dotted IPv4 address. A leading zero reads as
/// octal in some resolvers and as decimal in others, so `01.2.3.4` is rejected
/// rather than guessed at.
bool _isIPv4Address(String host) {
  final List<String> parts = host.split('.');

  if (parts.length != 4) {
    return false;
  }

  for (final String part in parts) {
    if (!_ipv4Part.hasMatch(part) || int.parse(part) > 255) {
      return false;
    }
  }

  return true;
}

/// (Private) Whether [host] is an IPv6 address, written in full, compressed
/// with `::`, or ending in a dotted IPv4 tail.
bool _isIPv6Address(String host) {
  if (host.isEmpty) {
    return false;
  }

  final int doubleIndex = host.indexOf('::');
  List<String> groups;

  if (doubleIndex != -1) {
    if (host.indexOf('::', doubleIndex + 1) != -1) {
      // `::` stands for the run of zero groups, so a second one leaves the
      // length ambiguous.
      return false;
    }

    final String left = host.substring(0, doubleIndex);
    final String right = host.substring(doubleIndex + 2);

    groups = <String>[
      if (left.isNotEmpty) ...left.split(':'),
      if (right.isNotEmpty) ...right.split(':'),
    ];
  } else {
    groups = host.split(':');
  }

  int count = groups.length;
  List<String> hexGroups = groups;

  // The last group may be a dotted IPv4 address (`::ffff:192.168.1.1`), which
  // fills two groups.
  if (count > 0 && groups[count - 1].contains('.')) {
    if (!_isIPv4Address(groups[count - 1])) {
      return false;
    }

    hexGroups = groups.sublist(0, count - 1);
    count += 1;
  }

  for (final String group in hexGroups) {
    if (!_hexGroup.hasMatch(group)) {
      return false;
    }
  }

  // `::` replaces one group at the least, so a compressed address is short of
  // the eight.
  return doubleIndex != -1 ? count <= 7 : count == 8;
}

/// (Private) Turns `%XX` escapes back into the characters they stand for. A
/// value that cannot be decoded is returned as it was written rather than
/// half-decoded, so the caller sees the input instead of a string that is
/// neither form.
String _percentDecode(String value) {
  if (!value.contains('%')) {
    return value;
  }

  if (_malformedPercent.hasMatch(value)) {
    return value;
  }

  try {
    return Uri.decodeComponent(value);
  } catch (_) {
    return value;
  }
}

/// (Private) Reads a query string into a map. A repeated key keeps its last
/// value, and a pair with no key is left out.
Map<String, String>? _parseQuery(String query, bool decode) {
  final Map<String, String> params = <String, String>{};

  for (final String pair in query.split('&')) {
    final int equalIndex = pair.indexOf('=');
    final String key = equalIndex == -1 ? pair : pair.substring(0, equalIndex);

    if (key.isEmpty) {
      continue;
    }

    final String value = equalIndex == -1 ? '' : pair.substring(equalIndex + 1);

    params[decode ? _percentDecode(key) : key] =
        decode ? _percentDecode(value) : value;
  }

  return params.isEmpty ? null : params;
}

/// The result of [parseAddress]. Missing values are `null`. [error] is `true`
/// only when the input cannot be parsed, not when a value is simply absent.
class ParsedAddress {
  final bool error;
  final String? protocol;
  final String? host;
  final String? hostname;
  final int? port;
  final int? defaultPort;
  final String? user;
  final String? pass;
  final String? path;
  final String? query;
  final Map<String, String>? params;
  final String? hash;
  final bool isIP;
  final bool isIPv6;

  ParsedAddress({
    required this.error,
    this.protocol,
    this.host,
    this.hostname,
    this.port,
    this.defaultPort,
    this.user,
    this.pass,
    this.path,
    this.query,
    this.params,
    this.hash,
    this.isIP = false,
    this.isIPv6 = false,
  });
}

/// Parses an address string (URL / host / SSH-style connection string) into its
/// parts. Handles an optional `scheme://`, `user:pass@` userinfo, IPv4, bare or
/// bracketed IPv6, a port, and the path, query and fragment after them. Absent
/// parts are `null` and the protocol is not defaulted; a port is never invented
/// for [ParsedAddress.port], only reported separately as
/// [ParsedAddress.defaultPort].
///
/// The user, the password and the query values are percent-decoded unless
/// [decode] is `false`.
ParsedAddress parseAddress(String url, {bool decode = true}) {
  if (url.trim().isEmpty) {
    return ParsedAddress(error: true);
  }

  bool error = false;
  String? protocol;
  String? host;
  String? hostname;
  int? port;
  int? defaultPort;
  String? user;
  String? pass;
  String? path;
  String? query;
  Map<String, String>? params;
  String? hash;
  bool isIP = false;
  bool isIPv6 = false;

  String rest = url.trim();

  // Read the scheme only where it is followed by `://` (`ssh://`, `https://`).
  // A bare `host:1234` must not be taken for a `host` scheme.
  final RegExpMatch? schemeMatch = _schemePrefix.firstMatch(rest);

  if (schemeMatch != null) {
    protocol = schemeMatch.group(1)!.toUpperCase();
    defaultPort = _defaultPorts[schemeMatch.group(1)!.toLowerCase()];
    rest = rest.substring(schemeMatch.group(0)!.length);
  }

  // The authority runs to the first `/`, `?` or `#`; everything after it is the
  // path, the query and the fragment.
  final int delimiterIndex = rest.indexOf(_authorityDelimiter);
  final String authority =
      delimiterIndex == -1 ? rest : rest.substring(0, delimiterIndex);
  String tail = delimiterIndex == -1 ? '' : rest.substring(delimiterIndex);

  final int hashIndex = tail.indexOf('#');

  if (hashIndex != -1) {
    final String fragment = tail.substring(hashIndex + 1);

    hash = fragment.isEmpty ? null : fragment;
    tail = tail.substring(0, hashIndex);
  }

  final int queryIndex = tail.indexOf('?');

  if (queryIndex != -1) {
    final String queryString = tail.substring(queryIndex + 1);

    query = queryString.isEmpty ? null : queryString;
    params = queryString.isEmpty ? null : _parseQuery(queryString, decode);
    tail = tail.substring(0, queryIndex);
  }

  path = tail.isEmpty ? null : tail;

  if (authority.isEmpty) {
    return ParsedAddress(
      error: error,
      protocol: protocol,
      defaultPort: defaultPort,
      path: path,
      query: query,
      params: params,
      hash: hash,
    );
  }

  // Split the user information off by the last `@`, so an `@` inside the
  // password stays.
  String hostPort = authority;
  final int atIndex = authority.lastIndexOf('@');

  if (atIndex != -1) {
    final String userInfo = authority.substring(0, atIndex);

    hostPort = authority.substring(atIndex + 1);

    // Split the user off by the first `:`, so a `:` inside the password stays.
    final int colonIndex = userInfo.indexOf(':');
    final String u =
        colonIndex == -1 ? userInfo : userInfo.substring(0, colonIndex);
    final String p = colonIndex == -1 ? '' : userInfo.substring(colonIndex + 1);

    user = u.isEmpty ? null : (decode ? _percentDecode(u) : u);
    pass = p.isEmpty ? null : (decode ? _percentDecode(p) : p);
  }

  void parsePort(String portString) {
    if (portString.isEmpty) {
      return;
    }

    final int? parsed = int.tryParse(portString);

    if (!_digitsOnly.hasMatch(portString) || parsed == null || parsed > 65535) {
      error = true;

      return;
    }

    port = parsed;
  }

  if (hostPort.startsWith('[')) {
    // Bracketed IPv6. The brackets are kept as part of the host and dropped
    // from the hostname.
    final int closeIndex = hostPort.indexOf(']');

    if (closeIndex == -1) {
      return ParsedAddress(
        error: true,
        protocol: protocol,
        defaultPort: defaultPort,
        user: user,
        pass: pass,
        path: path,
        query: query,
        params: params,
        hash: hash,
      );
    }

    host = hostPort.substring(0, closeIndex + 1);

    final String after = hostPort.substring(closeIndex + 1);

    if (after.isEmpty) {
      // No port.
    } else if (after.startsWith(':')) {
      parsePort(after.substring(1));
    } else {
      error = true;
    }
  } else {
    final int colonCount = ':'.allMatches(hostPort).length;

    if (colonCount >= 2) {
      // Bare IPv6 without brackets (`::1`, `fe80::1`). It cannot carry a port,
      // because the colon before it cannot be told from the ones inside the
      // address.
      host = hostPort;
    } else if (colonCount == 1) {
      final List<String> parts = hostPort.split(':');

      host = parts[0].isEmpty ? null : parts[0];
      parsePort(parts[1]);
    } else {
      host = hostPort.isEmpty ? null : hostPort;
    }
  }

  if (host != null) {
    hostname = host.startsWith('[') ? host.substring(1, host.length - 1) : host;
    isIPv6 = _isIPv6Address(hostname);
    isIP = isIPv6 || _isIPv4Address(hostname);
  }

  return ParsedAddress(
    error: error,
    protocol: protocol,
    host: host,
    hostname: hostname,
    port: port,
    defaultPort: defaultPort,
    user: user,
    pass: pass,
    path: path,
    query: query,
    params: params,
    hash: hash,
    isIP: isIP,
    isIPv6: isIPv6,
  );
}
