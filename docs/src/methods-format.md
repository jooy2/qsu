# Methods: Format

## `_.numberFormat (string)`

Return number format including comma symbol.

- `number::number`

```javascript
_.numberFormat(1234567); // Returns 1,234,567
```

## `_.fileName (string)`

Extract the file name from the path. Include the extension if withExtension is `true`.

- `filePath::string`
- `withExtension::boolean || false`

```javascript
_.fileName('C:Temphello.txt'); // Returns 'hello.txt'
_.fileName('C:Temp\file.mp3', true); // Returns 'file.mp3'
```

## `_.fileSize (string)`

Converts the file size in bytes to human-readable and returns it. The return value is a String and includes the file units (Bytes, MB, GB...). If the second optional argument value is included, you can display as many decimal places as you like.

- `bytes::number`
- `decimals::number || 2`

```javascript
_.fileSize(2000, 3); // Returns '1.953 KB'
_.fileSize(250000000); // Returns '238.42 MB'
```

## `_.fileExt (string)`

Returns only the extensions in the file path. If unknown, returns 'Unknown'.

- `filePath::string`

```javascript
_.fileExt('C:Temphello.txt'); // Returns 'txt'
_.fileExt('this-is-file.mp3'); // Returns 'mp3'
```

## `_.msToTime (string)`

Converts milliseconds to hours, minutes, seconds, and milliseconds and returns. If the second argument is true, milliseconds are also printed. You can put any separator (String) between hours, minutes, and seconds in the third argument.

- `milliseconds::number`
- `withMilliseconds::boolean || false`
- `separator::string || ':'`

```javascript
_.msToTime(100000); // 'Returns '00:01:40'
_.msToTime(100000, true, '-'); // Returns '00-01-40.0'
```

## `_.secToTime (string)`

Converts seconds to hours, minutes, seconds and returns. You can put any separator (String) between hours, minutes, and seconds in the third argument.

- `seconds::number`
- `onlyHour::boolean || false`
- `separator::string || ':'`

```javascript
_.secToTime(3800); // Returns '01:03:20'
_.secToTime(60, '-'); // Returns '00-01-00'
```

## `_.license (string)`

Returns text in a specific license format based on the author information of the given argument. The argument uses the Object type.

- `options::LicenseOption{ author: string, email: string?, yearStart: string|number, yearEnd: string?, htmlBr: boolean?, type: 'mit' | 'apache20' }`

```javascript
_.license({
	holder: 'example',
	email: 'example@example.com',
	yearStart: 2020,
	yearEnd: 2021,
	htmlBr: true
});
```
