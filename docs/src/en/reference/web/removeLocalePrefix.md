# removeLocalePrefix <Lang js dart python />

Removes the first-level path from a URL or pathname. Use this when you need a locale-free path in special cases in a URL that normally uses locale prefixes. For example, `/en/hello` is converted to `/hello`.

The first argument can be a URL or a pathname. When using a URL, include the protocol (for example, `https://`). The second argument must contain at least one supported locale (e.g., `en`, `['en', 'en', 'it', 'de']`).

## Parameters

<ParamsTable :rows="[
	{ name: 'pathname', type: 'string', required: true },
	{ name: 'matcher', type: 'string | string[]', required: true }
]" />

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
removeLocalePrefix('/ko/user/login', ['ko', 'en']); // Returns '/user/login'
removeLocalePrefix('https://qsu.cdget.com/ko/user/login', ['ko', 'en']); // Returns 'https://qsu.cdget.com/user/login'
```

```dart [Dart]
removeLocalePrefix('/ko/user/login', ['ko', 'en']); // Returns '/user/login'
removeLocalePrefix('https://qsu.cdget.com/ko/user/login', ['ko', 'en']); // Returns 'https://qsu.cdget.com/user/login'
```

```python [Python]
removeLocalePrefix('/ko/user/login', ['ko', 'en'])  # Returns '/user/login'
removeLocalePrefix('https://qsu.cdget.com/ko/user/login', ['ko', 'en'])  # Returns 'https://qsu.cdget.com/user/login'
```

:::
