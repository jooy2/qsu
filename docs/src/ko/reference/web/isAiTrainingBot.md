# isAiTrainingBot

문자열이 AI 모델을 학습시키거나, 그 용도로 판매하거나 공개하는 데이터셋을 만들려고 페이지를 수집하는 크롤러를 가리키면 `true`를 반환합니다. GPTBot, ClaudeBot, Common Crawl의 CCBot, Bytespider, Meta-ExternalAgent가 그렇습니다.

자체 크롤러는 아니지만 학습 여부를 정하는 robots.txt 토큰도 포함합니다. Google과 Apple은 검색 크롤러로 페이지를 모으고, 그 페이지를 모델 학습에 써도 되는지는 `Google-Extended`와 `Applebot-Extended`가 정합니다. 그래서 두 이름은 요청에 나타나지 않는데도 넘기면 `true`입니다. 요청을 읽을 때뿐 아니라 robots.txt를 작성할 때도 이 함수를 쓸 수 있습니다.

운영사가 여러 용도로 쓴다고 밝힌 크롤러는 운영사 문서가 먼저 꼽는 용도로 분류합니다. AI 답변을 위한 색인은 [isAiSearchBot](./isAiSearchBot), 사람이 요청해서 가져가는 요청은 [isAiAgentBot](./isAiAgentBot)이 맡습니다.

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

## 알아보는 이름

2026년 10월 기준으로 아래 67개 이름을 알아보며, 운영하는 회사나 프로젝트별로 묶었습니다. 운영사가 직접 밝힌 이름과 공개된 봇 목록에서만 확인한 이름이 함께 있습니다.

| 운영사 | 이름 |
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
| 확인되지 않음 | FriendlyCrawler, KunatoCrawler, laion-huggingface-processor, MyCentralAIScraperBot |
