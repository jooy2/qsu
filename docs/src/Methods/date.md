---
title: Date
order: 3
---

# Methods: Date

## `_.dayDiff (number)`

Calculates the difference between two given dates and returns the number of days.

- `date1::Date`
- `date2::Date?`

```javascript
_.daydiff(new Date('2021-01-01'), new Date('2021-01-03')); // Returns 2
```

## `_.today (string)`

Returns today's date.

- `separator::string = '-'`
- `yearFirst::boolean = false`

```javascript
_.today(); // Returns YYYY-MM-DD
_.today('/'); // Returns YYYY/MM/DD
_.today('/', false); // Returns DD/MM/YYYY
```

## `_.isValidDate (boolean)`

Checks if a given date actually exists. Check only in `YYYY-MM-DD` format.

- `date::string`

```javascript
_.isValidDate('2021-01-01'); // Returns true
_.isValidDate('2021-02-30'); // Returns false
```

## `_.dateToYYYYMMDD (string)`

Returns the date data of a Date object in the format `YYYY-MM-DD`.

- `date::Date`
- `separator:string`

```javascript
_.dateToYYYYMMDD(new Date(2023, 11, 31)); // Returns '2023-12-31'
```

## `_.createDateListFromRange (string[])`

Create an array list of all dates from `startDate` to `endDate` in the format `YYYY-MM-DD`.

- `startDate::Date`
- `endDate::Date`

```javascript
_.createDateListFromRange(new Date('2023-01-01T01:00:00Z'), new Date('2023-01-05T01:00:00Z'));

/*
	Returns:
	 [
		 '2023-01-01',
		 '2023-01-02',
		 '2023-01-03',
		 '2023-01-04',
		 '2023-01-05'
	 ]
 */
```
