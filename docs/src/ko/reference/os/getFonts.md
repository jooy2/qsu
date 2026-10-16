# getFonts

<NodeRequired ko />

컴퓨터에 설치된 폰트를 face 하나당 한 항목씩, family 순으로 정렬해 반환합니다. 각 항목에는 폰트가 스스로 밝힌 이름, 굵기, 너비, 기울기, monospace 여부, 그리고 읽어 온 파일이 들어 있습니다.

폰트 라이브러리를 불러오지 않고 폰트 파일을 직접 읽습니다. 읽는 형식은 TrueType과 OpenType 파일(`.ttf`, `.otf`, `.ttc`, `.otc`)이고, 컬렉션 안의 face도 모두 읽습니다. 비트맵 폰트와 Type 1 폰트(`.fon`, `.pcf`, `.bdf`, `.pfb`), 웹 폰트는 읽지 않습니다. 파일마다 헤더가 가리키는 부분만 읽으므로, 수백 MB짜리 폰트도 몇 번의 작은 읽기로 끝납니다.

아래 표의 폰트 폴더에 파일이 있으면 설치된 폰트로 봅니다. 그래서 폰트 메뉴에 보이는 목록과 항상 같지는 않습니다.

- macOS는 함께 설치한 폰트 일부를 폰트 메뉴에서 숨깁니다. 이 폰트도 폰트 폴더에 있으므로 목록에 나옵니다.
- 가변 폰트는 제공하는 스타일마다 나뉘지 않고 한 항목으로 나옵니다.
- 이름이 `.`으로 시작하는 family는 뺍니다. macOS가 내부용 폰트에 붙이는 이름입니다.

폰트가 여러 언어로 이름을 갖고 있으면 미국 영어 이름을 씁니다. 읽을 수 없는 파일이나 폰트가 아닌 파일은 호출을 실패시키지 않고 건너뜁니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`%WINDIR%\\Fonts`와 `%LOCALAPPDATA%\\Microsoft\\Windows\\Fonts`를 읽고, `HKLM`이나 `HKCU`의 `Fonts` 키에 다른 위치로 등록된 파일도 읽습니다. JavaScript는 레지스트리를 `reg`로 읽는데, `reg`가 콘솔 코드 페이지로 출력하므로 그 코드 페이지에 없는 문자가 들어간 경로는 건너뜁니다.' },
	{ os: 'macos', note: '`/System/Library/Fonts`, `/Library/Fonts`, `~/Library/Fonts`, 그리고 macOS가 필요할 때 내려받아 `/System/Library/AssetsV2` 아래에 둔 폰트를 읽습니다.' },
	{ os: 'linux', note: '`$XDG_DATA_HOME/fonts`(기본값 `~/.local/share/fonts`), `$XDG_DATA_DIRS`의 각 폴더 아래 `fonts`(기본값 `/usr/local/share`, `/usr/share`), `~/.fonts`를 읽습니다. fontconfig 설정에 직접 추가한 폴더는 읽지 않습니다. 서버나 컨테이너 이미지에는 폰트가 없는 경우가 많고, 그때는 빈 목록을 반환합니다.' },
	{ os: 'android', languages: 'dart', note: '`/system/fonts`를 읽습니다.' },
	{ os: 'ios', languages: 'dart', support: 'partial', note: '`/System/Library/Fonts`를 읽습니다. 앱 샌드박스가 이 폴더 읽기를 허용하는지는 확인되지 않았고, 허용하지 않으면 빈 목록을 반환합니다.' }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'options', type: 'GetFontsOptions', named: true, desc: '아래 표를 참고하세요.' }
]" />

<ParamsTable name="GetFontsOptions" :rows="[
	{ name: 'directories', type: 'string[]', desc: '시스템 폰트 폴더 대신 이 폴더들과 그 하위 폴더를 읽고, Windows 레지스트리는 읽지 않습니다. 애플리케이션이 자기 폴더에 넣어 배포하는 폰트를 읽을 때 씁니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'Promise<object[]>', dart: 'Future<List<FontInfo>>' }" />

<ParamsTable name="FontInfo" :rows="[
	{ name: 'family', type: 'string', desc: '`Menlo` 같은 family 이름입니다. 타이포그래픽 family를 우선하므로, 한 family의 모든 굵기가 같은 이름을 씁니다.' },
	{ name: 'style', type: 'string', desc: '`Bold Italic`처럼 family 안에서의 스타일입니다. 폰트에 스타일 이름이 없으면 `Regular`입니다.' },
	{ name: 'fullName', type: 'string', desc: '`Menlo Bold` 같은 전체 이름입니다. 폰트에 전체 이름이 없으면 family와 style을 공백으로 이은 값입니다.' },
	{ name: 'postScriptName', type: 'string | null', desc: '`Menlo-Bold` 같은 PostScript 이름입니다.' },
	{ name: 'version', type: 'string | null', desc: '`Version 2.137`처럼 폰트에 적힌 그대로의 버전입니다.' },
	{ name: 'manufacturer', type: 'string | null', desc: '폰트 제작사입니다.' },
	{ name: 'designer', type: 'string | null', desc: '디자이너입니다.' },
	{ name: 'weight', type: 'number', desc: '`1`부터 `1000`까지의 굵기이고, `400`이 보통, `700`이 굵게입니다. 굵기 값이 없는 오래된 폰트는 굵게로 표시돼 있으면 `700`, 아니면 `400`입니다.' },
	{ name: 'width', type: 'number', desc: '`1`(가장 좁음)부터 `9`(가장 넓음)까지의 너비이고, `5`가 보통입니다.' },
	{ name: 'italic', type: 'boolean', desc: 'italic 또는 oblique인지 여부입니다.' },
	{ name: 'monospace', type: 'boolean', desc: '모든 문자를 같은 폭으로 그리는지 여부입니다. 아래 설명을 참고하세요.' },
	{ name: 'variable', type: 'boolean', desc: '한 face에 여러 스타일을 담은 가변 폰트인지 여부입니다.' },
	{ name: 'color', type: 'boolean', desc: '이모지 폰트처럼 컬러 글리프를 담고 있는지 여부입니다.' },
	{ name: 'path', type: 'string', desc: '링크를 따라간 파일의 절대 경로입니다.' },
	{ name: 'index', type: 'number', desc: '파일 안에서 face의 위치입니다. 폰트 컬렉션(`.ttc`, `.otc`)에는 face가 여러 개 있고, 단일 폰트는 `0`입니다.' }
]" />

### Monospace

폰트가 스스로 monospace라고 밝혔거나, `U+0020`부터 `U+007E`까지의 문자(공백, 숫자, 라틴 문자, ASCII 문장 부호)가 모두 같은 폭이면 `monospace`는 `true`입니다. 두 번째 검사로 macOS의 Monaco, Courier처럼 이 표시를 빠뜨린 폰트도 찾아냅니다. 이 문자 가운데 하나라도 글리프가 없으면 두 번째 검사를 통과하지 못하므로, 기호 폰트나 이모지 폰트는 monospace로 나오지 않습니다.

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

macOS에서 Menlo를 읽은 항목은 다음과 같습니다.

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
