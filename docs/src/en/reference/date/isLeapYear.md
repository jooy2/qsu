# isLeapYear

Returns `true` when the year is a leap year in the Gregorian calendar: one divisible by 4, except for years divisible by 100 that are not also divisible by 400. 2024 and 2000 are leap years; 2023 and 1900 are not.

The rule is applied to every year, including year 0 and years before it, the way the proleptic Gregorian calendar counts them.

For the length of a month, use [getDaysInMonth](./getDaysInMonth).

## Parameters

<ParamsTable :rows="[
	{ name: 'year', type: 'number', required: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isLeapYear(2024); // Returns true
isLeapYear(2023); // Returns false
isLeapYear(1900); // Returns false
isLeapYear(2000); // Returns true
```

:::

::: lang dart

```dart
isLeapYear(2024); // Returns true
isLeapYear(2023); // Returns false
isLeapYear(1900); // Returns false
isLeapYear(2000); // Returns true
```

:::

::: lang python

```python
isLeapYear(2024)  # Returns True
isLeapYear(2023)  # Returns False
isLeapYear(1900)  # Returns False
isLeapYear(2000)  # Returns True
```

:::
