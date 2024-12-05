---
title: Web <span class="VPBadge tip menu-badge">plugin:web</span>
order: 100
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
_.isMatchPathname('/user/login', '/admin'); // Returns false
_.isMatchPathname('/user/login', '/user*'); // Returns true
_.isMatchPathname('/user/login', ['/test', '/home/hello', '/user/*']); // Returns true
```

## `isBotAgent`

Analyze the user agent value to determine if it's a bot for a search engine. Returns `true` if it's a bot.

### Parameters

- `userAgent::string`

### Returns

> boolean

### Examples

```javascript
_.isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
```

## `removeLocalePrefix`

URL 또는 pathname에서 1단계 경로를 제거합니다. 일반적으로 로캐일 프리픽스를 사용하는 URL에서 특수한 경우 로캐일 없는 경로가 필요할 때 사용합니다. 예를 들어, `/en/hello`는 `/hello`와 같이 변환됩니다.

첫번째 인자에는 URL이나 pathname을 넣을 수 있습니다. URL을 사용할 때는 프로토콜(예: `https://`)을 포함합니다. 두번째 인자에는 지원하는 로캐일이 하나 이상 포함되어야 합니다. (예: `en`, `['ko', 'en', 'it', 'de']`)

### Parameters

- `pathname::string`
- `matcher::string|string[]`

### Returns

> boolean

### Examples

```javascript
_.removeLocalePrefix('/ko/user/login', ['ko', 'en']); // Returns '/user/login'
_.removeLocalePrefix('https://qsu.cdget.com/ko/user/login', ['ko', 'en']); // Returns 'https://qsu.cdget.com/user/login'
```

## `license`

Returns text in a specific license format based on the author information of the given argument. The argument uses the Object type.

### Parameters

- `options::LicenseOption{ author: string, email: string?, yearStart: string|number, yearEnd: string?, htmlBr: boolean?, type: 'mit' | 'apache20' }`

### Returns

> string

### Examples

```javascript
_.license({
	holder: 'example',
	email: 'example@example.com',
	yearStart: 2020,
	yearEnd: 2021,
	htmlBr: true
});
```
