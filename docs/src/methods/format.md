---
title: Format
order: 6
---

# Methods: Format

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

## `_.msToTime`

Converts milliseconds to hours, minutes, seconds, and milliseconds and returns. If the second argument is true, milliseconds are also printed. You can put any separator (String) between hours, minutes, and seconds in the third argument.

### Parameters

- `milliseconds::number`
- `withMilliseconds::boolean || false`
- `separator::string || ':'`

### Returns

> string

### Examples

```javascript
_.msToTime(100000); // 'Returns '00:01:40'
_.msToTime(100000, true, '-'); // Returns '00-01-40.0'
```

## `_.secToTime`

Converts seconds to hours, minutes, seconds and returns. You can put any separator (String) between hours, minutes, and seconds in the third argument.

### Parameters

- `seconds::number`
- `onlyHour::boolean || false`
- `separator::string || ':'`

### Returns

> string

### Examples

```javascript
_.secToTime(3800); // Returns '01:03:20'
_.secToTime(60, '-'); // Returns '00-01-00'
```
