# createDateListFromRange <Badge type="tip" text="JavaScript" />

`YYYY-MM-DD` 형식으로 `시작일`부터 `종료일`까지의 모든 날짜의 배열 목록을 만듭니다.

## Parameters

- `startDate::Date`
- `endDate::Date`

## Returns

> string[]

## Examples

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
