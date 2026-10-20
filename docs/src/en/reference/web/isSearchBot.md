# isSearchBot

Returns `true` if a string names a crawler that indexes pages for a search engine, such as Googlebot, Bingbot, YandexBot, Baiduspider, Naver's Yeti or Daum's crawler. Allowing these is what keeps a site in search results.

Crawlers that index pages for an AI product's answers are [isAiSearchBot](./isAiSearchBot) instead, and a search engine's crawlers for ads, previews or verification are not search crawlers here; [isBot](./isBot) still recognizes them. Google and Apple do not run a separate crawler for AI training: their search crawlers collect the pages, and the robots.txt tokens `Google-Extended` and `Applebot-Extended` decide whether those pages may train AI models. Those two tokens are [isAiTrainingBot](./isAiTrainingBot), so `Applebot` is a search crawler and `Applebot-Extended` is not.

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
isSearchBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
isSearchBot('Yeti'); // Returns true
isSearchBot('Applebot-Extended'); // Returns false
isSearchBot('GPTBot'); // Returns false
```

:::

::: lang dart

```dart
isSearchBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
isSearchBot('Yeti'); // Returns true
isSearchBot('Applebot-Extended'); // Returns false
isSearchBot('GPTBot'); // Returns false
```

:::

::: lang python

```python
isSearchBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')   # Returns True
isSearchBot('Yeti')   # Returns True
isSearchBot('Applebot-Extended')   # Returns False
isSearchBot('GPTBot')   # Returns False
```

:::

## Recognized names

The 95 names below are matched as of October 2026, grouped by the company or project that runs them. Names the operator documents itself are listed together with names found only in public bot directories.

| Operator | Names |
| --- | --- |
| Acoon | AcoonBot |
| Alexandria.org | AlexandriaOrgBot |
| Apple | Applebot |
| Ask.com | Teoma |
| Babbar (ibou.io) | IbouBot |
| Baidu | Baiduspider |
| Brave | Bravebot |
| ByteDance | ToutiaoSpider |
| Cliqz | Cliqzbot |
| Coc Coc | coccocbot |
| DeuSu | DeuSu |
| DuckDuckGo | DuckDuckBot, DuckDuckGo-Favicons-Bot |
| Easou | EasouSpider |
| Exalead (Dassault) | Exabot |
| Findx | Findxbot |
| Freespoke | Freespoke |
| Gigablast | Gigabot, GigablastOpenSource |
| Google | Googlebot, Googlebot-Image, Googlebot-Video, Googlebot-News, Storebot-Google, Google-InspectionTool, Googlebot-Mobile, Googlebot-IA |
| Huawei | PetalBot |
| Huawei (Aspiegel) | AspiegelBot |
| Ison Search | IsonSearchBot |
| Istella | IstellaBot |
| Kagi | Kagibot |
| Kakao (Daum) | Daum, Daumoa |
| LY Corporation (LINE) | Linespider |
| LY Corporation (Yahoo! JAPAN) | Y!J-BRW, Y!J-BRU, Y!J-ASR, Y!J-MMP, Y!J-WSC |
| Marginalia | search.marginalia.nu |
| Microsoft | bingbot, msnbot |
| Mojeek | MojeekBot |
| Naver | Yeti, NaverBot |
| Neeva | Neevabot |
| NetEase (Youdao) | YoudaoBot |
| NTT Docomo (goo) | ichiro |
| OpenWebSearch.eu | Owler |
| Orange | OrangeBot |
| Orange (Voila) | VoilaBot |
| Picsearch | psbot |
| Qihoo 360 | 360Spider, HaosouSpider |
| Qwant | Qwantbot, Qwantify |
| Seznam.cz | SeznamBot, SeznamHomepageCrawler, Seznam-Zbozi-robot |
| Shenma (Alibaba/UC) | YisouSpider |
| SISTRIX | Seekport |
| Sogou | Sogou web spider, Sogou inst spider, Sogou Pic Spider, Sogou News Spider, Sogou Orion spider, Sogou head spider, Sogou-Test-Spider |
| Stract | StractBot |
| Swisscows | Swisscows Favicons |
| Tencent (Soso) | Sosospider |
| TinEye (Idee) | TinEye-bot |
| VK (Mail.ru) | Mail.RU_Bot |
| YaCy | yacybot |
| Yahoo | Slurp |
| Yandex | YandexBot, YandexImages, YandexVideo, YandexVideoParser, YandexMedia, YandexMobileBot, YandexRenderResourcesBot, YandexComBot, YandexFavicons, YandexBlogs, YandexImageResizer, YandexOntoDB, YandexVertis, YandexVerticals, YandexMarket, YandexSearchShop, YandexSpravBot, YandexSitelinks |
| ZUM Internet | ZumBot |
