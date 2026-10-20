# isAiAgentBot

문자열이 사람이 AI 어시스턴트나 에이전트에게 요청했을 때만 페이지를 방문하는 페처를 가리키면 `true`를 반환합니다. ChatGPT-User, Claude-User, Perplexity-User가 그렇습니다. 사람이 질문하거나 일을 맡기면 어시스턴트가 답하려고 페이지를 엽니다.

이 요청은 크롤러가 아니라 방문자를 대신하는 것이어서, OpenAI, Google, Perplexity 등은 사용자 요청으로 움직이는 페처에 robots.txt가 적용되지 않을 수 있다고 밝힙니다. AI 답변을 위한 색인은 [isAiSearchBot](./isAiSearchBot), 학습을 위한 수집은 [isAiTrainingBot](./isAiTrainingBot)이 맡습니다.

일반 브라우저를 움직이면서 그 `User-Agent`를 그대로 보내는 에이전트도 있습니다. 이런 에이전트는 이 헤더로는 사람과 구별할 수 없어서 이 함수는 `false`를 반환합니다.

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
isAiAgentBot(
	'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot'
); // Returns true
isAiAgentBot('Claude-User'); // Returns true
isAiAgentBot('ClaudeBot'); // Returns false
isAiAgentBot('OAI-SearchBot'); // Returns false
```

:::

::: lang dart

```dart
isAiAgentBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot'); // Returns true
isAiAgentBot('Claude-User'); // Returns true
isAiAgentBot('ClaudeBot'); // Returns false
isAiAgentBot('OAI-SearchBot'); // Returns false
```

:::

::: lang python

```python
isAiAgentBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot')   # Returns True
isAiAgentBot('Claude-User')   # Returns True
isAiAgentBot('ClaudeBot')   # Returns False
isAiAgentBot('OAI-SearchBot')   # Returns False
```

:::

## 알아보는 이름

2026년 10월 기준으로 아래 56개 이름을 알아보며, 운영하는 회사나 프로젝트별로 묶었습니다. 운영사가 직접 밝힌 이름과 공개된 봇 목록에서만 확인한 이름이 함께 있습니다.

| 운영사 | 이름 |
| --- | --- |
| Ai2 | AI2Bot-DeepResearchEval |
| Alibaba | TongyiBot |
| Amazon | AmazonBuyForMe, Amzn-User, NovaAct |
| Anthropic | Claude-User, Claude-Web |
| Apify | ApifyBot, ApifyWebsiteContentCrawler |
| Baidu | YiyanBot |
| BuddyBot Learning | BuddyBot |
| Butterfly Effect (Manus) | Manus-User |
| Cognition | Devin |
| Cohere | cohere-ai |
| Crawlspace | Crawlspace |
| Diffbot | Diffbot-User |
| DuckDuckGo | DuckAssistBot |
| Exa | ExaUser |
| Firecrawl | FirecrawlAgent |
| GeistHaus | GeistHaus-PageFetcher |
| Google | Gemini-Deep-Research, Google-Agent, Google-Gemini-CLI, Google-GeminiNotebook, Google-NotebookLM, Google-Pinpoint, GoogleAgent-Mariner, GoogleAgent-URLContext, NotebookLM |
| Kagi | kagi-fetcher |
| Keenable | Keenable-User |
| Lightpanda | Lightpanda |
| Lyrenth | AIWebIndex-Agent |
| Meta | Meta-ExternalFetcher |
| Mistral AI | MistralAI-User |
| Moonshot AI | Kimi-Agent, Kimi-User |
| Mozilla (Tabstack) | Mozilla-Tabstack |
| OpenAI | ChatGPT-User |
| opencode | opencode, OpenCode-User |
| Parallel Web Systems | Shap-User |
| Perplexity | Perplexity-User |
| Phind | PhindBot |
| Poggio | Poggio-Citations |
| Qoder (Alibaba) | qodercli |
| QuillBot | QuillBot, quillbot.com |
| SB Intuitions (SoftBank) | SBIntuitions-SearchBot |
| Semrush | SemrushBot-OCOB |
| Twin | TwinAgent |
| unclecode/crawl4ai (open-source) | Crawl4AI |
| xAI | grok-agent, Grok-DeepSearch, GrokAgent, GrokAppAndroid |
