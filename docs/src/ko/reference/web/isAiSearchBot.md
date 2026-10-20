# isAiSearchBot

문자열이 AI 제품이 페이지를 찾아 답변에 출처로 인용할 수 있도록 색인하는 크롤러이면서, 운영사가 모델 학습에는 쓰지 않는다고 밝힌 크롤러를 가리키면 `true`를 반환합니다. ChatGPT 검색의 OAI-SearchBot, Claude-SearchBot, PerplexityBot이 그렇습니다.

이 크롤러들은 검색 엔진처럼 움직입니다. 누군가 방금 질문해서가 아니라 자기 일정대로 방문합니다. 막으면 사이트가 그 제품의 답변과 인용에서 빠집니다. 사람이 질문한 순간에 가져가는 요청은 [isAiAgentBot](./isAiAgentBot), 학습을 위한 수집은 [isAiTrainingBot](./isAiTrainingBot)이 맡습니다.

`User-Agent` 헤더 전체를 넘겨도 되고 봇 이름만 넘겨도 되며, 대소문자를 가리지 않고 문자열 어디에 있든 찾습니다. 분류 함수 네 개의 공통 동작과 `User-Agent`만으로는 아무것도 증명되지 않는 이유는 [isBot](./isBot)에 있습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '`User-Agent` 헤더나 봇 이름입니다. 빈 문자열이면 `false`를 반환합니다.' }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isAiSearchBot(
	'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot'
); // Returns true
isAiSearchBot('PerplexityBot'); // Returns true
isAiSearchBot('ChatGPT-User'); // Returns false
isAiSearchBot('Googlebot'); // Returns false
```

:::

::: lang dart

```dart
isAiSearchBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot'); // Returns true
isAiSearchBot('PerplexityBot'); // Returns true
isAiSearchBot('ChatGPT-User'); // Returns false
isAiSearchBot('Googlebot'); // Returns false
```

:::

::: lang python

```python
isAiSearchBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot')   # Returns True
isAiSearchBot('PerplexityBot')   # Returns True
isAiSearchBot('ChatGPT-User')   # Returns False
isAiSearchBot('Googlebot')   # Returns False
```

:::

## 알아보는 이름

2026년 10월 기준으로 아래 52개 이름을 알아보며, 운영하는 회사나 프로젝트별로 묶었습니다. 운영사가 직접 밝힌 이름과 공개된 봇 목록에서만 확인한 이름이 함께 있습니다.

| 운영사               | 이름                                                                    |
| -------------------- | ----------------------------------------------------------------------- |
| AddSearch            | AddSearchBot                                                            |
| AgentData            | AgentDataBot                                                            |
| Amazon               | Amzn-SearchBot                                                          |
| Amazon (AWS)         | amazon-kendra, amazon-QBusiness, bedrockbot                             |
| Andi                 | Andibot                                                                 |
| Anthropic            | Claude-SearchBot                                                        |
| Atlassian            | atlassian-bot                                                           |
| Big Sur AI           | bigsur.ai                                                               |
| Bixel                | BixelBot                                                                |
| ByteDance            | Dola-SearchBot                                                          |
| Ceramic AI           | Terra Cotta, TerraCotta                                                 |
| Channel3             | Channel3Bot                                                             |
| Cloudflare           | Cloudflare-AI-Search, Cloudflare-AI-Search-External, Cloudflare-AutoRAG |
| Diffbot              | Diffbot                                                                 |
| Direqt               | Anomura                                                                 |
| Exa                  | ExaSearchBot                                                            |
| Google               | CloudVertexBot, Google-CloudVertexBot                                   |
| iAsk                 | iAskBot, iaskspider                                                     |
| ImageSift (Hive)     | ImagesiftBot                                                            |
| Keenable             | Keenable-SearchBot, KeenableBot                                         |
| Klaviyo              | KlaviyoAIBot                                                            |
| Liner                | LinerBot                                                                |
| Lyrenth              | AIWebIndex                                                              |
| Meta                 | Meta-WebIndexer                                                         |
| Microsoft            | AzureAI-SearchBot                                                       |
| Mistral AI           | MistralAI-Index                                                         |
| Moonshot AI          | Kimi-SearchBot                                                          |
| Naget                | NagetBot                                                                |
| OpenAI               | OAI-SearchBot                                                           |
| Parallel Web Systems | ShapBot                                                                 |
| Perplexity           | PerplexityBot                                                           |
| ProRata.ai (Gist)    | ProRataInc                                                              |
| Qualified            | QualifiedBot                                                            |
| QuantumCloud         | wpbot                                                                   |
| Querit               | Querit-SearchBot, QueritBot                                             |
| Tavily               | TavilyBot                                                               |
| Valyu                | HenkBot                                                                 |
| xAI                  | xAI-SearchBot                                                           |
| Yandex               | YandexAdditional, YandexAdditionalBot                                   |
| You.com              | YouBot                                                                  |
| Zanista              | ZanistaBot                                                              |
| 확인되지 않음        | Aranet-SearchBot                                                        |
