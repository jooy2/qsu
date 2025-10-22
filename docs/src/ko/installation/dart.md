---
title: Dart
order: 2
---

# Dart에서 설치 <Lang dart />

Dart 언어로 **qsu**를 설치하기 위해 몇가지 간단한 절차가 필요합니다.

**qsu**를 설치하려면 `Dart 3.x` 이상이 필요합니다.

Flutter를 사용 중인 경우 Flutter 버전 `3.10.x` 이상을 사용 중이어야 합니다. 이 경우 Dart 버전은 Flutter에서 결정하므로 신경쓰지 않아도 됩니다.

안전하고 높은 호환성을 위해 가능한 Dart와 Flutter 버전을 최신 버전으로 유지하는 것을 권장합니다.

Dart 환경을 구성한 후 다음 명령을 실행하여 라이브러리를 설치하세요:

### Dart-only

```bash
$ dart pub add qsu
```

### Flutter

```bash
$ flutter pub add qsu
```

## 사용 방법

사용하려는 파일의 상단에 `package:qsu/qsu.dart` 파일을 import하여 사용합니다.

```dart
import 'package:qsu/qsu.dart';
```

지원하는 함수에 대해 자세히 알아보려면 [Reference](/ko/reference/index.md) 설명서를 참조하세요.
