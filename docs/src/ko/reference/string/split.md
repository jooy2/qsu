# split
지정된 문자를 기준으로 문자열을 분할하여 배열로 반환합니다. 기존의 split과는 달리, 여러 개의 매개변수(배열 또는 여러 개의 인수)로 제공된 값을 한 번에 분할합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'splitter', type: { js: 'string | string[] | ...string', dart: 'List<String>' }, required: true }
]" />

## Returns

<ReturnType type="string[]" />

## Examples

::: lang js

```javascript
split('hello% js world', '% '); // Returns ['hello', 'js world']
split('hello,js,world', ','); // Returns ['hello', 'js', 'world']
split('hello%js,world', ',', '%'); // Returns ['hello', 'js', 'world']
split('hello%js,world', [',', '%']); // Returns ['hello', 'js', 'world']
```

:::

::: lang dart

```dart
split('hello% js world', ['% ']); // Returns ['hello', 'js world']
split('hello,js,world', [',']); // Returns ['hello', 'js', 'world']
split('hello%js,world', [',', '%']); // Returns ['hello', 'js', 'world']
```

:::

::: lang python

```python
split('hello% js world', '% ')  # Returns ['hello', 'js world']
split('hello,js,world', ',')  # Returns ['hello', 'js', 'world']
split('hello%js,world', ',', '%')  # Returns ['hello', 'js', 'world']
split('hello%js,world', [',', '%'])  # Returns ['hello', 'js', 'world']
```

:::
