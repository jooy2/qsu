# isMobile <Lang js />

현재 사용자가 사용자 에이전트 문자열을 통해 모바일 장치에서 접속하고 있는지 확인합니다. 이 기능은 태블릿 사용자에게는 `false`를 반환합니다.

## Parameters

- `userAgent::string`

## Returns

> boolean

## Examples

```javascript
isMobile(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
); // Returns false
isMobile(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
); // Returns true
```
