# isAiAgentBot

Returns `true` if a string names a fetcher that visits a page only because a person asked an AI assistant or agent to, such as ChatGPT-User, Claude-User and Perplexity-User. A person asks a question or gives a task, and the assistant opens the page to answer it.

These requests stand in for a visitor rather than for a crawler, which is why OpenAI, Google and Perplexity, among others, say robots.txt may not apply to their user-triggered fetchers. Indexing for AI answers is [isAiSearchBot](./isAiSearchBot), and crawling for training is [isAiTrainingBot](./isAiTrainingBot).

Some agents drive an ordinary browser and send its `User-Agent` unchanged. Those cannot be told apart from a person by this header, and this function returns `false` for them.

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

## Recognized names

The 56 names below are matched as of October 2026, grouped by the company or project that runs them. Names the operator documents itself are listed together with names found only in public bot directories.

| Operator | Names |
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
