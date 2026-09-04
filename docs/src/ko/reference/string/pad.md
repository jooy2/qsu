# pad <Lang js dart python />

문자열이 지정한 길이가 될 때까지 문자를 채웁니다. `position` 옵션으로 세 방향을 모두 처리하므로 Lodash의 `pad`, `padStart`, `padEnd`를 하나로 대신합니다.

기본값은 양쪽을 모두 채우는 것으로, Lodash의 `pad`와 동일합니다. 양쪽을 똑같이 나눌 수 없으면 남는 한 글자는 뒤쪽에 붙습니다. `pad('abc', 8)`은 `'  abc   '`를 반환합니다.

`char`가 두 글자 이상이면 반복해서 채우고 남는 부분에서 잘립니다. `pad('abc', 8, { char: '_-' })`는 `'_-abc_-_'`를 반환합니다.

문자열이 이미 `length` 이상이거나 `char`가 비어 있으면 원본을 그대로 반환합니다. 길이는 코드 포인트 단위로 세므로 BMP 밖의 문자도 세 언어 모두에서 한 글자로 계산됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '채울 대상 문자열입니다. 값이 없으면 빈 문자열로 보고 지정한 길이만큼 전부 채웁니다.' },
	{ name: 'length', type: 'number', required: true, desc: '목표 길이입니다. 코드 포인트 단위로 셉니다.' },
	{ name: 'options', type: 'PadOptions', named: true, desc: '채우기 옵션입니다. 아래 표를 참고하세요.' }
]" />

<ParamsTable name="PadOptions" :rows="[
	{ name: 'position', type: `'start' | 'end' | 'both'`, default: `'both'`, desc: '어느 쪽을 채울지 지정합니다. `both`는 양쪽으로 나누어 채우며, 남는 한 글자는 뒤쪽에 붙습니다.' },
	{ name: 'char', type: 'string', default: `' '`, desc: '채울 문자입니다. 두 글자 이상이면 반복하며 남는 부분에서 잘립니다. 빈 값이면 원본을 그대로 반환합니다.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
pad('abc', 8); // Returns '  abc   '
pad('abc', 8, { char: '_-' }); // Returns '_-abc_-_'
pad('abc', 8, { position: 'start' }); // Returns '     abc'
pad('abc', 8, { position: 'end' }); // Returns 'abc     '
pad('5', 3, { position: 'start', char: '0' }); // Returns '005'
pad('abcdefgh', 4); // Returns 'abcdefgh'
```

:::

::: lang dart

```dart
pad('abc', 8); // Returns '  abc   '
pad('abc', 8, char: '_-'); // Returns '_-abc_-_'
pad('abc', 8, position: 'start'); // Returns '     abc'
pad('abc', 8, position: 'end'); // Returns 'abc     '
pad('5', 3, position: 'start', char: '0'); // Returns '005'
pad('abcdefgh', 4); // Returns 'abcdefgh'
```

:::

::: lang python

```python
pad('abc', 8)  # Returns '  abc   '
pad('abc', 8, {'char': '_-'})  # Returns '_-abc_-_'
pad('abc', 8, {'position': 'start'})  # Returns '     abc'
pad('abc', 8, {'position': 'end'})  # Returns 'abc     '
pad('5', 3, position='start', char='0')  # Returns '005'
pad('abcdefgh', 4)  # Returns 'abcdefgh'
```

:::
