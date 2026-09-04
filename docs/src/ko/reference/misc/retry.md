# retry <Lang dart js python />

주어진 함수를 실행하고, 실패하면 성공하거나 시도 횟수가 모두 소진될 때까지 다시 실행합니다. 처음으로 성공한 시도의 반환값을 돌려주며, 모든 시도가 실패하면 **마지막** 시도의 오류를 발생시킵니다.

`times`는 추가 시도 횟수가 아니라 *전체* 시도 횟수입니다. 따라서 기본값 `3`은 최초 호출 1회와 최대 2회의 재시도를 의미하고, `times: 1`은 재시도를 하지 않습니다. `times`가 `1` 미만이면 오류입니다.

`delay`는 두 시도 사이의 대기 시간(밀리초)이며, `backoff`는 실패할 때마다 그 값에 곱해집니다. `delay: 100, backoff: 2`라면 100ms, 200ms, 400ms 순으로 대기합니다. 대기는 시도와 시도 사이에만 발생하므로, 마지막 실패는 불필요한 대기 없이 즉시 보고됩니다.

JavaScript와 Dart에서는 함수가 동기든 비동기든 상관없으며 `retry` 자체가 비동기입니다. Python에서는 `sleep`과 마찬가지로 동기 방식이며 `time.sleep`으로 대기합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'func', type: 'function', required: true, desc: '실행할 함수입니다. 반환값은 호출자에게 그대로 전달됩니다.' },
	{ name: 'options', type: 'RetryOptions', named: true, desc: '아래 표를 참고하세요.' }
]" />

<ParamsTable name="RetryOptions" :rows="[
	{ name: 'times', type: 'number', default: '3', desc: '최초 호출을 포함한 전체 시도 횟수입니다. 최소 `1` 이상이어야 합니다.' },
	{ name: 'delay', type: 'number', default: '0', desc: '두 시도 사이의 대기 시간(밀리초)입니다.' },
	{ name: 'backoff', type: 'number', default: '1', desc: '시도가 실패할 때마다 `delay`에 곱해지는 배수입니다. `1`이면 대기 시간이 일정하게 유지됩니다.' }
]" />

## Returns

> Promise<any>

## Examples

::: lang js

```javascript
// 최초 호출 1회와 최대 2회 재시도
const data = await retry(() => fetchData('https://example.com'));

// 5회 시도, 100ms → 200ms → 400ms → 800ms 대기
const result = await retry(() => unstableCall(), {
	times: 5,
	delay: 100,
	backoff: 2
});

// 재시도 없음
await retry(() => onlyOnce(), { times: 1 });
```

:::

::: lang dart

```dart
// 최초 호출 1회와 최대 2회 재시도
final data = await retry(() => unstableCall());

// 5회 시도, 100ms → 200ms → 400ms → 800ms 대기
final result = await retry(() => unstableCall(), times: 5, delay: 100, backoff: 2);

// 재시도 없음
await retry(() => onlyOnce(), times: 1);
```

:::

::: lang python

```python
# 최초 호출 1회와 최대 2회 재시도
data = retry(lambda: fetchData('https://example.com'))

# 5회 시도, 100ms → 200ms → 400ms → 800ms 대기
result = retry(unstable_call, {
	'times': 5,
	'delay': 100,
	'backoff': 2
})

# 재시도 없음
retry(only_once, times=1)
```

:::
