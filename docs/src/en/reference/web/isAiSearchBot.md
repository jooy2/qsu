# isAiSearchBot

Returns `true` if a string names a crawler that indexes pages so an AI product can find them and cite them in its answers, and whose operator says the pages are not used to train its models, such as OAI-SearchBot for ChatGPT search, Claude-SearchBot and PerplexityBot.

These crawlers work like a search engine's: they visit on their own schedule, not because someone just asked a question. Blocking them keeps a site out of that product's answers and citations. A fetch made at the moment a person asks is [isAiAgentBot](./isAiAgentBot), and crawling for training is [isAiTrainingBot](./isAiTrainingBot).

The string can be a whole `User-Agent` header or just the bot's name, matched without case anywhere in the string. [isBot](./isBot) explains what the four category functions share and why a `User-Agent` alone proves nothing.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'A `User-Agent` header or a bot name. An empty string returns `false`.' }
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

## Recognized names

The 52 names below are matched as of October 2026, grouped by the company or project that runs them. Names the operator documents itself are listed together with names found only in public bot directories.

| Operator             | Names                                                                   |
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
| Unknown              | Aranet-SearchBot                                                        |
