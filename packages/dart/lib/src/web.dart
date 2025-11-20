/// Removes the first-level path from a URL or pathname. Use this when you need a locale-free path in special cases in a URL that normally uses locale prefixes. For example, `/en/hello` is converted to `/hello`.
String removeLocalePrefix(String urlOrPathname, dynamic locales) {
  final List<String> localeLists =
      locales is List<String> ? locales : [locales.toString()];
  final String trimmed = urlOrPathname.replaceFirst(RegExp(r'^/'), '');

  if (localeLists.contains(trimmed)) {
    return '';
  }

  if (urlOrPathname == '/') {
    return '/';
  }

  final String joinLocaleLists = localeLists.join('|');

  try {
    final Uri uri = Uri.parse(urlOrPathname);
    final String path = uri.path;

    if (path == '/' ||
        localeLists.contains(path.replaceFirst(RegExp(r'^/'), ''))) {
      return uri.origin;
    }

    final String newPath =
        path.replaceFirst(RegExp('^/($joinLocaleLists)/'), '/');

    return (uri.origin + newPath).replaceAll(RegExp(r'/$'), '');
  } catch (_) {
    String realPath = urlOrPathname;

    if (!realPath.startsWith('/')) {
      realPath = '/$realPath';
    }

    if (realPath.endsWith('/')) {
      realPath = realPath.replaceFirst(RegExp(r'/$'), '');
    }

    if (RegExp('^/($joinLocaleLists)\$').hasMatch(realPath)) {
      return '/';
    }

    return realPath.replaceFirst(RegExp('^/($joinLocaleLists)/'), '/');
  }
}
