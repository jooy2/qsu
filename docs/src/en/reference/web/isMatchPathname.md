# isMatchPathname <Lang js dart />

You can check if the URL path in the first argument value is matched against the second set of rules. The matching rules can take a string or an array of strings, where both arguments are paths that start with `/`. You can use wildcards (`*`) in the rules. For example, `user/*` would match all pages that start with `/user`.

## Parameters

- `pathname::string`
- `matcher::string|string[]`

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
isMatchPathname('/user/login', '/admin'); // Returns false
isMatchPathname('/user/login', '/user*'); // Returns true
isMatchPathname('/user/login', ['/test', '/home/hello', '/user/*']); // Returns true
```

```dart [Dart]
isMatchPathname('/user/login', '/admin'); // Returns false
isMatchPathname('/user/login', '/user*'); // Returns true
isMatchPathname('/user/login', ['/test', '/home/hello', '/user/*']); // Returns true
```

:::
