# hasBadWords <Lang dart js python />

주어진 텍스트에 금지어가 포함되어 있으면 `true`를 반환합니다. 금지어 목록은 전적으로 사용자가 전달하며, 이 함수는 자체 목록을 포함하지 않습니다.

대소문자를 구분하지 않으며, 더 긴 단어 안에 금지어가 들어있는 경우에도 포함으로 봅니다. (`pineapple`은 `apple`을 포함합니다)

단순 포함 외에도, 금지어를 숨기는 흔한 방법들을 함께 검사합니다:

- 글자 사이에 문자를 끼워 넣은 경우: `ad___min`, `a.d.m.i.n`, `ad$min`
- 모양이 비슷한 문자(리트 스피크 숫자, 발음 구별 기호, 전각 문자, 키릴/그리스 문자 등): `adm1n`, `4pp13`, `ａｄｍｉｎ`, `ádmín`
- 글자를 대신하는 기호: `@dm1n`
- 자음과 모음을 분리한 한글. 모양이 비슷한 알파벳을 섞은 경우도 포함합니다: `ㅅㅏㄱㅗㅏ`와 `ㅅr과`는 모두 `사과`로 읽습니다

공백을 사이에 두고 나뉜 금지어는 단어의 시작 위치에서 시작할 때만 검출합니다. 금지어가 `admin`일 때 `ad min`은 검출되지만 `read min`은 검출되지 않습니다. 한국어에서 관련 없는 단어끼리 엮이는 경우를 걸러내는 것도 이 규칙입니다. 금지어가 `사과`일 때 `이거사 과일이야`는 앞 단어의 중간에서 일치가 시작되므로 검출되지 않습니다.

숨기는 방법은 끝이 없기 때문에 이 함수는 완벽한 차단이 아닌 최선의 검사임을 감안해야 합니다. 반대로, 아무 문제 없는 단어의 일부가 금지어와 겹치면 검출되므로 목록은 되도록 구체적으로 작성하는 것이 좋습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: '검사할 텍스트입니다.' },
	{ name: 'words', type: 'string[]', named: true, default: '[]', desc: '찾을 금지어 목록입니다. 비어 있는 값은 무시하며, 공백이 포함된 금지어(`bad word`)는 하나의 단어로 취급합니다.' }
]" />

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
const words = ['admin', 'apple'];

hasBadWords('hello world', words); // Returns false
hasBadWords('I AM ADMIN', words); // Returns true
hasBadWords('pineapple juice', words); // Returns true
hasBadWords('ad___min', words); // Returns true
hasBadWords('ad$min', words); // Returns true
hasBadWords('a d m i n', words); // Returns true
hasBadWords('@dm1n', words); // Returns true
hasBadWords('4pp13', words); // Returns true
hasBadWords('read min please', words); // Returns false

hasBadWords('맛있는 사과!', ['사과']); // Returns true
hasBadWords('ㅅㅏㄱㅗㅏ', ['사과']); // Returns true
hasBadWords('이거사 과일이야', ['사과']); // Returns false
```

```dart [Dart]
const words = ['admin', 'apple'];

hasBadWords('hello world', words: words); // Returns false
hasBadWords('I AM ADMIN', words: words); // Returns true
hasBadWords('pineapple juice', words: words); // Returns true
hasBadWords('ad___min', words: words); // Returns true
hasBadWords('ad\$min', words: words); // Returns true
hasBadWords('a d m i n', words: words); // Returns true
hasBadWords('@dm1n', words: words); // Returns true
hasBadWords('4pp13', words: words); // Returns true
hasBadWords('read min please', words: words); // Returns false

hasBadWords('맛있는 사과!', words: ['사과']); // Returns true
hasBadWords('ㅅㅏㄱㅗㅏ', words: ['사과']); // Returns true
hasBadWords('이거사 과일이야', words: ['사과']); // Returns false
```

```python [Python]
words = ['admin', 'apple']

hasBadWords('hello world', words)  # Returns False
hasBadWords('I AM ADMIN', words)  # Returns True
hasBadWords('pineapple juice', words)  # Returns True
hasBadWords('ad___min', words)  # Returns True
hasBadWords('ad$min', words)  # Returns True
hasBadWords('a d m i n', words)  # Returns True
hasBadWords('@dm1n', words)  # Returns True
hasBadWords('4pp13', words)  # Returns True
hasBadWords('read min please', words)  # Returns False

hasBadWords('맛있는 사과!', words=['사과'])  # Returns True
hasBadWords('ㅅㅏㄱㅗㅏ', words=['사과'])  # Returns True
hasBadWords('이거사 과일이야', words=['사과'])  # Returns False
```

:::
