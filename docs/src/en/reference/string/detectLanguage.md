# detectLanguage

Detects the languages a string is written in and returns them from the most used to the least, each with its share of the letters. A language is named by its ISO 639-1 code, such as `en`, `ko` or `ja`.

Everything is decided from the text with tables that ship inside the package. No model is downloaded and nothing is sent anywhere.

How a language is recognized depends on its script:

- A script that only one language writes, such as Hangul, Thai or Greek, names that language.
- Han characters are read as Japanese in a sentence that also has kana, as Korean in a sentence that also has Hangul, and as Chinese anywhere else. `東京` on its own is therefore `zh`.
- The Latin, Cyrillic and Arabic scripts are shared by several languages, which are told apart sentence by sentence. A word counts toward a language when it is one of that language's most common words, again when it is written with letters that only some of the languages use (`ß`, `ñ`, `ł`, `ı`, `ї`, `پ`), and again when it has an ending or a run of letters typical of the language, such as `-ing` and `th` in English, `-ción` in Spanish, `ij` in Dutch or `sz` in Polish. That last part is what lets a word missing from every list, such as `watched` or `night`, still say something. A sentence in which one language scores at least 2 and more than any other is in that language.
- A sentence in which two or more languages tie at 2 or above goes to whichever of them the rest of the text was found to use more, or else to the one listed first in the table below. A sentence too short to decide, such as `Hello.` or `Danke!`, takes the language the rest of the text was found to be in. When nothing in the text was decided, a sentence goes by its own words alone, and one with no word to go by is English, Russian or Arabic, the first language of its script.

The ratio counts letters only. Digits, spaces, punctuation, symbols, emoji and combining marks are not counted, and neither are letters of a script the tables below do not list, so the ratios add up to 1. A text without any counted letter returns an empty list. Languages with the same number of letters are listed in the order they first appear.

Upper and lower case are treated alike, and accents written in decomposed form (`e` followed by U+0301) are composed before the words are compared.

This is a heuristic built on common words, not a dictionary. A short sentence may hold too few of them to be told apart, and closely related languages such as Danish and Norwegian, or Czech and Slovak, are separated only by the words and endings that differ between them. A language that is not listed below is reported as one that is.

## Languages

These languages are recognized by their script:

| Code | Language  | Script             |
| ---- | --------- | ------------------ |
| `ko` | Korean    | Hangul             |
| `ja` | Japanese  | Hiragana, Katakana |
| `zh` | Chinese   | Han, Bopomofo      |
| `th` | Thai      | Thai               |
| `el` | Greek     | Greek              |
| `he` | Hebrew    | Hebrew             |
| `hi` | Hindi     | Devanagari         |
| `bn` | Bengali   | Bengali            |
| `pa` | Punjabi   | Gurmukhi           |
| `gu` | Gujarati  | Gujarati           |
| `or` | Odia      | Odia               |
| `ta` | Tamil     | Tamil              |
| `te` | Telugu    | Telugu             |
| `kn` | Kannada   | Kannada            |
| `ml` | Malayalam | Malayalam          |
| `si` | Sinhala   | Sinhala            |
| `lo` | Lao       | Lao                |
| `bo` | Tibetan   | Tibetan            |
| `my` | Burmese   | Myanmar            |
| `ka` | Georgian  | Georgian           |
| `hy` | Armenian  | Armenian           |
| `am` | Amharic   | Ethiopic           |
| `km` | Khmer     | Khmer              |
| `mn` | Mongolian | Mongolian          |

A script is reported as the one language listed for it, even where other languages write it too: Marathi and Nepali text comes back as `hi`, and Tigrinya as `am`.

These languages share a script and are told apart by their words, listed in the order a tie is settled in:

| Code | Language   | Script   |
| ---- | ---------- | -------- |
| `en` | English    | Latin    |
| `es` | Spanish    | Latin    |
| `fr` | French     | Latin    |
| `de` | German     | Latin    |
| `pt` | Portuguese | Latin    |
| `it` | Italian    | Latin    |
| `ca` | Catalan    | Latin    |
| `nl` | Dutch      | Latin    |
| `sv` | Swedish    | Latin    |
| `da` | Danish     | Latin    |
| `no` | Norwegian  | Latin    |
| `fi` | Finnish    | Latin    |
| `pl` | Polish     | Latin    |
| `cs` | Czech      | Latin    |
| `sk` | Slovak     | Latin    |
| `hr` | Croatian   | Latin    |
| `ro` | Romanian   | Latin    |
| `hu` | Hungarian  | Latin    |
| `tr` | Turkish    | Latin    |
| `vi` | Vietnamese | Latin    |
| `id` | Indonesian | Latin    |
| `ru` | Russian    | Cyrillic |
| `uk` | Ukrainian  | Cyrillic |
| `bg` | Bulgarian  | Cyrillic |
| `sr` | Serbian    | Cyrillic |
| `ar` | Arabic     | Arabic   |
| `fa` | Persian    | Arabic   |
| `ur` | Urdu       | Arabic   |

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: 'The text to read. An empty or missing value returns an empty list.' }
]" />

## Returns

<ReturnType :type="{ js: 'DetectedLanguage[]', dart: 'List<DetectedLanguage>', python: 'list' }" />

<ParamsTable name="DetectedLanguage" :rows="[
	{ name: 'language', type: 'string', desc: 'The ISO 639-1 code of the language, such as `en` or `ko`.' },
	{ name: 'ratio', type: { js: 'number', dart: 'double', python: 'float' }, desc: 'The share of the counted letters written in this language, above 0 and up to 1. It is not rounded.' }
]" />

## Examples

::: lang js

```javascript
detectLanguage('안녕하세요'); // [{ language: 'ko', ratio: 1 }]
detectLanguage('Bonjour'); // [{ language: 'fr', ratio: 1 }]
detectLanguage('오늘 회의는 Zoom으로 진행합니다.');
// [{ language: 'ko', ratio: 0.75 }, { language: 'en', ratio: 0.25 }]
detectLanguage('Hello 안녕하세요');
// [{ language: 'en', ratio: 0.5 }, { language: 'ko', ratio: 0.5 }]
detectLanguage("I live in Paris. C'est la vie.").map((item) => item.language); // ['en', 'fr']
detectLanguage('東京に行きます'); // [{ language: 'ja', ratio: 1 }]
detectLanguage('北京'); // [{ language: 'zh', ratio: 1 }]
detectLanguage('12345'); // []
```

:::

::: lang dart

```dart
final List<DetectedLanguage> languages = detectLanguage('오늘 회의는 Zoom으로 진행합니다.');

languages[0].language; // 'ko'
languages[0].ratio; // 0.75
languages[1].language; // 'en'
languages[1].ratio; // 0.25

detectLanguage('Bonjour')[0].language; // 'fr'
detectLanguage("I live in Paris. C'est la vie.")
    .map((DetectedLanguage item) => item.language)
    .toList(); // ['en', 'fr']
detectLanguage('東京に行きます')[0].language; // 'ja'
detectLanguage('北京')[0].language; // 'zh'
detectLanguage('12345'); // []
```

:::

::: lang python

```python
detectLanguage('안녕하세요')  # [{'language': 'ko', 'ratio': 1.0}]
detectLanguage('Bonjour')  # [{'language': 'fr', 'ratio': 1.0}]
detectLanguage('오늘 회의는 Zoom으로 진행합니다.')
# [{'language': 'ko', 'ratio': 0.75}, {'language': 'en', 'ratio': 0.25}]
detectLanguage('Hello 안녕하세요')
# [{'language': 'en', 'ratio': 0.5}, {'language': 'ko', 'ratio': 0.5}]
[item['language'] for item in detectLanguage("I live in Paris. C'est la vie.")]  # ['en', 'fr']
detectLanguage('東京に行きます')  # [{'language': 'ja', 'ratio': 1.0}]
detectLanguage('北京')  # [{'language': 'zh', 'ratio': 1.0}]
detectLanguage('12345')  # []
```

:::
