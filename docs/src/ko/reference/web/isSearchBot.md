# isSearchBot

문자열이 검색 엔진을 위해 페이지를 색인하는 크롤러를 가리키면 `true`를 반환합니다. Googlebot, Bingbot, YandexBot, Baiduspider, 네이버의 Yeti, 다음의 크롤러가 그렇습니다. 사이트가 검색 결과에 남으려면 이 크롤러들을 허용해야 합니다.

AI 제품의 답변을 위해 페이지를 색인하는 크롤러는 [isAiSearchBot](./isAiSearchBot)이 맡습니다. 검색 엔진이 광고, 미리보기, 소유 확인에 쓰는 크롤러도 여기서는 검색 크롤러가 아니며, [isBot](./isBot)은 이들도 알아봅니다. Google과 Apple은 AI 학습용 크롤러를 따로 두지 않습니다. 검색 크롤러가 페이지를 모으고, 그 페이지를 AI 학습에 써도 되는지는 robots.txt의 `Google-Extended`와 `Applebot-Extended` 토큰이 정합니다. 이 두 토큰은 [isAiTrainingBot](./isAiTrainingBot)이 맡으므로 `Applebot`은 검색 크롤러이고 `Applebot-Extended`는 아닙니다.

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

## 알아보는 이름

2026년 10월 기준으로 아래 95개 이름을 알아보며, 운영하는 회사나 프로젝트별로 묶었습니다. 운영사가 직접 밝힌 이름과 공개된 봇 목록에서만 확인한 이름이 함께 있습니다.

| 운영사 | 이름 |
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
