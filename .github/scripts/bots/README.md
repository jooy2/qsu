# Bot lists

`bots.json` holds every name behind `isBot` and the four bot category functions, and `generate.py` writes those names into the three packages, the fixtures their tests read and the reference pages. [CONTRIBUTING.md](../../../CONTRIBUTING.md#updating-the-bot-lists) explains how to change them.

## Sources and license

A name is filed where its operator's own documentation puts it first, and `source` records the page it was checked against. Where an operator documents nothing, the verified bot directory of Cloudflare Radar decides the category. `verified` says whether the operator confirms the name (`official`) or only a public directory lists it (`thirdparty`).

The AI names cover every name in [ai.robots.txt](https://github.com/ai-robots-txt/ai.robots.txt), and many of the other names come from [crawler-user-agents](https://github.com/monperrus/crawler-user-agents). The generic words and the browser strings that must not count as bots draw on the fixtures of [isbot](https://github.com/omrilotan/isbot), which is in the public domain. ai.robots.txt and crawler-user-agents are published under the MIT License:

```text
Copyright (c) 2024 ai.robots.txt
Copyright (c) 2017 Martin Monperrus

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
