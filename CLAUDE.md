# CLAUDE.md

Guidance for AI agents (and humans) working in this repository. Written in English to
match the repo's existing docs (`README.md`, `CONTRIBUTING.md`).

## What qsu is

**qsu (Quick & Simple Utility)** is a utility library that provides the *same* set of
frequently‑used helper functions across **three languages**: JavaScript/Node, Dart/Flutter,
and Python. It is a monorepo:

```
packages/
  javascript/   # npm package `qsu` (TypeScript source)
  dart/         # pub package `qsu`
  python/       # PyPI package `qsu`
docs/           # VitePress documentation site (en + ko), published to qsu.cdget.com
```

### The core principle: cross‑language parity

The whole point of qsu is that a function behaves identically in every language it supports.
When you add or change a function, treat all three packages as one logical change:

- **Same function name in every language**, in `camelCase` — even in Python and Dart
  (e.g. `getSlug`, `arrGroupByMaxCount`). This is intentional and non‑idiomatic on purpose,
  so users switching languages get the same API.
- **Same behavior and same test cases.** Port the tests too, not just the implementation.
- **Same category.** Functions are grouped into categories (`array`, `crypto`, `date`,
  `file`, `format`, `math`, `misc`, `net`, `object`, `os`, `string`, `verify`, `web`).
- Not every function exists in every language (e.g. `fetchData` and the `os/*` functions are
  JS + Python only; Dart has no `net`/`os`). When a function is language‑specific, the docs
  title reflects it (see the `<Lang />` badge). Don't invent parity that the sources don't
  have — verify against the actual signatures.

## Packages

### JavaScript — `packages/javascript`

- **Source:** TypeScript in `lib/`, one folder per category, each with an `index.ts` that
  re‑exports its functions. `lib/index.ts` re‑exports the browser‑safe categories. Shared
  types live in `lib/_types/global.ts` and are published under the `qsu/types` subpath.
- **Node‑only functions:** `crypto`, `file`, `net`, `os` live under `lib/node/` and are
  exported via the **`qsu/node`** subpath (they need a Node runtime). Everything under
  `lib/` root must stay browser‑safe.
- **Build:** `npm run build` (`tsc` → `terser` minify). Tests build first.
- **Test:** `npm run test` (builds, then `node --test` over `test/**/*.test.ts`). Tests use
  `node:test` + `assert`, one `*.test.ts` per category, importing from `../dist`.
- **Lint/format:** `npm run lint` / `npm run lint:fix` (ESLint), `npm run format:fix` (Prettier).
- **Engine:** Node >= 18.

### Dart — `packages/dart`

- **Source:** `lib/src/<category>.dart`, all re‑exported from `lib/qsu.dart`.
- **Optional arguments are Dart named parameters** (`{Type name = default}`) — e.g.
  `fileSizeFormat(int bytes, {int? decimals, bool? ceil})`. This is the "named" boundary the
  docs highlight (see ParamsTable below).
- **Test:** `dart pub get` then `dart test`. One `*_test.dart` per category using
  `package:test` (`group`/`test`/`expect`).
- **Format/analyze:** `dart format .`, `dart analyze`.
- **SDK:** `^3.5.0`.

### Python — `packages/python`

- **Source:** `qsu/<category>/<functionName>.py`, one function per file. Public functions are
  `camelCase`; module‑private helpers are prefixed with `_` (e.g. `_is_boundary`).
- **Options** are passed either as a `dict` positional arg or as keyword arguments, mirroring
  the JS options object / Dart named params.
- **Test:** `pip install -e ".[dev]"` then `pytest`. One `test_<category>.py` per category
  using plain `assert`.
- **Requires:** Python >= 3.8. Build backend: Hatch.

## Documentation — `docs/`

VitePress site. **Requires Node 18+ to build** (the repo's default `node` may be older; use a
newer Node when running docs commands, or the build fails during Vite config resolution with a
`crypto.getRandomValues` error unrelated to the content).

- **Source:** `docs/src`. Reference docs mirror the code: one Markdown file per function under
  both `en/reference/<category>/<fn>.md` and `ko/reference/<category>/<fn>.md`.
- **Locales:** configured in `docs/src/.vitepress/config.mts` via `supportedLocale`
  (`en` default at root, `ko` under `/ko/`). English is the fallback; per
  `CONTRIBUTING.md`, you may write new‑language docs in your own language without translating.
- **Package manager:** pnpm. Common commands (run inside `docs/`): `pnpm install`,
  `pnpm run dev`, `pnpm run build`, `pnpm run format`.
- **Custom Vue components** (`docs/src/.vitepress/components`, registered in `theme/index.ts`):
  - `Lang` / `LangLogo` — the programming‑language badges (js/dart/python) in page titles.
  - `LangSelect` / `Layout` — the language switch above the sidebar menu, and the layout that
    places it (see next section).
  - `LangNotice` — the "not available in *language*" banner above a function a package lacks.
  - `NodeRequired` — the "requires a Node.js runtime (`qsu/node`)" banner. JavaScript only.
  - `ParamsTable` — the parameter tables (see below).
  - `ReturnType` — the **Returns** section.

### The language switch

The sidebar carries a JavaScript / Dart / Python switch, and it decides what every page says.
The choice is kept in `localStorage` and applied to `<html data-code-lang>` by an inline
script before the first paint, so nothing flashes. Every language's content is in the
document at once and CSS displays one of them, so switching costs one attribute write and no
re-render. The data files behind it live in `docs/src/.vitepress/data`.

Language‑scoped content is written as a container, and several languages may share one:

````md
::: lang js

```javascript
duration(604800000); // Returns '7 Days'
```

:::
````

Two rules follow from this:

- **The `<Lang />` badge in a page's title is data, not decoration.** `config.mts` reads it to
  build `functionLanguages`, which the sidebar marks, the notice and the fallback below all
  depend on. A badge that claims a language must have a `::: lang` block for it, and every
  locale's badge must agree; `collectFunctionLanguages` checks both, failing `pnpm run build`
  and warning in the dev server.
- **A page a package does not implement falls back to the first one it does.** A reader on
  Dart looking at `os/getCpu` gets the JavaScript documentation with a notice above it, rather
  than an empty page. `displayLanguages` in `data/languages.ts` is where that happens; the
  Markdown does not have to know.

### Types across languages

A page documents a signature once, in the JavaScript package's terms, and
`docs/src/.vitepress/data/types.ts` translates it: `string` becomes `String` in Dart and `str`
in Python, `Promise<void>` a `Future<void>` and a plain `None`. Numbers default to `int`,
which is what qsu's numeric parameters almost always are.

Where a package really is different, the row says so and the translation steps aside:

```md
{ name: 'milliseconds', type: { js: 'number', dart: 'num', python: 'float' } }
```

Only name the packages that differ; the ones left out are still translated from `js`. Read
the type off the package's own source before writing one of these.

### The `ParamsTable` component

All reference docs render their **Parameters** section with `<ParamsTable>` (not bullet
lists). It is data‑driven:

```md
<ParamsTable :rows="[
  { name: 'text', type: 'string', required: true, desc: 'The input text.' },
  { name: 'options', type: 'SlugOptions', named: true, desc: 'See the table below.' }
]" />
```

Row schema `{ name, type, required?, named?, default?, desc? }`:

- `type` — the JavaScript package's type (`string`, `number`, `boolean`, `object`, `any[]`,
  union like `'a' | 'b'`), translated for the other two. Omit a trailing `| undefined`;
  reflect optionality via `required`. Pass `{ js, dart, python }` instead where a package
  genuinely differs — see "Types across languages" above.
- `required: true` for required params; omit for optional. **Never** set both `required` and
  `default` on the same row.
- `default` — the documented default. For string/quoted literals use a backtick template so
  the inner quotes survive the JS array literal: ``default: `'-'` ``, ``default: `''` ``.
- `named: true` — marks the parameter where arguments become **Dart named parameters /
  Python keyword arguments** (usually the options object). The chip and the footnote are
  rendered per language, and JavaScript sees neither.
- `desc` — supports inline `` `code` ``; rendered in a merged full‑width row below the param.
- **Object‑typed params:** put the type name in `type` and expand it in a *second*
  `<ParamsTable name="TypeName" :rows="[...]" />`. The expanded fields are **not** `named`.

Localization: every string the docs' own components draw lives in
`docs/src/.vitepress/data/i18n.ts`, keyed by locale and falling back to `en`. To support a new
documentation language, add its key to every entry there and to `supportedLocale` in
`config.mts`. `reference/format/duration.md` is the canonical example to copy from.

### The `ReturnType` component

The **Returns** section is `<ReturnType type="string" />`, which renders `string`, `String` or
`str` depending on the switch. It takes the same per‑language object as a row does:

```md
<ReturnType :type="{ js: 'number', dart: 'num', python: 'float' }" />
```

## Commit conventions

Follow the existing history: `[scope] tag: message`.

- **scope:** `javascript` | `dart` | `python` | `common` (docs/CI touching everything).
- **tag** (Udacity Git style): `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`;
  plus informal `package` (deps/config) and `typo`.
- Write in English. Wrap identifiers/paths in backticks. Example:
  `[python] feat: add \`getSlug\` method`.
- Prefer one logical change per commit; a cross‑language feature is often split into one
  commit per package.

## Checklist when adding or changing a function

1. Implement it in **all supported packages** (JS, Dart, Python) with the same `camelCase`
   name, category, and behavior. Verify signatures against each other for parity.
2. Add/update **tests in every package** and make sure existing tests pass
   (`npm run test` / `dart test` / `pytest`).
3. Update **both `en` and `ko`** reference docs; use `<ParamsTable>` for parameters and
   `<ReturnType>` for the return type, and set `named`/`required`/`default`/`type` accurately
   against the *source signatures* (defaults, optionality and per‑language types live in the
   code, not in the old prose).
4. Give each package's example its own `::: lang` block, and keep the docs `<Lang />` title
   badge honest about which languages actually implement it — the badge and the blocks must
   agree, since the sidebar marks and the notice are built from the badge.
   Add the same entry to `docs/src/public/llms.txt` (served at `/llms.txt`): one line under the
   function's category section, with the supported languages and a one-line summary matching the
   English doc's opening paragraph.
5. Run lint/format for the languages you touched (ESLint/Prettier, `dart format`,
   and Python formatting) before committing.

## Language‑specific notes & gotchas

- **JS browser vs Node split:** anything using `node:*` APIs must live under `lib/node/` and
  ship via `qsu/node`; don't import Node built‑ins from the browser‑safe root.
- **Dart:** optional args are named parameters; nullable defaults (`{bool? x = false}`) are
  common — the *effective* default may come from Dart even when JS/Python express it
  differently. Reconcile before documenting a single `default`.
- **Python:** the `camelCase` public API is deliberate; keep helper functions `_`‑prefixed and
  private. Options can arrive as a dict or kwargs — support both like the existing functions.
- **Docs build needs Node 18+.** If a docs build fails at Vite config resolution, check your
  Node version first.
