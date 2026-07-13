# objToPrettyStr <Lang js python />

JSON 객체의 모든 단계를 반복적으로 출력한 다음(`JSON.stringify`) 줄 바꿈과 탭 문자를 사용하여 JSON 객체를 출력하면, 예를 들어 `console` 함수에서 읽기 쉽게 만들 수 있습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
objToPrettyStr({ a: 1, b: { c: 1, d: 2 } }); // Returns '{\n\t"a": 1,\n\t"b": {\n\t\t"c": 1,\n\t\t"d": 2\n\t}\n}'
```

```python [Python]
objToPrettyStr({ 'a': 1, 'b': { 'c': 1, 'd': 2 } })  # Returns '{\n\t"a": 1,\n\t"b": {\n\t\t"c": 1,\n\t\t"d": 2\n\t}\n}'
```

:::
