# 설치하기

**qsu**는 언어마다 하나씩 배포됩니다. [npm](https://npmjs.com/package/qsu), [pub.dev](https://pub.dev/packages/qsu), [PyPI](https://pypi.org/project/qsu)에서 받을 수 있습니다. 사이드바에서 언어를 고르면 이 문서가 그 언어를 따릅니다.

## Requirements

::: lang js

**qsu**는 `Node.js 18.x` 이상을 요구합니다. 안전하고 높은 호환성을 위해 가능한 Node.js 버전은 최신 LTS 버전을 사용하는 것을 권장합니다.

**qsu**는 **ESM 전용**입니다. 모듈을 로드하려면 `require` 대신 `import`를 사용해야 합니다. CommonJS에 사용할 수 있는 해결 방법이 있지만 최근 JavaScript 트렌드에 따라 ESM을 사용하는 것이 좋습니다.

또한 일부 함수는 Node.js에서 지원하는 API를 사용합니다. (예: `node:crypto`, `node:path`, `node:fs`) 이러한 함수는 클라이언트 사이드에서 올바르게 동작하지 않거나 모듈 참조 문제가 발생할 수 있습니다.

:::

::: lang dart

**qsu**를 설치하려면 `Dart 3.5` 이상이 필요합니다.

Flutter를 사용 중인 경우 Dart 3.5를 포함하는 Flutter 버전 `3.24` 이상을 사용 중이어야 합니다. 이 경우 Dart 버전은 Flutter에서 결정하므로 신경쓰지 않아도 됩니다.

안전하고 높은 호환성을 위해 가능한 Dart와 Flutter 버전을 최신 버전으로 유지하는 것을 권장합니다.

:::

::: lang python

**qsu**를 설치하려면 `Python 3.8` 이상이 필요합니다. 안전하고 높은 호환성을 위해 가능한 최신 버전의 Python을 사용하는 것을 권장합니다.

:::

## Install

:::: lang js

::: code-group

```bash [npm]
$ npm install qsu
```

```bash [pnpm]
$ pnpm install qsu
```

```bash [yarn]
$ yarn add qsu
```

:::

::::

::: lang dart

Dart 프로젝트라면 다음 명령을 실행합니다:

```bash
$ dart pub add qsu
```

Flutter 프로젝트라면 다음 명령을 실행합니다:

```bash
$ flutter pub add qsu
```

:::

:::: lang python

::: code-group

```bash [pip]
$ pip install qsu
```

```bash [uv]
$ uv add qsu
```

```bash [poetry]
$ poetry add qsu
```

:::

**qsu**는 PyPI에 배포되어 있으므로 [uv](https://docs.astral.sh/uv), [Poetry](https://python-poetry.org), [PDM](https://pdm-project.org)과 같은 최신 패키지 관리자에서도 별도의 설정 없이 기본 인덱스를 통해 설치할 수 있습니다.

프로젝트 외부에서 `uv`를 사용하는 경우(예: 일반 가상 환경) 다음과 같이 pip 호환 명령을 사용하세요:

```bash
$ uv pip install qsu
```

::::

## How to use

::: lang js

아래는 `qsu`의 `today`와 `strCount` 유틸리티 함수를 사용한 예시입니다. 간단히 `qsu` 패키지를 import하여 사용할 수 있습니다.

```javascript
import { today, strCount } from 'qsu';

function main() {
	console.log(today()); // '20xx-xx-xx'
	console.log(strCount('123412341234', '1')); // 3
}
```

함수 이름 대신 언더스코어(`_`) 기호와 같이 구분자를 사용하여 함수를 불러올 수 있습니다.

이렇게 하면 어떤 함수가 `qsu`에서 사용 중인 유틸리티 함수인지 구분하기에는 좋지만, 권장되는 사용 방법은 아닙니다. `_.today()`처럼 프로퍼티로만 접근하는 동안에는 번들러가 사용하지 않는 함수를 제거할 수 있지만, `_[name]()`과 같이 이름을 동적으로 조회하거나 `_`를 다른 곳으로 넘기는 순간 라이브러리 전체가 남게 됩니다. 따라서 프로젝트의 규모에 따라 적절한 방법을 선택해야 합니다.

```javascript
import * as _ from 'qsu';

function main() {
	console.log(_.today()); // '20xx-xx-xx'
	console.log(_.strCount('123412341234', '1')); // 3
}
```

파일, 암호화와 관련한 특정 유틸리티 함수는 **Node.js** 모듈을 필요로 하기 때문에 브라우저 환경에서는 사용할 수 없습니다. 때문에 해당 함수들을 사용하려면 Node.js 런타임 환경에서 (주로 서버에 해당됨) 다음과 같이 import하여 사용할 수 있습니다.

```javascript
import { createFile, md5Hash } from 'qsu/node';

async function main() {
	console.log(md5Hash('abc'));

	await createFile('/home/user/Hello.txt');
}

main();
```

`qsu/node`를 사용해야 하는 함수는 레퍼런스 항목의 각 문서 상단에 다음과 같이 기재되어 있습니다:

<NodeRequired ko />

:::

::: lang dart

사용하려는 파일의 상단에 `package:qsu/qsu.dart` 파일을 import하여 사용합니다.

```dart
import 'package:qsu/qsu.dart';
```

:::

::: lang python

필요한 함수를 `qsu` 패키지에서 직접 가져와 사용하세요. 함수 이름, 파라미터, 동작은 JavaScript 구현과 동일하므로 언어가 달라도 동일한 호출 방식을 사용할 수 있습니다.

```python
from qsu import capitalizeFirst, strCount

def main():
    print(capitalizeFirst('abcd'))  # 'Abcd'
    print(strCount('123412341234', '1'))  # 3
```

:::

::: lang js

## 카테고리 단위로 불러오기

패키지는 부수 효과가 없는 것으로 표시되어 있으므로, 번들러는 `qsu`에서 import한 함수만 남기고 나머지는 모두 제거합니다.

번들러를 사용하지 않는 환경(스크립트, 서버리스 함수, 테스트 등)이라면 패키지 전체 대신 카테고리 하나만 import할 수 있습니다. 이 경우 해당 카테고리의 모듈만 로드됩니다.

```javascript
import { arrUnique } from 'qsu/array';
import { getSlug } from 'qsu/web';
import { md5Hash } from 'qsu/node/crypto';
```

각 카테고리는 고유한 하위 경로를 가집니다: `qsu/array`, `qsu/date`, `qsu/format`, `qsu/math`, `qsu/misc`, `qsu/object`, `qsu/string`, `qsu/verify`, `qsu/web`, 그리고 Node.js 런타임에서는 `qsu/node/crypto`, `qsu/node/file`, `qsu/node/misc`, `qsu/node/net`, `qsu/node/os`.

:::

지원하는 모든 함수에 대해 자세히 알아보려면 [레퍼런스](/ko/reference/index.md) 문서를 참고하세요.
