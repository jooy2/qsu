---
title: Date
order: 7
---

# API: Date

## `dayDiff` <Badge type="tip" text="JavaScript" />

Calculates the difference between two given dates and returns the number of days.

### Parameters

- `date1::Date`
- `date2::Date?`

### Returns

> number

### Examples

```javascript
daydiff(new Date('2021-01-01'), new Date('2021-01-03')); // Returns 2
```

## `today` <Badge type="tip" text="JavaScript" />

Returns today's date.

### Parameters

- `separator::string = '-'`
- `yearFirst::boolean = false`

### Returns

> string

### Examples

```javascript
today(); // Returns YYYY-MM-DD
today('/'); // Returns YYYY/MM/DD
today('/', false); // Returns DD/MM/YYYY
```

## `isValidDate` <Badge type="tip" text="JavaScript" />

Checks if a given date actually exists. Check only in `YYYY-MM-DD` format.

### Parameters

- `date::string`

### Returns

> boolean

### Examples

```javascript
isValidDate('2021-01-01'); // Returns true
isValidDate('2021-02-30'); // Returns false
```

## `dateToYYYYMMDD` <Badge type="tip" text="JavaScript" />

Returns the date data of a Date object in the format `YYYY-MM-DD`.

### Parameters

- `date::Date`
- `separator:string`

### Returns

> string

### Examples

```javascript
dateToYYYYMMDD(new Date(2023, 11, 31)); // Returns '2023-12-31'
```

## `createDateListFromRange` <Badge type="tip" text="JavaScript" />

Create an array list of all dates from `startDate` to `endDate` in the format `YYYY-MM-DD`.

### Parameters

- `startDate::Date`
- `endDate::Date`

### Returns

> string[]

### Examples

```javascript
createDateListFromRange(new Date('2023-01-01T01:00:00Z'), new Date('2023-01-05T01:00:00Z'));

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
