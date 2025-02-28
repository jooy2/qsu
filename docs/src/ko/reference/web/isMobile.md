# isMobile <Badge type="tip" text="JavaScript" />

Checks if the current user is accessing from a mobile device via the User Agent string. This function returns `false` for tablet users.

## Parameters

- `userAgent::string`

## Returns

> boolean

## Examples

```javascript
isMobile(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
); // Returns false
isMobile(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
); // Returns true
```
