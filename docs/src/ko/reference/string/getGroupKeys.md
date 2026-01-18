# getGroupKeys <Lang js />

주어진 문자열에서 시작 문자와 끝 문자로 묶여진 텍스트 키를 리턴합니다. 이는 i18n 문법을 따르는 문자열 텍스트에서 템플릿 문자열 키를 파악하는데 유용하게 쓰일 수 있습니다.

예를 들어, `abc {def} ghi`와 같은 텍스트에서 `{def}`는 템플릿 문자열에서 쓰이는 키이며, 이 함수는 'def'를 찾으려고 합니다.

`abc {def} {ghi} jkl`과 같은 문자열이 있고 시작 문자 `{`, 끝 문자 `}`로 함수를 실행하면 결과는 배열에 순서대로 키값이 전달됩니다: `['def', 'ghi']`

일반적으로 i18n에서 허용하는 `_`, `-`, `$` 외의 문자가 키 이름에 포함되거나, 이스케이프 문자가 들어갔을 경우 이를 키로 취급하지 않습니다. 하지만 옵션으로 특수문자에 대한 키 체크를 무시할 수 있습니다.

`{}`와 같이 키 이름이 없는 경우에도 유효한 키로 취급합니다. 이 경우 배열에 빈 값이 순서에 맞게 들어갑니다. (예: `['', 'abc', 'def', '', 'ghi']`)

## Parameters

- `str::string`
- `groupStart::string`
- `groupEnd::string`
- `ignoreValidation::boolean`

## Returns

> string[]

## Examples

::: code-group

```javascript [JavaScript]
getGroupKeys('abc {def} ghi {{jkl}}', '{', '}'); // Returns ['def']
getGroupKeys('abc {{def}} ghi {jkl}', '{{', '}}'); // Returns ['def']
getGroupKeys('abc {} {}', '{', '}'); // Returns ['', '']
getGroupKeys('abc [[def] [ghi] [jkl ', '[', ']'); // Returns ['ghi']
getGroupKeys('abc {d#e  f}', '{', '}', true); // Returns ['d#e  f']
```

:::
