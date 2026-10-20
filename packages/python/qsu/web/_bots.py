"""(Private) The names behind `isBot`, `isSearchBot`, `isAiSearchBot`, `isAiAgentBot` and
`isAiTrainingBot`.

Each entry is the source of a regular expression, matched without case anywhere in the
string, and the three packages carry the same lists in the same order. A name is filed
where its operator's own documentation puts it first. Where the operator says nothing,
the verified bot directory of Cloudflare Radar decides.

The AI names cover every name in the ai.robots.txt project, and many of the other names
come from the crawler-user-agents project. Both are published under the MIT License:

Copyright (c) 2024 ai.robots.txt
Copyright (c) 2017 Martin Monperrus

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
"""

import re

# Crawlers that index pages for a search engine.
_SEARCH_BOTS = (
	# Google
	r'googlebot',
	r'storebot-google',
	r'google-inspectiontool',
	# Microsoft
	r'bingbot(?!\.htm)',
	r'msnbot(?!\.htm)',
	# Apple
	r'applebot(?!-extended)',
	# DuckDuckGo
	r'duckduckbot',
	r'duckduckgo-favicons-bot',
	# Yandex
	r'yandexbot',
	r'yandeximages',
	r'yandexvideo',
	r'yandexmedia',
	r'yandexmobilebot',
	r'yandexrenderresourcesbot',
	r'yandexcombot',
	r'yandexfavicons',
	r'yandexblogs',
	r'yandeximageresizer',
	r'yandexontodb',
	r'yandexvertis',
	r'yandexverticals',
	r'yandexmarket',
	r'yandexsearchshop',
	r'yandexspravbot',
	r'yandexsitelinks',
	# Baidu
	r'baiduspider(?!-ads|-cpro)',
	# Sogou
	r'sogou web spider',
	r'sogou inst spider',
	r'sogou pic spider',
	r'sogou news spider',
	r'sogou orion spider',
	r'sogou head spider',
	r'sogou-test-spider',
	# Qihoo 360
	r'360spider',
	r'haosouspider',
	# Shenma (Alibaba/UC)
	r'yisouspider',
	# ByteDance
	r'toutiaospider',
	# Naver
	r'\byeti\b',
	r'naverbot',
	# Kakao (Daum)
	r'\bdaum\b',
	r'daumoa',
	# ZUM Internet
	r'zumbot',
	# Seznam.cz
	r'seznambot',
	r'seznamhomepagecrawler',
	r'seznam-zbozi-robot',
	# Qwant
	r'qwantbot',
	r'qwantify',
	# Mojeek
	r'mojeekbot',
	# Coc Coc
	r'coccocbot(?!-ads)',
	# Huawei
	r'petalbot',
	# Huawei (Aspiegel)
	r'aspiegelbot',
	# Yahoo
	r'slurp',
	# LY Corporation (Yahoo! JAPAN)
	r'y!?j-brw',
	r'y!?j-bru',
	r'y!?j-asr',
	r'y!?j-mmp',
	r'y!?j-wsc',
	# NTT Docomo (goo)
	r'\bichiro\b',
	# Exalead (Dassault)
	r'\bexabot',
	# Brave
	r'bravebot',
	# Kagi
	r'kagibot',
	# Marginalia
	r'search\.marginalia\.nu',
	# Swisscows
	r'swisscows favicons',
	# VK (Mail.ru)
	r'mail\.ru_bot',
	# SISTRIX
	r'seekport',
	# LY Corporation (LINE)
	r'linespider',
	# OpenWebSearch.eu
	r'owler \(ows\.eu',
	# Stract
	r'stractbot',
	# Alexandria.org
	r'alexandriaorgbot',
	# Freespoke
	r'freespoke',
	# Babbar (ibou.io)
	r'iboubot',
	# Ison Search
	r'isonsearchbot',
	# YaCy
	r'yacybot',
	# Gigablast
	r'gigabot',
	r'gigablastopensource',
	# Cliqz
	r'cliqzbot',
	# Neeva
	r'neevabot',
	# Tencent (Soso)
	r'sosospider',
	# NetEase (Youdao)
	r'youdaobot',
	# Easou
	r'easouspider',
	# Ask.com
	r'teoma',
	# Istella
	r'istellabot',
	# Orange
	r'orangebot',
	# Orange (Voila)
	r'voilabot',
	# Acoon
	r'acoonbot',
	# Findx
	r'findxbot',
	# DeuSu
	r'deusu',
	# TinEye (Idee)
	r'tineye-bot',
	# Picsearch
	r'\bpsbot\b',
)

# Crawlers that index pages so an AI product can cite them, and that their operator says do
# not train models.
_AI_SEARCH_BOTS = (
	# AddSearch
	r'addsearchbot',
	# AgentData
	r'agentdatabot',
	# Lyrenth
	r'aiwebindex(?!-agent)',
	# Amazon (AWS)
	r'amazon-kendra',
	r'amazon-qbusiness',
	r'bedrockbot',
	# Amazon
	r'amzn-searchbot',
	# Andi
	r'andibot',
	# Direqt
	r'anomura',
	# Unknown
	r'aranet-searchbot',
	# Atlassian
	r'atlassian-bot',
	# Microsoft
	r'azureai-searchbot',
	# Big Sur AI
	r'bigsur\.ai',
	# Bixel
	r'bixelbot',
	# Channel3
	r'channel3bot',
	# Anthropic
	r'claude-searchbot',
	# Cloudflare
	r'cloudflare-ai-search',
	r'cloudflare-autorag',
	# Google
	r'cloudvertexbot',
	# Diffbot
	r'diffbot(?!-user)',
	# ByteDance
	r'dola-searchbot',
	# Exa
	r'exasearchbot',
	# Valyu
	r'henkbot',
	# iAsk
	r'iaskbot',
	r'iaskspider',
	# ImageSift (Hive)
	r'imagesiftbot',
	# Keenable
	r'keenable-searchbot',
	r'keenablebot',
	# Moonshot AI
	r'kimi-searchbot',
	# Klaviyo
	r'klaviyoaibot',
	# Liner
	r'linerbot',
	# Meta
	r'meta-webindexer',
	# Mistral AI
	r'mistralai-index',
	# Naget
	r'nagetbot',
	# OpenAI
	r'oai-searchbot',
	# Perplexity
	r'perplexitybot',
	# ProRata.ai (Gist)
	r'proratainc',
	# Qualified
	r'qualifiedbot',
	# Querit
	r'querit-searchbot',
	r'queritbot',
	# Parallel Web Systems
	r'shapbot',
	# Tavily
	r'tavilybot',
	# Ceramic AI
	r'terra cotta',
	r'terracotta',
	# QuantumCloud
	r'wpbot',
	# xAI
	r'xai-searchbot',
	# Yandex
	r'yandexadditional',
	# You.com
	r'youbot',
	# Zanista
	r'zanistabot',
)

# Fetchers that visit a page only when a person asks an AI assistant or agent to, and the
# robots.txt names of such fetchers.
_AI_AGENT_BOTS = (
	# Ai2
	r'ai2bot-deepresearcheval',
	# Lyrenth
	r'aiwebindex-agent',
	# Amazon
	r'amazonbuyforme',
	r'amzn-user',
	r'novaact',
	# Apify
	r'apifybot',
	r'apifywebsitecontentcrawler',
	# BuddyBot Learning
	r'buddybot',
	# OpenAI
	r'chatgpt-user',
	# Anthropic
	r'claude-user',
	r'claude-web',
	# Cohere
	r'cohere-ai',
	# unclecode/crawl4ai (open-source)
	r'crawl4ai',
	# Crawlspace
	r'crawlspace',
	# Cognition
	r'\bdevin/',
	# Diffbot
	r'diffbot-user',
	# DuckDuckGo
	r'duckassistbot',
	# Exa
	r'exauser',
	# Firecrawl
	r'firecrawlagent',
	# GeistHaus
	r'geisthaus-pagefetcher',
	# Google
	r'gemini-deep-research',
	r'google-agent',
	r'google-gemini-cli',
	r'google-gemininotebook',
	r'google-pinpoint',
	r'googleagent-mariner',
	r'googleagent-urlcontext',
	r'notebooklm',
	# xAI
	r'grok-agent',
	r'grok-deepsearch',
	r'grokagent',
	r'grokappandroid',
	# Kagi
	r'kagi-fetcher',
	# Keenable
	r'keenable-user',
	# Moonshot AI
	r'kimi-agent',
	r'kimi-user',
	# Lightpanda
	r'lightpanda',
	# Butterfly Effect (Manus)
	r'manus-user',
	# Meta
	r'meta-externalfetcher',
	# Mistral AI
	r'mistralai-user',
	# Mozilla (Tabstack)
	r'mozilla-tabstack',
	# opencode
	r'opencode',
	# Perplexity
	r'perplexity-user',
	# Phind
	r'phindbot',
	# Poggio
	r'poggio-citations',
	# Qoder (Alibaba)
	r'qodercli',
	# QuillBot
	r'quillbot',
	# SB Intuitions (SoftBank)
	r'sbintuitions-searchbot',
	# Semrush
	r'semrushbot-ocob',
	# Parallel Web Systems
	r'shap-user',
	# Alibaba
	r'tongyibot',
	# Twin
	r'twinagent',
	# Baidu
	r'yiyanbot',
)

# Crawlers that collect pages to train AI models or to build datasets for that, and the
# robots.txt names that control such use.
_AI_TRAINING_BOTS = (
	# Ai2
	r'ai2bot(?!-deepresearcheval)',
	r'ai2bot-dolma',
	# aiHit
	r'aihitbot',
	# Amazon
	r'amazonbot',
	# Anthropic
	r'anthropic-ai',
	r'claudebot',
	# Apple
	r'applebot-extended',
	# Bright Data
	r'brightbot',
	# ByteDance
	r'bytespider',
	r'doubaobot',
	r'imagespider',
	r'tiktokspider',
	# Common Crawl
	r'ccbot',
	# Zhipu AI
	r'chatglm-spider',
	# Cloudflare
	r'cloudflarebrowserrenderingcrawler',
	# Cohere
	r'cohere-training-data-crawler',
	r'coherebot',
	# ROIS-DS (Japan)
	r'cotoyogi',
	# CragSoftware
	r'cragcrawler',
	# DeepSeek
	r'deepseekbot',
	# Echobox
	r'echobot bot',
	# Baidu
	r'erniebot',
	# Meta
	r'facebookbot',
	r'meta-externalagent',
	# FactSet
	r'factset_spyderbot',
	# Unknown
	r'friendlycrawler',
	r'kunatocrawler',
	r'laion-huggingface-processor',
	r'mycentralaiscraperbot',
	# Google
	r'google-extended',
	r'googleother',
	# OpenAI
	r'gptbot',
	# xAI
	r'grokbot',
	r'xai-grok',
	# Tencent
	r'hunyuan',
	# NICT (Japan)
	r'icc-crawler',
	# rom1504 (open-source tool)
	r'img2dataset',
	# ISS Corporate
	r'isscyberriskcrawler',
	# Kangaroo LLM
	r'kangaroo bot',
	# Keenable
	r'keenable-extended',
	# Moonshot AI
	r'kimibot',
	r'kimicrawler',
	r'moonshotbot',
	r'moonspider',
	# LAION
	r'laiondownloader',
	# Linguee (DeepL)
	r'linguee bot',
	# Mistral AI
	r'mistralai-training',
	r'mistralbot',
	# Webz.io
	r'omgili',
	r'webzio',
	# Huawei
	r'pangubot',
	# Panscient
	r'panscient',
	# Poseidon Research
	r'poseidon research crawler',
	# Alibaba
	r'qwenbot',
	# Reflection AI
	r'reflectionbot',
	# SB Intuitions (SoftBank)
	r'sbintuitionsbot',
	# Sidetrade
	r'sidetrade indexer bot',
	# Thinkbot
	r'thinkbot',
	# Timpi
	r'timpibot',
	# Velen
	r'velenpublicwebcrawler',
	# Wrtn (Korea)
	r'wrtnbot',
	# 01.AI
	r'\byibot',
)

# Bots in none of the four categories: SEO tools, link previews, monitors, feed readers,
# archivers, HTTP libraries and the like. A name that a generic word already matches is left
# out of the code.
_OTHER_BOTS = (
	# The Agent Times
	r'agenttimes',
	# Meta
	r'meta-externaltest',
	r'facebookexternalhit',
	r'meta-externalads',
	r'facebookcatalog',
	# Ahrefs
	r'ahrefssiteaudit',
	# DataForSEO
	r'rsiteauditor',
	# Babbar
	r'barkrowler',
	# SISTRIX
	r'sistrix optimizer',
	r'\(compatible; optimizer\)',
	# MegaIndex
	r'megaindex',
	# SEOkicks
	r'seokicks',
	# Sitebulb
	r'sitebulb',
	# Botify
	r'botify',
	# Audisto
	r'audisto',
	# Conductor (ContentKing)
	r'contentking',
	# Search Atlas
	r'searchatlas',
	# marketgoo
	r'marketgoo',
	# WooRank
	r'woorankreview',
	# Seoscanners.net
	r'seoscanners',
	# SEOlizer
	r'seolizer',
	# PR-CY
	r'pr-cy\.ru',
	# Alli AI
	r'alliai',
	# Morningscore
	r'morningscore',
	# Prerender.io
	r'prerender',
	# Capsule Code
	r'seo4ajax',
	# Wappalyzer
	r'wappalyzer',
	# WhatCMS
	r'whatcms',
	# 2IP
	r'2ip\.ru',
	# Pinterest
	r'pinterest/0\.',
	# Embedly
	r'embedly',
	# Iframely
	r'iframely',
	# Microsoft
	r'azure-logic-apps',
	# Google
	r'google-pagerenderer',
	r'googlemessages',
	r'google favicon',
	r'googleimageproxy',
	r'chrome privacy preserving prefetch proxy',
	r'googleweblight',
	r'chrome-lighthouse',
	r'google page speed insights',
	r'google-structured-data-testing-tool',
	r'googleproducer',
	r'google-calendar-importer',
	r'google-xrawler',
	r'mediapartners-google',
	r'google-adwords-instant',
	r'google-adwords-express',
	r'google-travelads-live',
	r'google-ads-conversions',
	r'google-firebase',
	r'google-safety',
	r'google-site-verification',
	r'google-trust-services',
	r'googleassociationservice',
	r'google-businesslinkverification',
	r'google-cws',
	r'apis-google',
	r'google-read-aloud',
	r'google-speakr',
	r'google-apps-script',
	r'googledocs',
	r'google search console',
	r'google-certificates-bridge',
	r'playstore-google',
	r'duplexweb-google',
	# VK
	r'vkshare',
	# Kakao
	r'kakaotalk-scrap',
	# LY Corporation (LINE)
	r'line-poker',
	# Snap
	r'snapchatads',
	# Bluesky
	r'bluesky cardyb',
	# Matrix.org
	r'synapse \(bot',
	# Friendica (any instance)
	r'friendica',
	# Discourse
	r'discourse forum onebox',
	# OpenGraph.io
	r'opengraph\.io',
	# ClickUp
	r'clickuplinkunfurler',
	# Yahoo
	r'yahoomailproxy',
	r'yahoocachesystem',
	r'yahoo ad monitoring',
	r'yahoo:linkexpander',
	# Flipboard
	r'flipboardproxy',
	r'flipboardrss',
	# Valve
	r'steamchat',
	r'valve/steam',
	# Yandex
	r'yandexrca',
	r'yandexmetrika',
	r'yandexfeed',
	r'yandexcalendar',
	r'yandexdirect',
	r'yandexadnet',
	r'yandexpartner',
	r'yandexwebmaster',
	r'yandexpagechecker',
	r'yandexuserproxy',
	# PagePeeker
	r'pagepeeker',
	# Vercel
	r'vercel-screenshot',
	# Seznam.cz
	r'seznamemailproxy',
	# Rambler
	r'ramblermail',
	# 37signals (HEY)
	r'hey\.com/imageproxy',
	# Fastmail
	r'fastmailua',
	# GitHub
	r'github-camo',
	r'github-hookshot',
	# Twilio
	r'twilioproxy',
	# Startpage
	r'startpageprivateimageproxy',
	# UKR.NET
	r'secureurl\.fwdcdn\.com',
	# Cloudflare
	r'cloudflare-alwaysonline',
	r'cloudflare-amp',
	r'cloudflare-prefetch',
	r'cloudflare-healthchecks',
	r'cloudflare-traffic-manager',
	r'cloudflareobservatory',
	r'cloudflare speedtest',
	r'cloudflare-speedtest',
	r'cloudflare-csup',
	r'collapsify',
	r'cloudflare custom hostname verification',
	r'cloudflare-ssldetector',
	# Google Cloud (customer code)
	r'appengine-google',
	# Thumbor (self-hosted)
	r'thumbor',
	# imgproxy (self-hosted)
	r'imgproxy',
	# SolarWinds Pingdom
	r'pingdom',
	# StatusCake
	r'statuscake',
	# Zoho Site24x7
	r'site24x7',
	# Datadog
	r'datadog synthetic',
	r'datadog agent',
	# New Relic
	r'newrelicpinger',
	r'newrelicsynthetics',
	# GTmetrix
	r'gtmetrix',
	# WebPageTest (Catchpoint)
	r'ptst/',
	# SpeedCurve
	r'speedcurve',
	# Catchpoint
	r'catchpoint',
	# Dynatrace
	r'ruxitsynthetic',
	# Microsoft Azure
	r'appinsights',
	# Dynatrace (Gomez)
	r'gomezagent',
	# Dotcom-Monitor
	r'dmbrowser',
	# SmartBear AlertSite
	r'dejaclick',
	# SmartBear
	r'alertsite',
	# Checkly
	r'checkly',
	# Zabbix
	r'zabbix',
	# Prometheus
	r'blackbox exporter',
	r'prometheus/',
	# collectd
	r'collectd',
	# Monit
	r'monit/',
	# Xymon
	r'xymon',
	# Uptime Kuma
	r'uptime-kuma',
	# Freshworks
	r'freshping',
	# HetrixTools
	r'hetrixtools',
	# NodePing
	r'nodeping',
	# updown.io
	r'updown\.io',
	# Oh Dear
	r'ohdear\.app',
	# Uptime.com
	r'www\.uptime\.com',
	# Hydrozen
	r'hydrozen\.io',
	# Sentry
	r'sentry/',
	# Honeybadger
	r'honeybadger',
	# SmartBear BugSnag
	r'bugsnag',
	# Montastic
	r'montastic',
	# Netumo
	r'netumo',
	# Panopta
	r'panopta',
	# Paessler
	r'prtg network monitor',
	# LogicMonitor
	r'logicmonitor',
	# SolarWinds
	r'solarwinds',
	# Splunk
	r'splunk synthetics',
	# Grafana Labs
	r'synthetic-monitoring-agent',
	# Gatus
	r'gatus',
	# Uptrends
	r'uptrends',
	# Uptimia
	r'uptimia',
	# WebSitePulse
	r'websitepulse',
	# SiteUptime
	r'siteuptime',
	# Pulsetic
	r'pulsetic\.com',
	# Kubernetes
	r'kube-probe',
	# AWS
	r'elb-healthchecker',
	r'amazon-route53-health-check-service',
	r'amazon simple notification service agent',
	# Google Cloud
	r'googlestackdrivermonitoring',
	r'googlehc',
	r'google-cloud-scheduler',
	r'google-cloud-tasks',
	# Automattic (Jetpack)
	r'jetmon',
	# WPMU DEV
	r'wpmudev',
	# BlogVault
	r'blogvault',
	# WP Umbrella
	r'wpumbrella',
	# ObservePoint
	r'observepoint',
	# Hotjar
	r'hotjar',
	# Crazy Egg
	r'crazy egg',
	# Contentsquare
	r'contentsquare',
	# DareBoost
	r'dareboost',
	# Ghost Inspector
	r'ghost inspector',
	# HostTracker
	r'hosttracker',
	# Check-Host
	r'check-host\.cc',
	# changedetection.io
	r'changedetection',
	# KeyCDN
	r'keycdn-tools',
	# Acquia (Monsido)
	r'acquia optimize',
	# Siteimprove
	r'siteimprove',
	# W3C
	r'w3c-checklink',
	r'w3c_i18n-checker',
	r'w3c-mobileok',
	r'w3c_unicorn',
	# Xenu
	r'xenu link sleuth',
	# Dead Link Checker
	r'deadlinkchecker',
	# brokenlinkcheck.com
	r'brokenlinkcheck\.com',
	# Dr. Link Check
	r'dlc/',
	# LY Corporation (Yahoo! JAPAN)
	r'y!?j-dlc',
	# Baidu
	r'baidu-yunguance',
	r'baidu-ads',
	r'baidu transcoder',
	# 360Monitoring
	r'monitoring360',
	# OnlineOrNot
	r'onlineornot',
	# Semonto
	r'semonto',
	# AccessStatus
	r'accessstatus',
	# Feedly
	r'feedly',
	# Feedbin
	r'feedbin',
	# Inoreader
	r'inoreader',
	# NewsBlur
	r'newsblur',
	# Feedspot
	r'feedspot',
	# The Old Reader
	r'theoldreader\.com',
	# BazQux Reader
	r'bazqux',
	# Miniflux (self-hosted)
	r'miniflux',
	# FreshRSS (self-hosted)
	r'freshrss',
	# NetNewsWire
	r'netnewswire',
	# Reeder
	r'reeder',
	# ReadKit
	r'readkit',
	# Liferea
	r'liferea',
	# KDE Akregator
	r'akregator',
	# Newsbeuter
	r'newsbeuter',
	# CommaFeed
	r'commafeed',
	# SimplePie (PHP library)
	r'simplepie',
	# MagpieRSS (PHP library)
	r'magpierss',
	# Python feedparser
	r'universalfeedparser',
	# Superfeedr
	r'superfeedr',
	# Netvibes
	r'netvibes',
	# Bloglovin
	r'bloglovin',
	# Blogtrottr
	r'blogtrottr',
	# Google (FeedBurner)
	r'feedburner',
	# Feeder
	r'feeder\.co',
	# MonitoRSS
	r'monitorss',
	# IFTTT
	r'ifttt',
	# dlvr.it
	r'dlvr\.it',
	# follow.it
	r'follow\.it',
	# FeedBlitz
	r'feedblitz',
	# Buttondown
	r'buttondown',
	# Overcast
	r'overcast/',
	# Pocket Casts
	r'pocket casts',
	r'pocketcasts/',
	# Apple (Apple Podcasts)
	r'^itms$',
	# Podchaser
	r'podchaserparser',
	# Downcast
	r'downcast/',
	# Breaker
	r'breaker/',
	# Spotify
	r'^spotify/1\.0$',
	# Apple
	r'apple-pubsub',
	r'swcd',
	# RSSOwl
	r'rssowl',
	# QuiteRSS
	r'quiterss',
	# RSS Bandit
	r'rssbandit',
	# FeedDemon
	r'feeddemon',
	# Feed Wrangler
	r'feed wrangler',
	# NewsGator
	r'newsgator',
	# Bloglines
	r'bloglines',
	# rss2tg
	r'rss2tg',
	# FeedOtter
	r'feedotter',
	# EchoFeed
	r'echofeed',
	# Open RSS
	r'openrss',
	# Protopage
	r'protopage',
	# Feedwind
	r'feedwind',
	# Internet Archive
	r'archive-it',
	# Internet Archive (software)
	r'heritrix',
	# Archive Team
	r'archiveteam',
	# Library of Congress
	r'loc\.gov/programs/web-archiving',
	r'library of congress web archiving',
	# Royal Danish Library (Netarkivet)
	r'netarkivindsamling',
	# National Library of New Zealand
	r'nlnz_iaharvester',
	# Library and Archives Canada
	r'lac_iaharvester',
	# National Library of Luxembourg
	r'nlux_iaharvester',
	# Pagefreezer
	r'pagefreezer',
	# ArchiveBox (self-hosted)
	r'archivebox',
	# XY Archive Compliance
	r'xy-archive-compliance',
	# NewsBank
	r'newsbank',
	# Authory
	r'authory',
	# HTTrack
	r'httrack',
	# WebCopier
	r'webcopier',
	# SiteSucker
	r'sitesucker',
	# MetaProducts
	r'offline explorer',
	# Spidersoft
	r'webzip',
	# Cyotek
	r'cyotekwebcopy',
	# GetRight
	r'getright/',
	# Go!Zilla
	r'go!zilla',
	# iGetter
	r'igetter/',
	# Download Ninja
	r'download ninja',
	# Outbrain
	r'outbrain',
	# Comscore
	r'proximic',
	# The Trade Desk
	r'ttd-content',
	# Mediavine
	r'mediavinemetadataparser',
	# Clickagy
	r'clickagy',
	# Scope3
	r'scope3',
	# Klaviyo
	r'klaviyo',
	# Channable
	r'channable',
	# Productsup
	r'productsup',
	# Raptive
	r'raptivesiteinspector',
	# curl
	r'\bcurl(?:/|$)',
	# Resty
	r'go-resty',
	# AsyncHttpClient
	r'ahc/',
	# Eclipse Jersey
	r'jersey/',
	# Eclipse Jetty
	r'jetty/',
	# Reactor Netty
	r'reactornetty',
	# axios
	r'axios',
	# node-fetch
	r'node-fetch',
	# Node.js undici
	r'undici',
	# got
	r'sindresorhus/got',
	# superagent
	r'node-superagent',
	# Deno
	r'deno/',
	# Bun
	r'bun/',
	# Dart (dart:io)
	r'dart/',
	# PHP
	r'^php\b|\bphp/\d',
	# PHP Curl Class
	r'php-curl-class',
	# WordPress HTTP API
	r'wordpress/',
	# Ruby rest-client
	r'rest-client',
	# Ruby Faraday
	r'faraday v',
	# Typhoeus (Ruby)
	r'typhoeus',
	# Mechanize (Perl/Ruby/Python)
	r'mechanize',
	# LWP (Perl)
	r'lwp::',
	r'lwp-trivial',
	# RestSharp (.NET)
	r'restsharp',
	# Windows
	r'microsoft-cryptoapi',
	r'microsoft bits',
	r'windows-update-agent',
	# Indy (Delphi)
	r'indy library',
	# Alamofire (Swift)
	r'alamofire',
	# Postman
	r'postmanruntime',
	# Kong Insomnia
	r'insomnia/',
	# Grafana k6
	r'k6/',
	# Apache
	r'apachebench',
	# gRPC
	r'grpc-',
	# newspaper (Python)
	r'newspaper/',
	# trafilatura (Python)
	r'trafilatura',
	# Cypress
	r'cypress/',
	# Scrapinghub Splash
	r'splash version/',
	# Colly (Go)
	r'colly',
	# Apache Nutch
	r'nutch',
	# jsdom
	r'jsdom',
	# Zombie.js
	r'zombie\.js',
	# SlimerJS
	r'slimerjs',
	# TestLocally
	r'testlocally',
	# Browsershots
	r'browsershots',
	# webkit2png
	r'webkit2png',
	# Censys
	r'censysinspect',
	# ZMap Project
	r'zgrab',
	# masscan
	r'masscan',
	# Nmap
	r'nmap scripting engine',
	# ProjectDiscovery
	r'nuclei',
	# Palo Alto Networks (Cortex Xpanse)
	r'^expanse',
	# sqlmap
	r'sqlmap',
	# Nikto
	r'nikto',
	# WPScan
	r'wpscan',
	# Invicti (Acunetix)
	r'acunetix',
	# Tenable
	r'nessus',
	# Greenbone
	r'openvas',
	# Qualys
	r'qualys',
	# Detectify
	r'detectify',
	# PortSwigger
	r'burpcollaborator',
	# Arachni
	r'arachni',
	# OWASP
	r'dirbuster',
	# ffuf
	r'fuzz faster u fool',
	# Jorgee scanner
	r'jorgee',
	# ZmEu scanner
	r'zmeu',
	# LeakIX
	r'l9tcpid',
	r'l9explore',
	r'l9scan',
	# Netcraft
	r'netcraft',
	# Modat
	r'modatscanner',
	# CyberPatrol
	r'cyberpatrol',
	# Google (VirusTotal)
	r'virustotal',
	# Sucuri
	r'sucuri',
	# SiteLock
	r'sitelock',
	# WebTotem
	r'wtotem',
	# Sansec
	r'sansec security monitor',
	# Snyk (securityheaders.com)
	r'securityheaders',
	# Qualys SSL Labs
	r'ssl labs',
	# Red Sift (Hardenize)
	r'hardenize',
	# Internet.nl
	r'internetnl',
	# Venafi
	r'tlsprobe',
	# watchTowr
	r'watchtowr',
	# Wordfence
	r'wordfence central',
	# CCN-CERT
	r'elsa-ccncert-scanner',
	# Probely
	r'probelyspdr',
	# Black Duck
	r'fastdast',
	# Splunk Attack Analyzer
	r'twinwavescanner',
	# Google (Project Shield)
	r'projectshield-urlcheck',
	# Kaspersky
	r'kaspersky lab cfr link resolver',
	# CookieHub
	r'cookiehub',
	# Cookie Maestro
	r'cookie-maestro',
	# ConsentCheck
	r'consentcheck',
	# Usercentrics
	r'usercentrics',
	# OneTrust
	r'onetrust',
	# Termly
	r'termly',
	# iubenda
	r'iubenda-radar',
	# Legal Monster
	r'legalmonster',
	# ActiveComply
	r'activecomply',
	# Let's Encrypt
	r'letsencrypt\.org',
	# DigiCert
	r'digicert dcv',
	# Sectigo
	r'sectigo dcv',
	# Sectigo (Comodo)
	r'comodo dcv',
	# Atlassian
	r'bitbucket-webhooks',
	# Stripe
	r'stripe/',
	# PayPal
	r'paypal ipn',
	# Shopify
	r'shopify-captain-hook',
	# Zapier
	r'zapier',
	# Make
	r'integromat',
	r'make/production',
	# Twilio SendGrid
	r'sendgrid event api',
	# Bird (SparkPost)
	r'sparkpost',
	# Svix
	r'svix-webhooks',
	# Zendesk
	r'zendesk webhook',
	# Zoom
	r'zoom marketplace',
	# Adyen
	r'adyen',
	# Recurly
	r'recurly webhooks',
	# Chargebee
	r'chargebee',
	# Trustly
	r'trustly/',
	# Automattic
	r'akismet',
	r'vaultpress',
	# Microsoft Power Automate
	r'microsoft-flow',
	# Braze
	r'braze sender',
	# cron-job.org
	r'cron-job\.org',
	# EasyCron
	r'easycron',
	# FastCron
	r'fastcron',
	# Notion
	r'notionautomation',
	# Omnisend
	r'omnisend',
	# MainWP
	r'mainwp',
	# GoDaddy (ManageWP)
	r'managewp',
	# WP Time Capsule
	r'wp time capsule',
	# Snipcart
	r'snipcart',
	# Metorik
	r'metorik',
	# Verifone
	r'2checkout',
	# Turnitin
	r'turnitin',
	# University of Milan
	r'bubing',
	# MaCoCu project
	r'macocu',
	# CLASSLA
	r'classla-web',
	# Aranea corpora project
	r'aranea',
	# CISPA Helmholtz Center
	r'cispa',
	# RWTH Aachen
	r'researchscan\.comsys\.rwth-aachen\.de',
	# Internet measurement researchers
	r'internetmeasurement',
	# Net Systems Research
	r'netsystemsresearch',
	# Carnegie Mellon University
	r'cmu-cylab',
	# Johns Hopkins University
	r'omim-litrack',
	# Anthology (Blackboard)
	r'blackboard safeassign',
	# Chegg (EasyBib)
	r'easybib autocite',
	# Wikimedia Foundation
	r'citoid/wmf',
	r'zoterotranslationserver',
	# University of Georgia
	r'ugaresearchagent',
	# University of Michigan
	r'web measure/',
	# Dataprovider.com
	r'dataprovider',
	# BuiltWith
	r'builtwith',
	# ZoomInfo (Datanyze)
	r'datanyze',
	# Brandwatch
	r'brandwatch',
	# Meltwater
	r'meltwaternews',
	# Awario
	r'awario',
	# NewsNow
	r'newsnow',
	# upday (Samsung news)
	r'upday/',
	# Muck Rack
	r'muckrack',
	# Mozilla (Pocket, closed 2025)
	r'pocketparser',
	# Instapaper
	r'instapaper',
	# Twingly
	r'twingly',
	# Algolia
	r'algoliarecommend',
	# Squiz
	r'funnelback',
	# SEMKNOX
	r'sitesearch360',
	# Cludo
	r'cludo',
	# Mars Flag (MARS FINDER)
	r'\(dbot\)',
	# Silktide
	r'silktide',
	# A11y Pulse
	r'a11ypulse',
	# GTranslate
	r'gtranslate-translation-proxy',
	# Added Bytes (Readable)
	r'readable/',
	# PDF24
	r'pdf24 url to pdf',
	# PrintFriendly
	r'printfriendly\.com',
	# WhereGoes
	r'wheregoes\.com',
	# NETVIGIE
	r'netvigie',
	# fediverse.observer
	r'poduptime',
	# Uptime Doctor
	r'uptimedoctor',
	# Hexometer
	r'hexometer',
	# unknown synthetic monitor
	r'syntheticsagent',
	# InfoTrust (Tag Inspector)
	r'taginspector',
	# Cisco ThousandEyes
	r'thousandeyes',
	# Sindup
	r'sindup',
	# Stape
	r'stape',
	# Attracta
	r'attracta',
	# TraceMyFile
	r'tracemyfile',
	# PRO Sitemaps
	r'pro-sitemaps',
	# Criticalcss.com
	r'criticalcss\.com',
	# Asana
	r'websitemetadataretriever',
	# Miniature.io
	r'miniature\.io',
	# Highwinds (StackPath)
	r'hwcdn',
	# Cisco (ClamAV)
	r'clamav',
	# Foregenix
	r'foregenix',
	# Bit Discovery (Tenable)
	r'bitdiscovery',
	# EmailWolf
	r'emailwolf',
	# HUMAN (PerimeterX)
	r'perimeterx integration services',
	# Impact.com
	r'impact\.com agent',
	# Adbeat
	r'adbeat\.com',
	# Xaxis
	r'xaxissemanticsclassifier',
	# DataFeedWatch
	r'datafeedwatch',
	# e.ventures
	r'evc-batch',
	# Geedo
	r'geedoshopproductfinder',
	# The New York Times
	r'new york times newsgathering',
	# Nuzzel
	r'nuzzel',
	# mnoGoSearch
	r'mnogosearch',
	# Apache Sparkler
	r'sparkler',
	# M2E Pro
	r'm2e pro cron service',
	# Exodus
	r'exodusmovement',
	# request-promise (npm)
	r'request-promise',
	# OurFamilyWizard (Cozi)
	r'cozi-icalendar-feedreader',
	# Kaleido (remove.bg)
	r'remove\.bg',
)

# Words that only an automated client puts in its name. `isBot` reads them; the four
# categories do not.
_GENERIC_BOT_WORDS = (
	r'bots?(?:\b|_)',
	r'crawl',
	r'spider',
	r'scrap(?:e|ing|y)',
	r'fetcher',
	r'headless',
	r'archiver',
	r'preview',
	r'validator',
	r'python',
	r'java(?!;|fx|script)',
	r'\bperl\b',
	r'\bruby(?:/|$)',
	r'\brss\b',
	r'go-http-client',
	r'\bcurl/|libcurl',
	r'\bwget\b',
	r'(?:^|[^b]|[^i]b|[^l]ib)http',
	r'@[a-z][\w-]+\.',
	r'^mozilla/\d\.\d(?: \(compatible\))?$',
	r'phantomjs|selenium|playwright|puppeteer',
)

# Devices and apps whose names contain one of those words. They are taken out of the string
# before the words are read.
_NOT_BOT_PATTERN = re.compile(r'cubot', re.IGNORECASE | re.ASCII)

# `re` tries every alternative at every position of the string, which made several hundred
# names cost more than half a millisecond for an ordinary browser string. The plain names are
# folded into a trie instead, so a position that cannot start any of them is given up after a
# character or two. `re.ASCII` keeps `\b` and case folding to ASCII, as in JavaScript and Dart.
_ESCAPED_CHARACTER = re.compile(r'\\(\W)')
_REGEXP_SYNTAX = re.compile(r'[\\^$.*+?()[\]{}|]')


def _trieSource(node: dict) -> str:
	# A shorter name already ends here, which is all a search needs.
	if '' in node:
		return ''

	branches = [re.escape(character) + _trieSource(child) for character, child in node.items()]

	return branches[0] if len(branches) == 1 else '(?:' + '|'.join(branches) + ')'


def _compileNames(names: tuple) -> 're.Pattern[str]':
	trie: dict = {}
	others = []

	for name in names:
		if _REGEXP_SYNTAX.search(_ESCAPED_CHARACTER.sub('', name)):
			others.append(name)
			continue

		node = trie

		for character in _ESCAPED_CHARACTER.sub(r'\1', name):
			node = node.setdefault(character, {})

		node[''] = {}

	return re.compile('|'.join(([_trieSource(trie)] if trie else []) + others), re.IGNORECASE | re.ASCII)

_SEARCH_BOT_PATTERN = _compileNames(_SEARCH_BOTS)
_AI_SEARCH_BOT_PATTERN = _compileNames(_AI_SEARCH_BOTS)
_AI_AGENT_BOT_PATTERN = _compileNames(_AI_AGENT_BOTS)
_AI_TRAINING_BOT_PATTERN = _compileNames(_AI_TRAINING_BOTS)
_BOT_PATTERN = _compileNames(
	_SEARCH_BOTS + _AI_SEARCH_BOTS + _AI_AGENT_BOTS + _AI_TRAINING_BOTS + _OTHER_BOTS + _GENERIC_BOT_WORDS
)
