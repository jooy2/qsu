---
title: Python
order: 3
---

# Python에서 설치 <Lang python />

Python 언어로 **qsu**를 설치하기 위해 몇가지 간단한 절차가 필요합니다.

**qsu**를 설치하려면 `Python 3.8` 이상이 필요합니다. 안전하고 높은 호환성을 위해 가능한 최신 버전의 Python을 사용하는 것을 권장합니다.

Python 환경을 구성한 후 다음 명령을 실행하여 라이브러리를 설치하세요:

```bash
$ pip install qsu
```

## 사용 방법

필요한 함수를 `qsu` 패키지에서 직접 가져와 사용하세요. 함수 이름, 파라미터, 동작은 JavaScript 구현과 동일하므로 언어가 달라도 동일한 호출 방식을 사용할 수 있습니다.

```python
from qsu import capitalizeFirst, strCount

def main():
    print(capitalizeFirst('abcd'))  # 'Abcd'
    print(strCount('123412341234', '1'))  # 3
```

지원되는 함수에 대한 자세한 내용은 [레퍼런스](/ko/reference/index.md) 문서를 참고하세요.
