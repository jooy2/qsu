# isValidDate <Badge type="tip" text="JavaScript" />

Checks if a given date actually exists. Check only in `YYYY-MM-DD` format.

The date can be checked only from `1600-01-01` to `9999-12-31` and all dates before `1600` are returned as `false`.

## Parameters

- `date::string`

## Returns

> boolean

## Examples

```javascript
isValidDate('2021-01-01'); // Returns true
isValidDate('2021-02-30'); // Returns false
```
