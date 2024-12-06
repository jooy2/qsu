---
title: Web <span class="VPBadge tip menu-badge">plugin:web</span>
order: 101
---

# Methods: Web <Badge type="tip" text="Plugin:qsu-web" />

This method is only available in the `qsu-web` (JavaScript) package.

## `isMatchPathname`

You can check if the URL path in the first argument value is matched against the second set of rules. The matching rules can take a string or an array of strings, where both arguments are paths that start with `/`. You can use wildcards (`*`) in the rules. For example, `user/*` would match all pages that start with `/user`.

### Parameters

- `pathname::string`
- `matcher::string|string[]`

### Returns

> boolean

### Examples

```javascript
isMatchPathname('/user/login', '/admin'); // Returns false
isMatchPathname('/user/login', '/user*'); // Returns true
isMatchPathname('/user/login', ['/test', '/home/hello', '/user/*']); // Returns true
```

## `isBotAgent`

Analyze the user agent value to determine if it's a bot for a search engine. Returns `true` if it's a bot.

### Parameters

- `userAgent::string`

### Returns

> boolean

### Examples

```javascript
isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
```

## `removeLocalePrefix`

Removes the first-level path from a URL or pathname. Use this when you need a locale-free path in special cases in a URL that normally uses locale prefixes. For example, `/en/hello` is converted to `/hello`.

The first argument can be a URL or a pathname. When using a URL, include the protocol (for example, `https://`). The second argument must contain at least one supported locale (e.g., `en`, `['en', 'en', 'it', 'de']`).

### Parameters

- `pathname::string`
- `matcher::string|string[]`

### Returns

> boolean

### Examples

```javascript
removeLocalePrefix('/ko/user/login', ['ko', 'en']); // Returns '/user/login'
removeLocalePrefix('https://qsu.cdget.com/ko/user/login', ['ko', 'en']); // Returns 'https://qsu.cdget.com/user/login'
```

## `license`

Returns text in a specific license format based on the author information of the given argument. The argument uses the Object type.

### Parameters

- `options::LicenseOption{ author: string, email: string?, yearStart: string|number, yearEnd: string?, htmlBr: boolean?, type: 'mit' | 'apache20' }`

### Returns

> string

### Examples

```javascript
license({
	holder: 'example',
	email: 'example@example.com',
	yearStart: 2020,
	yearEnd: 2021,
	htmlBr: true
});
```
