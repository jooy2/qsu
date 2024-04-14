---
title: Format
order: 6
---

# API: Format

## `_.numberFormat`

Return number format including comma symbol.

### Parameters

- `number::number`

### Returns

> string

### Examples

```javascript
_.numberFormat(1234567); // Returns 1,234,567
```

## `_.fileName`

Extract the file name from the path. Include the extension if withExtension is `true`.

### Parameters

- `filePath::string`
- `withExtension::boolean || false`

### Returns

> string

### Examples

```javascript
_.fileName('C:Temphello.txt'); // Returns 'hello.txt'
_.fileName('C:Temp\file.mp3', true); // Returns 'file.mp3'
```

## `_.fileSize`

Converts the file size in bytes to human-readable and returns it. The return value is a String and includes the file units (Bytes, MB, GB...). If the second optional argument value is included, you can display as many decimal places as you like.

### Parameters

- `bytes::number`
- `decimals::number || 2`

### Returns

> string

### Examples

```javascript
_.fileSize(2000, 3); // Returns '1.953 KB'
_.fileSize(250000000); // Returns '238.42 MB'
```

## `_.fileExt`

Returns only the extensions in the file path. If unknown, returns 'Unknown'.

### Parameters

- `filePath::string`

### Returns

> string

### Examples

```javascript
_.fileExt('C:Temphello.txt'); // Returns 'txt'
_.fileExt('this-is-file.mp3'); // Returns 'mp3'
```

## `_.duration`

Displays the given millisecond value in human-readable time. For example, the value of `604800000` (7 days) is displayed as `7 Days`.

### Parameters

- `milliseconds::number`
- `options::DurationOptions | undefined`

```typescript
const {
	// Converts to `Days` -> `D`, `Hours` -> `H`,  `Minutes` -> `M`, `Seconds` -> `S`, `Milliseconds` -> `ms`
	useShortString = false,
	// Use space (e.g. `1Days` -> `1 Days`)
	useSpace = true,
	// Do not include units with a value of 0.
	withZeroValue = false,
	// Use Separator (e.g. If separator value is `-`, result is: `1 Hour 10 Minutes` -> `1 Hour-10 Minutes`)
	separator = ' '
}: DurationOptions = options;
```

### Returns

> string

### Examples

```javascript
_.duration(1234567890); // 'Returns '14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
_.duration(604800000, {
	useSpace: false
}); // Returns '7Days'
```
