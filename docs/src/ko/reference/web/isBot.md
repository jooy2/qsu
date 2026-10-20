# isBot

문자열이 자동화된 클라이언트이거나 그런 클라이언트가 보낸 것이면 `true`를 반환합니다. 검색 엔진 크롤러, AI 크롤러와 에이전트, SEO 도구, 링크 미리보기, 가동 모니터, 피드 리더, 아카이버, HTTP 라이브러리, 헤드리스 브라우저가 여기에 해당합니다.

`User-Agent` 헤더 전체를 넘겨도 되고, robots.txt에 쓰는 것처럼 봇 이름만 넘겨도 됩니다. 그래서 `Googlebot`, `GPTBot`, `curl` 모두 `true`입니다. 이름은 대소문자를 가리지 않고 문자열 어디에 있든 찾습니다.

`isBot`이 알아보는 봇 중 일부를 맡는 함수가 네 개 있어서, 사이트는 어떤 크롤러는 받아들이고 다른 크롤러는 막을 수 있습니다.

| 함수 | `true`를 반환하는 대상 | 예 |
| --- | --- | --- |
| [isSearchBot](./isSearchBot) | 검색 엔진을 위해 페이지를 색인하는 크롤러 | Googlebot, Bingbot, YandexBot, Yeti, Daum |
| [isAiSearchBot](./isAiSearchBot) | AI 제품이 답변에 출처로 인용하도록 페이지를 색인하며, 운영사가 학습에 쓰지 않는다고 밝힌 크롤러 | OAI-SearchBot, Claude-SearchBot, PerplexityBot |
| [isAiAgentBot](./isAiAgentBot) | 사람이 AI 어시스턴트나 에이전트에게 요청했을 때만 페이지를 방문하는 페처 | ChatGPT-User, Claude-User, Perplexity-User |
| [isAiTrainingBot](./isAiTrainingBot) | AI 모델을 학습시키거나 학습용 데이터셋을 만들려고 페이지를 수집하는 크롤러 | GPTBot, ClaudeBot, CCBot, Bytespider |

`isBot`이 알아보는 나머지는 네 분류 어디에도 속하지 않습니다. SEO 크롤러, 링크 미리보기, 모니터, 피드 리더, 아카이버, HTTP 라이브러리, 헤드리스 브라우저가 그렇습니다. `isBot`은 아는 이름 외에도 `bot`, `crawler`, `spider`처럼 자동화된 클라이언트만 이름에 넣는 단어를 봇으로 보므로, 처음 보는 크롤러도 걸러 냅니다. 분류 함수 네 개는 아는 이름에만 답합니다. Cubot처럼 모델명에 이런 단어가 우연히 들어간 휴대폰은 봇이 아닙니다.

`User-Agent` 헤더에는 클라이언트가 보내고 싶은 값이 들어갑니다. 스크레이퍼는 Chrome인 척할 수 있고 누구든 Googlebot이라고 주장할 수 있습니다. 이 함수들은 정직한 트래픽을 나누는 데 쓰고, 특정 크롤러라는 주장을 믿기 전에는 운영사가 공개한 IP 대역과 대조해야 합니다.

2026년 10월 기준으로 `isBot`은 일반 단어 외에 이름 1012개를 알아봅니다. 검색 크롤러 95개, AI 검색 크롤러 52개, AI 에이전트 56개, AI 학습 크롤러 67개, 기타 봇 742개이며, 분류별 이름은 각 분류 함수 페이지에 있습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '`User-Agent` 헤더나 봇 이름입니다. 빈 문자열이면 `false`를 반환합니다.' }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
isBot('GPTBot'); // Returns true
isBot('curl/8.4.0'); // Returns true
isBot(
	'Mozilla/5.0 (Linux; Android 10; CUBOT X30) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
); // Returns false
isBot(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
); // Returns false
```

:::

::: lang dart

```dart
isBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
isBot('GPTBot'); // Returns true
isBot('curl/8.4.0'); // Returns true
isBot('Mozilla/5.0 (Linux; Android 10; CUBOT X30) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'); // Returns false
isBot('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'); // Returns false
```

:::

::: lang python

```python
isBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')   # Returns True
isBot('GPTBot')   # Returns True
isBot('curl/8.4.0')   # Returns True
isBot('Mozilla/5.0 (Linux; Android 10; CUBOT X30) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36')   # Returns False
isBot('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36')   # Returns False
```

:::
