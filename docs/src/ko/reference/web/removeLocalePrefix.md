# removeLocalePrefix <Lang js />

URL 또는 pathname에서 1단계 경로를 제거합니다. 일반적으로 로캐일 프리픽스를 사용하는 URL에서 특수한 경우 로캐일 없는 경로가 필요할 때 사용합니다. 예를 들어, `/en/hello`는 `/hello`와 같이 변환됩니다.

첫번째 인자에는 URL이나 pathname을 넣을 수 있습니다. URL을 사용할 때는 프로토콜(예: `https://`)을 포함합니다. 두번째 인자에는 지원하는 로캐일이 하나 이상 포함되어야 합니다. (예: `en`, `['ko', 'en', 'it', 'de']`)

## Parameters

- `pathname::string`
- `matcher::string|string[]`

## Returns

> boolean

## Examples

```javascript
removeLocalePrefix('/ko/user/login', ['ko', 'en']); // Returns '/user/login'
removeLocalePrefix('https://qsu.cdget.com/ko/user/login', ['ko', 'en']); // Returns 'https://qsu.cdget.com/user/login'
```
