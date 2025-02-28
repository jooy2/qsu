# removeLocalePrefix <Badge type="tip" text="JavaScript" />

Removes the first-level path from a URL or pathname. Use this when you need a locale-free path in special cases in a URL that normally uses locale prefixes. For example, `/en/hello` is converted to `/hello`.

The first argument can be a URL or a pathname. When using a URL, include the protocol (for example, `https://`). The second argument must contain at least one supported locale (e.g., `en`, `['en', 'en', 'it', 'de']`).

## Parameters

- `pathname::string`
- `matcher::string|string[]`

## Returns

> boolean

## Examples

```javascript
removeLocalePrefix('/ko/user/login', ['ko', 'en']); // Returns '/user/login'
removeLocalePrefix('https://qsu.cdget.com/ko/user/login', ['ko', 'en']); // Returns 'https://qsu.cdget.com/user/login'
```
