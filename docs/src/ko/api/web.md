---
title: Web <span class="VPBadge tip menu-badge">plugin:web</span>
order: 101
---

# Methods: Web <Badge type="tip" text="Plugin:qsu-web" />

This method is only available in the `qsu-web` (JavaScript) package.

## `isMatchPathname`

처음 인자값의 URL 경로가 두번째 rule set에 매칭되는지 확인할 수 있습니다. 매칭 규칙은 string 또는 string으로 구성된 배열을 사용할 수 있으며, 두 인자 모두 경로는 `/`으로 시작합니다. 규칙에는 와일드카드(`*`)를 사용할 수 있습니다. 예를 들어 `user/*`인 경우 `/user`로 시작되는 페이지가 모두 해당됩니다.

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

URL 또는 pathname에서 1단계 경로를 제거합니다. 일반적으로 로캐일 프리픽스를 사용하는 URL에서 특수한 경우 로캐일 없는 경로가 필요할 때 사용합니다. 예를 들어, `/en/hello`는 `/hello`와 같이 변환됩니다.

첫번째 인자에는 URL이나 pathname을 넣을 수 있습니다. URL을 사용할 때는 프로토콜(예: `https://`)을 포함합니다. 두번째 인자에는 지원하는 로캐일이 하나 이상 포함되어야 합니다. (예: `en`, `['ko', 'en', 'it', 'de']`)

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
