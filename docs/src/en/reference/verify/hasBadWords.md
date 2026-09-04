# hasBadWords <Lang dart js python />

Returns `true` when the given text contains one of the banned words. The word list comes entirely from the caller; this function does not ship one.

Matching is case-insensitive, and a banned word found inside a longer word still counts (`pineapple` contains `apple`).

On top of a plain match, the most common ways of hiding a word are detected as well:

- Characters inserted between the letters: `ad___min`, `a.d.m.i.n`, `ad$min`
- Digits wedged between the letters, a common trick in Korean: `ad1min`, `사1과`, `사123과`. A digit that opens or closes a word is left alone, so a number in front of a word (`2시 발표`) is not read away
- Lookalike characters, such as leetspeak digits, accents, fullwidth, circled and mathematical letters, and Cyrillic/Greek homoglyphs: `adm1n`, `4pp13`, `ａｄｍｉｎ`, `ádmín`, `ⓐⓓⓜⓘⓝ`, `𝗮𝗱𝗺𝗶𝗻`
- Symbols standing in for a letter: `@dm1n`
- Korean written as separate jamo, including a Latin letter used for its shape: `ㅅㅏㄱㅗㅏ` and `ㅅr과` are both read as `사과`

A banned word spread over a space is only reported when it starts a word. `ad min` is reported for `admin`, but `read min` is not. This is what keeps unrelated neighbours apart in Korean: for `사과`, the text `이거사 과일이야` is not reported because the match begins in the middle of the preceding word.

Because a banned word is also found inside a longer word, an innocent word may be reported (`apple` is found in `pineapple`). Pass those words in `allowWords` and they are excused, even when the text around them is obscured — allowed words go through the very same reading, so `p1n34ppl3` is excused by `pineapple` too.

Note that hiding tricks are endless, so this is a best-effort check rather than a guarantee.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: 'The text to check.' },
	{ name: 'words', type: 'string[]', named: true, default: '[]', desc: 'The banned words to look for. Empty and blank entries are ignored, and a word containing spaces (`bad word`) is matched as one word.' },
	{ name: 'allowWords', type: 'string[]', named: true, default: '[]', desc: 'Words that are never reported, even when a banned word is found inside them (`pineapple` for the banned word `apple`).' }
]" />

## Returns

> boolean

## Examples

::: lang js

```javascript
const words = ['admin', 'apple'];

hasBadWords('hello world', words); // Returns false
hasBadWords('I AM ADMIN', words); // Returns true
hasBadWords('pineapple juice', words); // Returns true
hasBadWords('ad___min', words); // Returns true
hasBadWords('ad1min', words); // Returns true
hasBadWords('ad$min', words); // Returns true
hasBadWords('a d m i n', words); // Returns true
hasBadWords('@dm1n', words); // Returns true
hasBadWords('4pp13', words); // Returns true
hasBadWords('read min please', words); // Returns false

hasBadWords('맛있는 사과!', ['사과']); // Returns true
hasBadWords('ㅅㅏㄱㅗㅏ', ['사과']); // Returns true
hasBadWords('사1과', ['사과']); // Returns true
hasBadWords('이거사 과일이야', ['사과']); // Returns false

hasBadWords('pineapple juice', words, ['pineapple']); // Returns false
hasBadWords('apple and pineapple', words, ['pineapple']); // Returns true
```

:::

::: lang dart

```dart
const words = ['admin', 'apple'];

hasBadWords('hello world', words: words); // Returns false
hasBadWords('I AM ADMIN', words: words); // Returns true
hasBadWords('pineapple juice', words: words); // Returns true
hasBadWords('ad___min', words: words); // Returns true
hasBadWords('ad1min', words: words); // Returns true
hasBadWords('ad\$min', words: words); // Returns true
hasBadWords('a d m i n', words: words); // Returns true
hasBadWords('@dm1n', words: words); // Returns true
hasBadWords('4pp13', words: words); // Returns true
hasBadWords('read min please', words: words); // Returns false

hasBadWords('맛있는 사과!', words: ['사과']); // Returns true
hasBadWords('ㅅㅏㄱㅗㅏ', words: ['사과']); // Returns true
hasBadWords('사1과', words: ['사과']); // Returns true
hasBadWords('이거사 과일이야', words: ['사과']); // Returns false

hasBadWords('pineapple juice', words: words, allowWords: ['pineapple']); // Returns false
hasBadWords('apple and pineapple', words: words, allowWords: ['pineapple']); // Returns true
```

:::

::: lang python

```python
words = ['admin', 'apple']

hasBadWords('hello world', words)  # Returns False
hasBadWords('I AM ADMIN', words)  # Returns True
hasBadWords('pineapple juice', words)  # Returns True
hasBadWords('ad___min', words)  # Returns True
hasBadWords('ad1min', words)  # Returns True
hasBadWords('ad$min', words)  # Returns True
hasBadWords('a d m i n', words)  # Returns True
hasBadWords('@dm1n', words)  # Returns True
hasBadWords('4pp13', words)  # Returns True
hasBadWords('read min please', words)  # Returns False

hasBadWords('맛있는 사과!', words=['사과'])  # Returns True
hasBadWords('ㅅㅏㄱㅗㅏ', words=['사과'])  # Returns True
hasBadWords('사1과', words=['사과'])  # Returns True
hasBadWords('이거사 과일이야', words=['사과'])  # Returns False

hasBadWords('pineapple juice', words, allowWords=['pineapple'])  # Returns False
hasBadWords('apple and pineapple', words, allowWords=['pineapple'])  # Returns True
```

:::
