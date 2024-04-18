---
title: Date
order: 7
---

# API: Date

## `_.dayDiff`

Calculates the difference between two given dates and returns the number of days.

### Parameters

- `date1::Date`
- `date2::Date?`

### Returns

> number

### Examples

```javascript
_.daydiff(new Date('2021-01-01'), new Date('2021-01-03')); // Returns 2
```

## `_.today`

Returns today's date.

### Parameters

- `separator::string = '-'`
- `yearFirst::boolean = false`

### Returns

> string

### Examples

```javascript
_.today(); // Returns YYYY-MM-DD
_.today('/'); // Returns YYYY/MM/DD
_.today('/', false); // Returns DD/MM/YYYY
```

## `_.isValidDate`

Checks if a given date actually exists. Check only in `YYYY-MM-DD` format.

### Parameters

- `date::string`

### Returns

> boolean

### Examples

```javascript
_.isValidDate('2021-01-01'); // Returns true
_.isValidDate('2021-02-30'); // Returns false
```

## `_.dateToYYYYMMDD`

Returns the date data of a Date object in the format `YYYY-MM-DD`.

### Parameters

- `date::Date`
- `separator:string`

### Returns

> string

### Examples

```javascript
_.dateToYYYYMMDD(new Date(2023, 11, 31)); // Returns '2023-12-31'
```

## `_.createDateListFromRange`

Create an array list of all dates from `startDate` to `endDate` in the format `YYYY-MM-DD`.

### Parameters

- `startDate::Date`
- `endDate::Date`

### Returns

> string[]

### Examples

```javascript
_.createDateListFromRange(new Date('2023-01-01T01:00:00Z'), new Date('2023-01-05T01:00:00Z'));

/*
	 [
		 '2023-01-01',
		 '2023-01-02',
		 '2023-01-03',
		 '2023-01-04',
		 '2023-01-05'
	 ]
 */
```
