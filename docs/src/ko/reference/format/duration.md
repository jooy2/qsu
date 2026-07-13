# duration <Lang dart js python />

주어진 밀리초 값을 사람이 읽을 수 있는 시간으로 표시합니다. 예를 들어, `604800000`(7일)의 값은 `7 Days`로 표시됩니다.

한 달은 30일, 1년은 365일을 기준으로 계산합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'milliseconds', type: 'number', required: true, desc: '변환할 시간(밀리초)입니다.' },
	{ name: 'options', type: 'DurationOptions', named: true, desc: '포맷 옵션입니다. 아래 표를 참고하세요.' }
]" />

<ParamsTable name="DurationOptions" :rows="[
	{ name: 'useShortString', type: 'boolean', default: 'false', desc: '단위를 축약형으로 표시합니다: `Years`→`Y`, `Months`→`Mo`, `Days`→`D`, `Hours`→`H`, `Minutes`→`M`, `Seconds`→`S`, `Milliseconds`→`ms`. (`Months`는 `Minutes`(`M`)와 겹치지 않도록 `Mo`를 사용합니다.)' },
	{ name: 'useSpace', type: 'boolean', default: 'true', desc: '값과 단위 사이에 공백을 넣습니다. (예: `1Days` → `1 Days`)' },
	{ name: 'withZeroValue', type: 'boolean', default: 'false', desc: '가장 큰 단위 아래에 있는, 값이 0인 단위도 포함합니다. (예: `1 Day 0 Hours 0 Minutes 0 Seconds`)' },
	{ name: 'separator', type: 'string', default: `' '`, desc: '단위 사이에 넣을 구분자입니다. (예: `-`이면 `1 Hour-10 Minutes`)' },
	{ name: 'withMilliSeconds', type: 'boolean', default: 'false', desc: '밀리초 단위를 포함합니다. `false`인 경우 1초 미만의 값은 생략됩니다.' },
	{ name: 'maxUnitCount', type: 'number', desc: '표시할 최대 단위 개수이며, 가장 큰 단위부터 셉니다. 생략하면 제한이 없습니다.' },
	{ name: 'unit', type: 'string', desc: '전체 시간을 하나의 단위로만 표시하며, 소수점 값을 허용합니다. (예: `Hour` → `48 Hours`, `0.5 Hours`) `Year`, `Month`, `Day`, `Hour`, `Minute`, `Second`, `Millisecond` 중 하나입니다.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
duration(1234567890); // Returns '14 Days 6 Hours 56 Minutes 7 Seconds'
duration(1234567890, {
	withMilliSeconds: true
}); // Returns '14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
duration(34560000000); // Returns '1 Year 1 Month 5 Days'
duration(34560000000, {
	maxUnitCount: 2
}); // Returns '1 Year 1 Month'
duration(172800000, {
	unit: 'Hour'
}); // Returns '48 Hours'
duration(1800000, {
	unit: 'Hour'
}); // Returns '0.5 Hours'
duration(604800000, {
	useSpace: false
}); // Returns '7Days'
```

```dart [Dart]
duration(1234567890); // Returns '14 Days 6 Hours 56 Minutes 7 Seconds'
duration(1234567890, withMilliSeconds: true); // Returns '14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
duration(34560000000); // Returns '1 Year 1 Month 5 Days'
duration(34560000000, maxUnitCount: 2); // Returns '1 Year 1 Month'
duration(172800000, unit: 'Hour'); // Returns '48 Hours'
duration(1800000, unit: 'Hour'); // Returns '0.5 Hours'
duration(604800000, useSpace: false); // Returns '7Days'
```

```python [Python]
duration(1234567890)  # Returns '14 Days 6 Hours 56 Minutes 7 Seconds'
duration(1234567890, {
	'withMilliSeconds': True
})  # Returns '14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
duration(34560000000)  # Returns '1 Year 1 Month 5 Days'
duration(34560000000, {
	'maxUnitCount': 2
})  # Returns '1 Year 1 Month'
duration(172800000, {
	'unit': 'Hour'
})  # Returns '48 Hours'
duration(1800000, {
	'unit': 'Hour'
})  # Returns '0.5 Hours'
duration(604800000, {
	'useSpace': False
})  # Returns '7Days'
```

:::
