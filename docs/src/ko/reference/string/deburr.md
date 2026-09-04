# deburr <Lang dart js python />

발음 구별 부호가 붙은 라틴 문자를 부호가 없는 문자로 바꿉니다. 예를 들어 `'déjà vu'`는 `'deja vu'`가 됩니다.

한 글자로 대응되지 않는 문자는 여러 글자로 풀어서 씁니다. `Æ`는 `Ae`, `ß`는 `ss`, `Þ`는 `Th`, `Œ`는 `Oe`, `Ĳ`는 `IJ`가 됩니다.

결합 문자(combining mark)도 함께 제거하므로, 분해된 형태(`é` 대신 `e` + U+0301)로 작성된 텍스트도 처리됩니다.

변환 대상은 **Latin-1 Supplement**와 **Latin Extended-A** 블록, 그리고 결합 문자입니다. Dart에는 유니코드 정규화 기능이 없어 세 언어 모두에서 동일하게 표현할 수 있는 범위가 여기까지이기 때문입니다. 이 범위 밖의 문자는 그대로 반환되므로 베트남어 `Tiếng Việt`이나 한글·한자·키릴 문자는 변경되지 않습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '변환할 문자열입니다. 값이 비어 있으면 빈 문자열을 반환합니다.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
deburr('déjà vu'); // Returns 'deja vu'
deburr('Łódź'); // Returns 'Lodz'
deburr('Ærøskøbing'); // Returns 'Aeroskobing'
deburr('Straße'); // Returns 'Strasse'
deburr('Þór'); // Returns 'Thor'
deburr('한글'); // Returns '한글'
```

:::

::: lang dart

```dart
deburr('déjà vu'); // Returns 'deja vu'
deburr('Łódź'); // Returns 'Lodz'
deburr('Ærøskøbing'); // Returns 'Aeroskobing'
deburr('Straße'); // Returns 'Strasse'
deburr('Þór'); // Returns 'Thor'
deburr('한글'); // Returns '한글'
```

:::

::: lang python

```python
deburr('déjà vu')  # Returns 'deja vu'
deburr('Łódź')  # Returns 'Lodz'
deburr('Ærøskøbing')  # Returns 'Aeroskobing'
deburr('Straße')  # Returns 'Strasse'
deburr('Þór')  # Returns 'Thor'
deburr('한글')  # Returns '한글'
```

:::
