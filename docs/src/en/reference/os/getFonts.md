# getFonts

<NodeRequired en />

Returns the fonts installed on the machine, one entry per face, sorted by family. Each entry carries the names the font gives itself, its weight, width and slant, whether it is monospace, and the file it was read from.

The font files are read directly, without loading a font library. TrueType and OpenType files (`.ttf`, `.otf`, `.ttc` and `.otc`) are read, including the faces inside a collection. Bitmap and Type 1 fonts (`.fon`, `.pcf`, `.bdf`, `.pfb`) and web fonts are not. Each file is read only where its header points, so a font of several hundred megabytes costs a few small reads.

A font counts as installed when its file is in one of the font folders listed below. That is not always the list a font menu shows:

- macOS keeps some of the fonts it ships out of its font menus. They are in its font folders, so they are listed here.
- A variable font is one entry, not one per named style it offers.
- A family whose name begins with `.` is left out. macOS uses such names for the fonts it keeps for itself.

When a font names itself in several languages, the US English name is used. A file that cannot be read, or is not a font after all, is skipped rather than failing the call.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`%WINDIR%\\Fonts` and `%LOCALAPPDATA%\\Microsoft\\Windows\\Fonts`, along with any file registered elsewhere under the `Fonts` key of `HKLM` or `HKCU`. JavaScript reads the registry through `reg`, which prints in the console code page, so a registered path with a character outside it is skipped.' },
	{ os: 'macos', note: '`/System/Library/Fonts`, `/Library/Fonts`, `~/Library/Fonts`, and the fonts macOS downloads on demand under `/System/Library/AssetsV2`.' },
	{ os: 'linux', note: '`$XDG_DATA_HOME/fonts` (`~/.local/share/fonts` by default), `fonts` under each folder in `$XDG_DATA_DIRS` (`/usr/local/share` and `/usr/share` by default), and `~/.fonts`. A folder added to the fontconfig configuration by hand is not read. A server or container image often has no fonts, and the list is then empty.' },
	{ os: 'android', languages: 'dart', note: '`/system/fonts`.' },
	{ os: 'ios', languages: 'dart', support: 'partial', note: '`/System/Library/Fonts`. Whether the app sandbox lets an app read that folder has not been confirmed. When it does not, the list is empty.' }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'options', type: 'GetFontsOptions', named: true, desc: 'See the table below.' }
]" />

<ParamsTable name="GetFontsOptions" :rows="[
	{ name: 'directories', type: 'string[]', desc: 'Read these folders and everything under them instead of the system font folders, and skip the Windows registry. Use it for the fonts an application ships in a folder of its own.' }
]" />

## Returns

<ReturnType :type="{ js: 'Promise<object[]>', dart: 'Future<List<FontInfo>>' }" />

<ParamsTable name="FontInfo" :rows="[
	{ name: 'family', type: 'string', desc: 'The family name, such as `Menlo`. The typographic family is preferred, so every weight of a family shares one name.' },
	{ name: 'style', type: 'string', desc: 'The style within the family, such as `Bold Italic`. `Regular` when the font names none.' },
	{ name: 'fullName', type: 'string', desc: 'The full name, such as `Menlo Bold`. When the font names none, the family and the style joined by a space.' },
	{ name: 'postScriptName', type: 'string | null', desc: 'The PostScript name, such as `Menlo-Bold`.' },
	{ name: 'version', type: 'string | null', desc: 'The version as the font writes it, such as `Version 2.137`.' },
	{ name: 'manufacturer', type: 'string | null', desc: 'The foundry or vendor.' },
	{ name: 'designer', type: 'string | null', desc: 'The designer.' },
	{ name: 'weight', type: 'number', desc: 'The weight on the scale from `1` to `1000`, where `400` is regular and `700` is bold. A font too old to carry one is `700` when it is marked bold and `400` otherwise.' },
	{ name: 'width', type: 'number', desc: 'The width from `1` (ultra-condensed) to `9` (ultra-expanded), where `5` is normal.' },
	{ name: 'italic', type: 'boolean', desc: 'Whether the face is italic or oblique.' },
	{ name: 'monospace', type: 'boolean', desc: 'Whether the face draws every character at one width. See below.' },
	{ name: 'variable', type: 'boolean', desc: 'Whether it is a variable font, which holds a range of styles in one face.' },
	{ name: 'color', type: 'boolean', desc: 'Whether it carries color glyphs, as an emoji font does.' },
	{ name: 'path', type: 'string', desc: 'The absolute path of the file, with links resolved.' },
	{ name: 'index', type: 'number', desc: 'The position of the face in its file. A font collection (`.ttc`, `.otc`) holds several, and a single font is `0`.' }
]" />

### Monospace

`monospace` is `true` when the font declares itself monospace, or when the characters from `U+0020` to `U+007E` (the space, the digits, the Latin letters and the ASCII punctuation) all have the same advance width. The second check finds the fonts that leave the declaration out, such as Monaco and Courier on macOS. A font that has no glyph for one of those characters fails it, so a symbol or emoji font is not reported as monospace.

## Examples

::: lang js

```javascript
const fonts = await getFonts();

new Set(fonts.filter((font) => font.monospace).map((font) => font.family));
// Returns Set { 'Andale Mono', 'Courier', 'Courier New', 'Menlo', 'Monaco', ... }

await getFonts({ directories: ['./assets/fonts'] });
```

:::

::: lang dart

```dart
final List<FontInfo> fonts = await getFonts();

fonts.where((font) => font.monospace).map((font) => font.family).toSet();
// Returns {Andale Mono, Courier, Courier New, Menlo, Monaco, ...}

await getFonts(directories: ['./assets/fonts']);
```

:::

::: lang python

```python
fonts = getFonts()

{font['family'] for font in fonts if font['monospace']}
# Returns {'Andale Mono', 'Courier', 'Courier New', 'Menlo', 'Monaco', ...}

getFonts(directories=['./assets/fonts'])
```

:::

An entry, as it is returned for Menlo on macOS:

```json5
{
	family: 'Menlo',
	style: 'Regular',
	fullName: 'Menlo Regular',
	postScriptName: 'Menlo-Regular',
	version: '17.0d1e1',
	manufacturer: 'Bitstream',
	designer: 'Jim Lyles',
	weight: 400,
	width: 5,
	italic: false,
	monospace: true,
	variable: false,
	color: false,
	path: '/System/Library/Fonts/Menlo.ttc',
	index: 0
}
```
