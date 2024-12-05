---
title: Web <span class="VPBadge tip menu-badge">plugin:web</span>
order: 100
---

# Methods: Web <Badge type="tip" text="Plugin:qsu-web" />

This method is only available in the `qsu-web` (JavaScript) package.

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
