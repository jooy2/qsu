# retry <Lang dart js python />

Runs the given function and, if it fails, runs it again until it succeeds or the attempts run out. The value of the first successful attempt is returned; if every attempt fails, the error of the **last** one is raised.

`times` counts *total* attempts, not extra ones, so the default of `3` means one call plus at most two retries and `times: 1` disables retrying altogether. `times` below `1` is an error.

`delay` is the wait between two attempts, in milliseconds, and `backoff` multiplies it after each failure — `delay: 100, backoff: 2` waits 100ms, then 200ms, then 400ms. The wait sits strictly between attempts, so the last failure is reported without waiting one more time for nothing.

In JavaScript and Dart the function may be synchronous or asynchronous, and `retry` itself is asynchronous. In Python it is synchronous and waits with `time.sleep`, exactly as `sleep` does.

## Parameters

<ParamsTable :rows="[
	{ name: 'func', type: 'function', required: true, desc: 'The function to run. Its return value is passed straight back to the caller.' },
	{ name: 'options', type: 'RetryOptions', named: true, desc: 'See the table below.' }
]" />

<ParamsTable name="RetryOptions" :rows="[
	{ name: 'times', type: 'number', default: '3', desc: 'Total number of attempts, including the first one. Must be at least `1`.' },
	{ name: 'delay', type: 'number', default: '0', desc: 'Milliseconds to wait between two attempts.' },
	{ name: 'backoff', type: 'number', default: '1', desc: 'Multiplier applied to `delay` after every failed attempt. `1` keeps the wait constant.' }
]" />

## Returns

> Promise<any>

## Examples

::: lang js

```javascript
// One call plus at most two retries
const data = await retry(() => fetchData('https://example.com'));

// Five attempts, waiting 100ms, 200ms, 400ms, 800ms
const result = await retry(() => unstableCall(), {
	times: 5,
	delay: 100,
	backoff: 2
});

// No retry at all
await retry(() => onlyOnce(), { times: 1 });
```

:::

::: lang dart

```dart
// One call plus at most two retries
final data = await retry(() => unstableCall());

// Five attempts, waiting 100ms, 200ms, 400ms, 800ms
final result = await retry(() => unstableCall(), times: 5, delay: 100, backoff: 2);

// No retry at all
await retry(() => onlyOnce(), times: 1);
```

:::

::: lang python

```python
# One call plus at most two retries
data = retry(lambda: fetchData('https://example.com'))

# Five attempts, waiting 100ms, 200ms, 400ms, 800ms
result = retry(unstable_call, {
	'times': 5,
	'delay': 100,
	'backoff': 2
})

# No retry at all
retry(only_once, times=1)
```

:::
