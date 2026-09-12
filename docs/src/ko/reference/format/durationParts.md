# durationParts
밀리초 단위의 시간을 각 단위로 쪼개어 돌려주고, 어떻게 쓸지는 호출한 쪽이 정하도록 합니다.

[duration](/ko/reference/format/duration)은 영어 단위 이름에 복수형 `s`를 붙여 문자열로 잇는데, 이렇게 복수형을 만드는 언어는 영어뿐입니다. 폴란드어는 복수형이 세 가지, 아랍어는 여섯 가지입니다. 이 함수는 조각을 그대로 돌려주므로, 그 언어를 아는 포매터가 이어 붙이면 됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'milliseconds', type: { js: 'number', dart: 'num', python: 'float' }, required: true, desc: '쪼갤 시간입니다.' },
	{ name: 'options', type: 'DurationPartsOptions', named: true, desc: '아래 표를 참고하세요. `duration`의 옵션 중 어떤 단위를 쓸지 정하는 것만 받고, 쓰는 방법만 정하는 옵션은 빠져 있습니다.' }
]" />

<ParamsTable name="DurationPartsOptions" :rows="[
	{ name: 'withZeroValue', type: 'boolean', default: 'false', desc: '가장 큰 단위 아래로 값이 0인 단위도 포함합니다.' },
	{ name: 'withMilliSeconds', type: 'boolean', default: 'false', desc: '밀리초 단위를 포함합니다.' },
	{ name: 'maxUnitCount', type: 'number', desc: '큰 단위부터 세어 돌려줄 단위의 최대 개수입니다.' },
	{ name: 'unit', type: 'DurationUnitName', desc: '전체 시간을 이 단위 하나로 나타냅니다. 이때 `value`는 소수가 될 수 있습니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'DurationPart[]', dart: 'List<DurationPart>', python: 'list' }" />

<ParamsTable name="DurationPart" :rows="[
	{ name: 'value', type: { js: 'number', dart: 'num', python: 'float' }, desc: '`unit`이 몇 개인지를 나타냅니다. 보통은 정수이고, 단위 하나로 나타내도록 했을 때는 소수일 수 있습니다.' },
	{ name: 'unit', type: 'DurationUnitName', desc: '`Year`, `Month`, `Day`, `Hour`, `Minute`, `Second`, `Millisecond` 중 하나입니다. 직접 쓰는 단위 이름을 찾을 때 쓰세요.' }
]" />

시간이 0이면 빈 목록을 돌려줍니다. `duration`이 빈 문자열을 돌려주는 경우와 같습니다.

## Examples

::: lang js

```javascript
durationParts(604800000); // [{ value: 7, unit: 'Day' }]
durationParts(1234567890);
// [{ value: 14, unit: 'Day' }, { value: 6, unit: 'Hour' }, { value: 56, unit: 'Minute' }, { value: 7, unit: 'Second' }]
durationParts(1234567890, { maxUnitCount: 2 });
// [{ value: 14, unit: 'Day' }, { value: 6, unit: 'Hour' }]
durationParts(1500, { unit: 'Second' }); // [{ value: 1.5, unit: 'Second' }]
```

:::

::: lang dart

```dart
final List<DurationPart> parts = durationParts(1234567890);

parts[0].value; // 14
parts[0].unit; // 'Day'

durationParts(1234567890, maxUnitCount: 2).length; // 2
durationParts(1500, unit: 'Second')[0].value; // 1.5
```

:::

::: lang python

```python
durationParts(604800000)  # [{'value': 7, 'unit': 'Day'}]
durationParts(1234567890)
# [{'value': 14, 'unit': 'Day'}, {'value': 6, 'unit': 'Hour'}, {'value': 56, 'unit': 'Minute'}, {'value': 7, 'unit': 'Second'}]
durationParts(1234567890, {'maxUnitCount': 2})
# [{'value': 14, 'unit': 'Day'}, {'value': 6, 'unit': 'Hour'}]
durationParts(1500, unit='Second')  # [{'value': 1.5, 'unit': 'Second'}]
```

:::

## 읽는 사람의 언어로 시간 쓰기

`unit`을 포매터가 기대하는 단위 이름에 대응시키고, 나머지는 포매터가 쓰게 하세요.

::: lang js

`Intl.DurationFormat`은 단위를 객체로 받아 문자열 전체를 만들며, 언어마다 다른 구분자까지 처리합니다.

```javascript
const UNITS = {
	Year: 'years',
	Month: 'months',
	Day: 'days',
	Hour: 'hours',
	Minute: 'minutes',
	Second: 'seconds',
	Millisecond: 'milliseconds'
};

function localizedDuration(milliseconds, locale) {
	const value = {};

	for (const part of durationParts(milliseconds)) {
		value[UNITS[part.unit]] = part.value;
	}

	return new Intl.DurationFormat(locale, { style: 'long' }).format(value);
}

localizedDuration(1234567890, 'de'); // '14 Tage, 6 Stunden, 56 Minuten und 7 Sekunden'
localizedDuration(1234567890, 'fr'); // '14 jours, 6 heures, 56 minutes et 7 secondes'
localizedDuration(1234567890, 'ko'); // '14일 6시간 56분 7초'
```

`Intl.DurationFormat`은 `Intl`의 다른 기능보다 늦게 나왔으니 호출하기 전에 있는지 확인하세요. `Intl.NumberFormat`의 `style: 'unit'`은 같은 일곱 단위를 하나씩 다루며 훨씬 오래전부터 쓸 수 있습니다.

:::

::: lang dart

수는 [intl](https://pub.dev/packages/intl)로 쓰고, 단위 이름은 직접 가진 번역에서 가져오세요. 복수형이 둘보다 많은 언어는 `Intl.plural`이 필요하므로, 개수와 이름을 여기서 나누어 둡니다.

```dart
const Map<String, String> unitKeys = {
  'Day': 'duration.day',
  'Hour': 'duration.hour',
  'Minute': 'duration.minute',
  'Second': 'duration.second',
};

String localizedDuration(int milliseconds, String locale) {
  return durationParts(milliseconds)
      .map((DurationPart part) =>
          translatePlural(unitKeys[part.unit]!, part.value.toInt(), locale))
      .join(' ');
}
```

:::

::: lang python

[babel](https://pypi.org/project/babel/)을 추가하세요. `format_unit`이 언어별 단위 이름과 복수형 규칙을 알고 있습니다.

```python
from babel.units import format_unit

unitKeys = {
	'Day': 'duration-day',
	'Hour': 'duration-hour',
	'Minute': 'duration-minute',
	'Second': 'duration-second',
}


def localizedDuration(milliseconds: float, locale: str) -> str:
	return ' '.join(
		format_unit(part['value'], unitKeys[part['unit']], locale=locale)
		for part in durationParts(milliseconds)
	)
```

:::
