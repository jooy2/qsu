---
title: Format
order: 8
---

# API: Format

## `numberFormat` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Return number format including comma symbol.

### Parameters

- `number::number`

### Returns

> string

### Examples

```javascript
numberFormat(1234567); // Returns 1,234,567
```

```dart
numberFormat(1234567); // Returns 1,234,567
```

## `duration` <Badge type="tip" text="JavaScript" />

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
duration(1234567890); // 'Returns '14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
duration(604800000, {
	useSpace: false
}); // Returns '7Days'
```

## `safeJSONParse` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Attempts to parse without returning an error, even if the argument value is of the wrong type or in `JSON` format. If parsing fails, it will be replaced with the object set in `fallback`. The default value for `fallback` is an empty object.

### Parameters

- `jsonString::any`
- `fallback::object`

### Returns

> object

### Examples

```javascript
const result1 = safeJSONParse('{"a":1,"b":2}');
const result2 = safeJSONParse(null);

console.log(result1); // Returns { a: 1, b: 2 }
console.log(result2); // Returns {}
```

## `safeParseInt` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Any argument value will be attempted to be parsed as a Number type without returning an error. If parsing fails, it is replaced by the number set in `fallback`. The default value for `fallback` is `0`. You can specify `radix` (default is decimal: `10`) in the third argument.

### Parameters

- `value::any`
- `fallback::number`
- `radix::number`

### Returns

> number

### Examples

```javascript
const result1 = safeParseInt('00010');
const result2 = safeParseInt('10.1234');
const result3 = safeParseInt(null, -1);

console.log(result1); // Returns 10
console.log(result2); // Returns 10
console.log(result3); // Returns -1
```
