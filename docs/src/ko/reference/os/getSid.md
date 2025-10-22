# getSid <Lang js />

<NodeRequired ko />

장치의 현재 사용자에 대한 보안 식별자(SID) 값을 가져옵니다. 값을 가져오지 못하면 에러를 발생시킵니다.

SID 값은 윈도우와 맥OS에서만 지원됩니다. 다른 운영 체제에서는 오류가 발생합니다.

또한, 맥OS에서 사용되는 SID 값은 디렉토리 서비스를 위해 생성된 값입니다. 이 값을 신뢰하지 않는다면, 대신 `machineId` 방법을 사용하십시오.

이 값은 사용자가 변경할 수 있습니다.

## Parameters

필수 매개 변수 없음

## Returns

> string

## Examples

```javascript
console.log(await sid()); // Returns 'S-1-5-21-406418252-5582013529-1321253100-2001'
```
