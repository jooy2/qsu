# isBot

Returns `true` if a string is, or comes from, an automated client: a search engine crawler, an AI crawler or agent, an SEO tool, a link preview fetcher, an uptime monitor, a feed reader, an archiver, an HTTP library or a headless browser.

The string can be a whole `User-Agent` header or just a bot's name, the way robots.txt writes it, so `Googlebot`, `GPTBot` and `curl` all return `true`. A name is matched without case, anywhere in the string.

Four functions answer for a part of what `isBot` recognizes, so a site can welcome one kind of crawler and turn another away:

| Function | Returns `true` for | For example |
| --- | --- | --- |
| [isSearchBot](./isSearchBot) | Crawlers that index pages for a search engine | Googlebot, Bingbot, YandexBot, Yeti, Daum |
| [isAiSearchBot](./isAiSearchBot) | Crawlers that index pages so an AI product can cite them in its answers, and that their operator says do not train | OAI-SearchBot, Claude-SearchBot, PerplexityBot |
| [isAiAgentBot](./isAiAgentBot) | Fetchers that visit a page only when a person asks an AI assistant or agent to | ChatGPT-User, Claude-User, Perplexity-User |
| [isAiTrainingBot](./isAiTrainingBot) | Crawlers that collect pages to train AI models or to build datasets for that | GPTBot, ClaudeBot, CCBot, Bytespider |

Everything else `isBot` recognizes belongs to none of the four: SEO crawlers, link previews, monitors, feed readers, archivers, HTTP libraries and headless browsers. Beyond the names it knows, `isBot` also counts words that only an automated client puts in its name, such as `bot`, `crawler` and `spider`, so a crawler it has never seen is still caught. The four category functions answer only for the names they know. A phone whose model name happens to contain one of those words, such as a Cubot, is not a bot.

A `User-Agent` header says whatever the client chooses to send. A scraper can claim to be Chrome, and anyone can claim to be Googlebot, so use these functions to sort honest traffic, and check the IP address against the ranges the operator publishes before trusting a claim to be one particular crawler.

`isBot` knows 1,012 names as of October 2026, besides the generic words: 95 search crawlers, 52 AI search crawlers, 56 AI agents, 67 AI training crawlers and 742 other bots. Each category function's page lists its names.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'A `User-Agent` header or a bot name. An empty string returns `false`.' }
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
