# objTo1d <Lang dart js />

주어진 객체의 객체를 자식 항목의 최상위 레벨로 병합하고, 기존 키 대신 구분 기호(기본적으로 `.`)를 사용하여 단계별로 키 이름을 표시합니다. 예를 들어, 객체 `a`에 키 `b`, `c`, `d`가 있는 경우, `a` 키는 표시되지 않고, 부모 단계에 키와 값 `a.b`, `a.c`, `a.d`가 표시됩니다.

## Parameters

- `obj::object`
- `separator::string` <span class="named">Dart:Named</span>

## Returns

> object

## Examples

::: code-group

```javascript [JavaScript]
objTo1d({
	a: 1,
	b: {
		aa: 1,
		bb: 2
	},
	c: 3
});

/*
Returns:
{
	a: 1,
	'b.aa': 1,
	'b.bb': 2,
	c: 3
}
 */
```

```dart [Dart]
objTo1d({
  'a': 1,
  'b': {
    'aa': 1,
		'bb': 2
  },
  'c': 3
});

/*
Returns:
{
	'a': 1,
	'b.aa': 1,
	'b.bb': 2,
	'c': 3
}
 */
```

:::
