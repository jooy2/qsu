# escapeRegExp <Lang dart js python />

문자열에 포함된 정규식 메타문자를 모두 이스케이프하여, 해당 값을 패턴에 그대로 넣어도 문자 그대로 매칭되도록 만듭니다.

이스케이프 대상은 `^`, `$`, `.`, `*`, `+`, `?`, `(`, `)`, `[`, `]`, `{`, `}`, `|`, `\`입니다. JavaScript·Dart·Python 모두가 문자 클래스 **바깥에서** 문법으로 해석하는 문자들의 합집합입니다.

`-`와 `#`는 의도적으로 제외했습니다. 이 두 문자는 문자 클래스 안이나 Python의 verbose 모드에서만 특별하게 취급되며, JavaScript의 unicode 모드에서는 문자 클래스 바깥의 `\-` 자체가 문법 오류입니다. 문자 클래스를 만드는 경우라면 이 두 문자는 직접 이스케이프해야 합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '이스케이프할 문자열입니다. 값이 비어 있으면 빈 문자열을 반환합니다.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
escapeRegExp('1 + 1 = 2'); // Returns '1 \\+ 1 = 2'
escapeRegExp('[qsu](https://qsu.cdget.com/)'); // Returns '\\[qsu\\]\\(https://qsu\\.cdget\\.com/\\)'
escapeRegExp('a-z #1'); // Returns 'a-z #1'

new RegExp(escapeRegExp('a.b')).test('a.b'); // Returns true
new RegExp(escapeRegExp('a.b')).test('axb'); // Returns false
```

```dart [Dart]
escapeRegExp('1 + 1 = 2'); // Returns '1 \\+ 1 = 2'
escapeRegExp('[qsu](https://qsu.cdget.com/)'); // Returns '\\[qsu\\]\\(https://qsu\\.cdget\\.com/\\)'
escapeRegExp('a-z #1'); // Returns 'a-z #1'

RegExp(escapeRegExp('a.b')).hasMatch('a.b'); // Returns true
RegExp(escapeRegExp('a.b')).hasMatch('axb'); // Returns false
```

```python [Python]
escapeRegExp('1 + 1 = 2')  # Returns '1 \\+ 1 = 2'
escapeRegExp('[qsu](https://qsu.cdget.com/)')  # Returns '\\[qsu\\]\\(https://qsu\\.cdget\\.com/\\)'
escapeRegExp('a-z #1')  # Returns 'a-z #1'

bool(re.search(escapeRegExp('a.b'), 'a.b'))  # Returns True
bool(re.search(escapeRegExp('a.b'), 'axb'))  # Returns False
```

:::
