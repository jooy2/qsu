# createDateListFromRange <Lang js dart />

Create an array list of all dates from `startDate` to `endDate` in the format `YYYY-MM-DD`.

## Parameters

- `startDate::Date`
- `endDate::Date`

## Returns

> string[]

## Examples

::: code-group

```javascript [JavaScript]
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

```dart [Dart]
createDateListFromRange(DateTime.utc(2023, 1, 1, 1, 0, 0), DateTime.utc(2023, 1, 5, 1, 0, 0));

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

:::
