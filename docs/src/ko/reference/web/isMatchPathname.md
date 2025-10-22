# isMatchPathname <Lang js />

처음 인자값의 URL 경로가 두번째 rule set에 매칭되는지 확인할 수 있습니다. 매칭 규칙은 string 또는 string으로 구성된 배열을 사용할 수 있으며, 두 인자 모두 경로는 `/`으로 시작합니다. 규칙에는 와일드카드(`*`)를 사용할 수 있습니다. 예를 들어 `user/*`인 경우 `/user`로 시작되는 페이지가 모두 해당됩니다.

## Parameters

- `pathname::string`
- `matcher::string|string[]`

## Returns

> boolean

## Examples

```javascript
isMatchPathname('/user/login', '/admin'); // Returns false
isMatchPathname('/user/login', '/user*'); // Returns true
isMatchPathname('/user/login', ['/test', '/home/hello', '/user/*']); // Returns true
```
