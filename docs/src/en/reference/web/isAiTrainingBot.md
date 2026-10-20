# isAiTrainingBot

Returns `true` if a string names a crawler that collects pages to train AI models, or to build datasets that are sold or published for that, such as GPTBot, ClaudeBot, CCBot for Common Crawl, Bytespider and Meta-ExternalAgent.

Robots.txt tokens that control training without being a crawler of their own count too. Google and Apple collect pages with their search crawlers, and `Google-Extended` and `Applebot-Extended` decide whether those pages may train their models, so passing either name returns `true` even though neither ever appears in a request. That makes this function useful when writing robots.txt as well as when reading requests.

When an operator says a crawler serves several purposes, it is put where the operator's own documentation puts it first. Indexing for AI answers is [isAiSearchBot](./isAiSearchBot), and a fetch made because a person asked is [isAiAgentBot](./isAiAgentBot).

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
isAiTrainingBot(
	'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)'
); // Returns true
isAiTrainingBot('Google-Extended'); // Returns true
isAiTrainingBot('Googlebot'); // Returns false
isAiTrainingBot('ChatGPT-User'); // Returns false
```

:::

::: lang dart

```dart
isAiTrainingBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)'); // Returns true
isAiTrainingBot('Google-Extended'); // Returns true
isAiTrainingBot('Googlebot'); // Returns false
isAiTrainingBot('ChatGPT-User'); // Returns false
```

:::

::: lang python

```python
isAiTrainingBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)')   # Returns True
isAiTrainingBot('Google-Extended')   # Returns True
isAiTrainingBot('Googlebot')   # Returns False
isAiTrainingBot('ChatGPT-User')   # Returns False
```

:::

## Recognized names

The 67 names below are matched as of October 2026, grouped by the company or project that runs them. Names the operator documents itself are listed together with names found only in public bot directories.

| Operator | Names |
| --- | --- |
| 01.AI | YiBot |
| Ai2 | AI2Bot, Ai2Bot-Dolma |
| aiHit | aiHitBot |
| Alibaba | QwenBot |
| Amazon | Amazonbot |
| Anthropic | anthropic-ai, ClaudeBot |
| Apple | Applebot-Extended |
| Baidu | ERNIEBot |
| Bright Data | Brightbot |
| ByteDance | Bytespider, DoubaoBot, imageSpider, TikTokSpider |
| Cloudflare | CloudflareBrowserRenderingCrawler |
| Cohere | cohere-training-data-crawler, Coherebot |
| Common Crawl | CCBot |
| CragSoftware | CragCrawler |
| DeepSeek | DeepSeekBot |
| Echobox | Echobot Bot |
| FactSet | Factset_spyderbot |
| Google | Google-Extended, GoogleOther, GoogleOther-Image, GoogleOther-Video |
| Huawei | PanguBot |
| ISS Corporate | ISSCyberRiskCrawler |
| Kangaroo LLM | Kangaroo Bot |
| Keenable | Keenable-Extended |
| LAION | LAIONDownloader |
| Linguee (DeepL) | Linguee Bot |
| Meta | FacebookBot, Meta-ExternalAgent |
| Mistral AI | MistralAI-Training, MistralBot |
| Moonshot AI | KimiBot, KimiCrawler, MoonshotBot, MoonSpider |
| NICT (Japan) | ICC-Crawler |
| OpenAI | GPTBot |
| Panscient | Panscient, panscient.com |
| Poseidon Research | Poseidon Research Crawler |
| Reflection AI | Reflectionbot |
| ROIS-DS (Japan) | Cotoyogi |
| rom1504 (open-source tool) | img2dataset |
| SB Intuitions (SoftBank) | SBIntuitionsBot |
| Sidetrade | Sidetrade indexer bot |
| Tencent | Hunyuan |
| Thinkbot | Thinkbot |
| Timpi | Timpibot |
| Velen | VelenPublicWebCrawler |
| Webz.io | omgili, omgilibot, Webzio, Webzio-Extended |
| Wrtn (Korea) | WRTNBot |
| xAI | GrokBot, xAI-Grok |
| Zhipu AI | ChatGLM-Spider |
| Unknown | FriendlyCrawler, KunatoCrawler, laion-huggingface-processor, MyCentralAIScraperBot |
