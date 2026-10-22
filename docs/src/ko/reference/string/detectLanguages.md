# detectLanguages

문자열이 어떤 언어로 쓰였는지 판별해, 가장 많이 쓰인 언어부터 차례로 글자 비율과 함께 돌려줍니다. 언어는 `en`, `ko`, `ja` 같은 ISO 639-1 코드로 나타냅니다.

판별은 패키지에 들어 있는 표만으로 이루어집니다. 모델을 내려받지 않고, 텍스트를 어디에도 보내지 않습니다.

언어를 알아보는 방법은 문자 체계마다 다릅니다.

- 한글, 타이 문자, 그리스 문자처럼 한 언어만 쓰는 문자는 그 언어로 봅니다.
- 한자는 가나가 함께 있는 문장에서는 일본어, 한글이 함께 있는 문장에서는 한국어, 그 밖에서는 중국어로 셉니다. 그래서 `東京`만 있으면 `zh`입니다.
- 라틴, 키릴, 아랍 문자는 여러 언어가 함께 쓰므로 문장마다 따로 가립니다. 어떤 언어에서 가장 자주 쓰는 단어이면 그 언어에 1점을 줍니다. 일부 언어만 쓰는 글자(`ß`, `ñ`, `ł`, `ı`, `ї`, `پ`)로 쓴 단어이면 그 글자를 쓰는 언어에 1점을 더 주고, 영어의 `-ing`와 `th`, 스페인어의 `-ción`, 네덜란드어의 `ij`, 폴란드어의 `sz`처럼 그 언어에 흔한 어미나 글자 조합이 있으면 다시 1점을 줍니다. 마지막 규칙 덕분에 `watched`나 `night`처럼 어느 목록에도 없는 단어도 판별에 쓰입니다. 한 언어가 2점 이상이면서 다른 어느 언어보다 높으면 그 문장은 그 언어입니다.
- 둘 이상의 언어가 2점 이상으로 같으면, 텍스트의 나머지 부분에서 더 많이 쓰인 쪽으로 정하고, 그래도 가려지지 않으면 아래 표에서 앞에 있는 언어로 정합니다. `Hello.`나 `Danke!`처럼 짧아서 가릴 수 없는 문장은 텍스트의 나머지 부분에서 판별된 언어를 따릅니다. 텍스트 어디에서도 언어가 정해지지 않았다면 문장 자신의 단어만 보고, 단서가 되는 단어가 하나도 없으면 그 문자의 첫 언어인 영어, 러시아어, 아랍어 중 하나가 됩니다.

비율은 글자만 셉니다. 숫자, 공백, 문장 부호, 기호, 이모지, 결합 문자는 세지 않고, 아래 표에 없는 문자의 글자도 세지 않으므로 비율을 모두 더하면 1입니다. 센 글자가 하나도 없으면 빈 목록을 돌려줍니다. 글자 수가 같은 언어는 텍스트에 먼저 나온 순서대로 놓입니다.

대소문자는 구분하지 않고, 분해된 형태로 쓴 악센트(`e` 뒤에 U+0301)는 단어를 비교하기 전에 합칩니다.

사전이 아니라 자주 쓰는 단어로 추정하는 방식입니다. 짧은 문장에는 그런 단어가 적어 잘못 가릴 수 있고, 덴마크어와 노르웨이어, 체코어와 슬로바크어처럼 가까운 언어는 서로 다른 단어와 어미로만 구별합니다. 아래 표에 없는 언어는 표에 있는 언어 중 하나로 돌려줍니다.

## 지원 언어

다음 언어는 문자로 알아봅니다.

| 코드 | 언어         | 문자               |
| ---- | ------------ | ------------------ |
| `ko` | 한국어       | 한글               |
| `ja` | 일본어       | 히라가나, 가타카나 |
| `zh` | 중국어       | 한자, 주음부호     |
| `th` | 태국어       | 타이 문자          |
| `el` | 그리스어     | 그리스 문자        |
| `he` | 히브리어     | 히브리 문자        |
| `hi` | 힌디어       | 데바나가리         |
| `bn` | 벵골어       | 벵골 문자          |
| `pa` | 펀자브어     | 구르무키           |
| `gu` | 구자라트어   | 구자라트 문자      |
| `or` | 오리야어     | 오리야 문자        |
| `ta` | 타밀어       | 타밀 문자          |
| `te` | 텔루구어     | 텔루구 문자        |
| `kn` | 칸나다어     | 칸나다 문자        |
| `ml` | 말라얄람어   | 말라얄람 문자      |
| `si` | 싱할라어     | 싱할라 문자        |
| `lo` | 라오어       | 라오 문자          |
| `bo` | 티베트어     | 티베트 문자        |
| `my` | 미얀마어     | 미얀마 문자        |
| `ka` | 조지아어     | 조지아 문자        |
| `hy` | 아르메니아어 | 아르메니아 문자    |
| `am` | 암하라어     | 에티오피아 문자    |
| `km` | 크메르어     | 크메르 문자        |
| `mn` | 몽골어       | 몽골 문자          |

다른 언어도 쓰는 문자라도 표에 적힌 한 언어로 돌려줍니다. 마라티어와 네팔어는 `hi`, 티그리냐어는 `am`이 됩니다.

다음 언어는 문자를 함께 쓰므로 단어로 가립니다. 동점이면 표에서 앞에 있는 언어가 이깁니다.

| 코드 | 언어         | 문자      |
| ---- | ------------ | --------- |
| `en` | 영어         | 라틴 문자 |
| `es` | 스페인어     | 라틴 문자 |
| `fr` | 프랑스어     | 라틴 문자 |
| `de` | 독일어       | 라틴 문자 |
| `pt` | 포르투갈어   | 라틴 문자 |
| `it` | 이탈리아어   | 라틴 문자 |
| `ca` | 카탈루냐어   | 라틴 문자 |
| `nl` | 네덜란드어   | 라틴 문자 |
| `sv` | 스웨덴어     | 라틴 문자 |
| `da` | 덴마크어     | 라틴 문자 |
| `no` | 노르웨이어   | 라틴 문자 |
| `fi` | 핀란드어     | 라틴 문자 |
| `pl` | 폴란드어     | 라틴 문자 |
| `cs` | 체코어       | 라틴 문자 |
| `sk` | 슬로바크어   | 라틴 문자 |
| `hr` | 크로아티아어 | 라틴 문자 |
| `ro` | 루마니아어   | 라틴 문자 |
| `hu` | 헝가리어     | 라틴 문자 |
| `tr` | 튀르키예어   | 라틴 문자 |
| `vi` | 베트남어     | 라틴 문자 |
| `id` | 인도네시아어 | 라틴 문자 |
| `ru` | 러시아어     | 키릴 문자 |
| `uk` | 우크라이나어 | 키릴 문자 |
| `bg` | 불가리아어   | 키릴 문자 |
| `sr` | 세르비아어   | 키릴 문자 |
| `ar` | 아랍어       | 아랍 문자 |
| `fa` | 페르시아어   | 아랍 문자 |
| `ur` | 우르두어     | 아랍 문자 |

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: '판별할 텍스트입니다. 값이 비어 있으면 빈 목록을 돌려줍니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'DetectedLanguage[]', dart: 'List<DetectedLanguage>', python: 'list' }" />

<ParamsTable name="DetectedLanguage" :rows="[
	{ name: 'language', type: 'string', desc: '`en`, `ko` 같은 언어의 ISO 639-1 코드입니다.' },
	{ name: 'ratio', type: { js: 'number', dart: 'double', python: 'float' }, desc: '센 글자 가운데 이 언어로 쓰인 글자의 비율로, 0보다 크고 1 이하입니다. 반올림하지 않습니다.' }
]" />

## Examples

::: lang js

```javascript
detectLanguages('안녕하세요'); // [{ language: 'ko', ratio: 1 }]
detectLanguages('Bonjour'); // [{ language: 'fr', ratio: 1 }]
detectLanguages('오늘 회의는 Zoom으로 진행합니다.');
// [{ language: 'ko', ratio: 0.75 }, { language: 'en', ratio: 0.25 }]
detectLanguages('Hello 안녕하세요');
// [{ language: 'en', ratio: 0.5 }, { language: 'ko', ratio: 0.5 }]
detectLanguages("I live in Paris. C'est la vie.").map((item) => item.language); // ['en', 'fr']
detectLanguages('東京に行きます'); // [{ language: 'ja', ratio: 1 }]
detectLanguages('北京'); // [{ language: 'zh', ratio: 1 }]
detectLanguages('12345'); // []
```

:::

::: lang dart

```dart
final List<DetectedLanguage> languages = detectLanguages('오늘 회의는 Zoom으로 진행합니다.');

languages[0].language; // 'ko'
languages[0].ratio; // 0.75
languages[1].language; // 'en'
languages[1].ratio; // 0.25

detectLanguages('Bonjour')[0].language; // 'fr'
detectLanguages("I live in Paris. C'est la vie.")
    .map((DetectedLanguage item) => item.language)
    .toList(); // ['en', 'fr']
detectLanguages('東京に行きます')[0].language; // 'ja'
detectLanguages('北京')[0].language; // 'zh'
detectLanguages('12345'); // []
```

:::

::: lang python

```python
detectLanguages('안녕하세요')  # [{'language': 'ko', 'ratio': 1.0}]
detectLanguages('Bonjour')  # [{'language': 'fr', 'ratio': 1.0}]
detectLanguages('오늘 회의는 Zoom으로 진행합니다.')
# [{'language': 'ko', 'ratio': 0.75}, {'language': 'en', 'ratio': 0.25}]
detectLanguages('Hello 안녕하세요')
# [{'language': 'en', 'ratio': 0.5}, {'language': 'ko', 'ratio': 0.5}]
[item['language'] for item in detectLanguages("I live in Paris. C'est la vie.")]  # ['en', 'fr']
detectLanguages('東京に行きます')  # [{'language': 'ja', 'ratio': 1.0}]
detectLanguages('北京')  # [{'language': 'zh', 'ratio': 1.0}]
detectLanguages('12345')  # []
```

:::
