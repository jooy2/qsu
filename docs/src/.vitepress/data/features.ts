/**
 * The feature sheet on `discover-more/comparison`.
 *
 * One list of capabilities, three sets of columns. The rows are the same
 * question in every language — "can I slugify a string with this?" — and only
 * the answers change, so keeping them here rather than in the Markdown means a
 * row is written once and cannot say one thing in `en` and another in `ko`.
 *
 * Every verdict was read off the library's own documentation or source, not
 * off a memory of it. When one of these libraries changes, the cell changes.
 */

/** One column of the sheet. `qsu` is always the first. */
export interface ComparedLibrary {
	name: string;
	/** Omitted for qsu, which the reader is already on. */
	link?: string;
}

export const COMPARED_LIBRARIES: Record<string, ComparedLibrary[]> = {
	js: [
		{ name: 'qsu' },
		{ name: 'Lodash', link: 'https://lodash.com' },
		{ name: 'Underscore.js', link: 'https://underscorejs.org' }
	],
	dart: [
		{ name: 'qsu' },
		{ name: 'quiver', link: 'https://pub.dev/packages/quiver' },
		{ name: 'basic_utils', link: 'https://pub.dev/packages/basic_utils' }
	],
	python: [
		{ name: 'qsu' },
		{ name: 'pydash', link: 'https://pydash.readthedocs.io' },
		{ name: 'boltons', link: 'https://boltons.readthedocs.io' }
	]
};

/** `y` covers it, `p` covers a corner of it, `n` does not have it. */
export type Verdict = 'y' | 'p' | 'n';

export const VERDICTS: Record<Verdict, { mark: string; key: string }> = {
	y: { mark: '✓', key: 'supportYes' },
	p: { mark: '△', key: 'supportPartial' },
	n: { mark: '✕', key: 'supportNo' }
};

/** A heading row, or a feature row. Text is keyed by documentation locale. */
export interface FeatureRow {
	group?: Record<string, string>;
	name?: Record<string, string>;
	/**
	 * The code languages the row is asked of, space separated.
	 *
	 * A question only one ecosystem has — certificates in Dart, atomic writes in
	 * Python — is left out of the sheets that would answer it with three crosses.
	 * Omitted means every language.
	 */
	languages?: string;
	/** One verdict per column of `COMPARED_LIBRARIES`, space separated. */
	support?: Record<string, string>;
}

export const FEATURES: FeatureRow[] = [
	{ group: { en: 'Strings', ko: '문자열' } },
	{
		name: { en: 'camelCase and PascalCase conversion', ko: 'camelCase·PascalCase 변환' },
		support: { js: 'y p n', dart: 'y n p', python: 'y y p' }
	},
	{
		name: { en: 'snake_case and kebab-case conversion', ko: 'snake_case·kebab-case 변환' },
		support: { js: 'y y n', dart: 'y n p', python: 'y y p' }
	},
	{
		name: { en: 'CONSTANT_CASE conversion', ko: 'CONSTANT_CASE 변환' },
		support: { js: 'y n n', dart: 'y n y', python: 'y p n' }
	},
	{
		name: { en: 'Capitalize the first letter', ko: '첫 글자 대문자로' },
		support: { js: 'y y n', dart: 'y n y', python: 'y y n' }
	},
	{
		name: { en: 'Capitalize every word or sentence', ko: '단어·문장마다 첫 글자 대문자로' },
		support: { js: 'y p n', dart: 'y n p', python: 'y p n' }
	},
	{
		name: { en: 'Remove accents from Latin letters', ko: '라틴 문자의 발음 구별 기호 제거' },
		support: { js: 'y y n', dart: 'y n n', python: 'y y p' }
	},
	{
		name: { en: 'Pad a string to a length', ko: '지정한 길이까지 채우기' },
		support: { js: 'y y n', dart: 'y p n', python: 'y y n' }
	},
	{
		name: { en: 'Truncate with an ellipsis', ko: '자르고 생략 기호 붙이기' },
		support: { js: 'y y n', dart: 'y n y', python: 'y y y' }
	},
	{
		name: { en: 'Split a string into words', ko: '문자열을 단어로 나누기' },
		support: { js: 'y y n', dart: 'y n n', python: 'y y p' }
	},
	{
		name: { en: 'Trim and collapse inner whitespace', ko: '공백 제거와 내부 공백 축약' },
		support: { js: 'y p n', dart: 'y n n', python: 'y p n' }
	},
	{
		name: { en: 'Escape a regular expression', ko: '정규식 이스케이프' },
		support: { js: 'y y n', dart: 'y y n', python: 'y y n' }
	},
	{
		name: { en: 'Count occurrences of a substring', ko: '부분 문자열 개수 세기' },
		support: { js: 'y n n', dart: 'y n p', python: 'y y n' }
	},
	{
		name: { en: 'Generate a random string', ko: '무작위 문자열 생성' },
		support: { js: 'y n n', dart: 'y n y', python: 'y n n' }
	},
	{
		name: { en: 'Byte length of a string', ko: '문자열의 바이트 길이' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},

	{ group: { en: 'Arrays and lists', ko: '배열과 리스트' } },
	{
		name: { en: 'Remove duplicates', ko: '중복 제거' },
		support: { js: 'y y y', dart: 'y n n', python: 'y y y' }
	},
	{
		name: { en: 'Difference and intersection', ko: '차집합과 교집합' },
		support: { js: 'y y y', dart: 'y n y', python: 'y y n' }
	},
	{
		name: { en: 'Split into fixed-size chunks', ko: '고정 크기로 묶기' },
		support: { js: 'y y y', dart: 'y y y', python: 'y y y' }
	},
	{
		name: { en: 'Flatten a nested array', ko: '중첩 배열 펴기' },
		support: { js: 'y y y', dart: 'y n n', python: 'y y y' }
	},
	{
		name: { en: 'Shuffle', ko: '뒤섞기' },
		support: { js: 'y y y', dart: 'y n n', python: 'y y n' }
	},
	{
		name: { en: 'Pick a random element', ko: '무작위 요소 하나 고르기' },
		support: { js: 'y y y', dart: 'y n y', python: 'y y n' }
	},
	{
		name: { en: 'Count each distinct value', ko: '값별 개수 세기' },
		support: { js: 'y y y', dart: 'y n n', python: 'y y p' }
	},
	{
		name: { en: 'Sort by an object key', ko: '객체의 키를 기준으로 정렬' },
		support: { js: 'y y y', dart: 'y n n', python: 'y y p' }
	},
	{
		name: {
			en: 'Natural sort of strings that hold numbers',
			ko: '숫자가 섞인 문자열의 자연 정렬'
		},
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Build a numeric range', ko: '숫자 범위 배열 만들기' },
		support: { js: 'y y y', dart: 'y y n', python: 'y y p' }
	},
	{
		name: { en: 'Move an element to another index', ko: '요소를 다른 위치로 옮기기' },
		support: { js: 'y n n', dart: 'y n p', python: 'y n n' }
	},

	{ group: { en: 'Objects, maps and dicts', ko: '객체와 맵, dict' } },
	{
		name: { en: 'Deep clone', ko: '깊은 복사' },
		support: { js: 'y y p', dart: 'y n n', python: 'y y n' }
	},
	{
		name: { en: 'Deep merge', ko: '깊은 병합' },
		support: { js: 'y y p', dart: 'y n n', python: 'y y n' }
	},
	{
		name: { en: 'Read a nested value by path', ko: '경로로 중첩 값 읽기' },
		support: { js: 'y y y', dart: 'y n n', python: 'y y y' }
	},
	{
		name: { en: 'Pick keys, or pick by a test', ko: '키 또는 조건으로 골라내기' },
		support: { js: 'y y y', dart: 'y n n', python: 'y y p' }
	},
	{
		name: { en: 'Invert keys and values', ko: '키와 값 뒤집기' },
		support: { js: 'y y y', dart: 'y p n', python: 'y y p' }
	},
	{
		name: { en: 'Rename keys through a callback', ko: '콜백으로 키 이름 바꾸기' },
		support: { js: 'y y n', dart: 'y n n', python: 'y y n' }
	},
	{
		name: { en: 'Flatten into dotted keys', ko: '점으로 이은 키 하나로 펴기' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Build a query string', ko: '쿼리 문자열 만들기' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n p' }
	},
	{
		name: { en: 'Pretty-print for a log', ko: '로그용으로 보기 좋게 출력' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},

	{ group: { en: 'Numbers', ko: '숫자' } },
	{
		name: { en: 'Round, ceil and floor to decimal places', ko: '소수점 자릿수 반올림·올림·내림' },
		support: { js: 'y y n', dart: 'y n p', python: 'y y p' }
	},
	{
		name: { en: 'Clamp to a range', ko: '범위 안으로 가두기' },
		support: { js: 'y y n', dart: 'y n n', python: 'y y y' }
	},
	{
		name: { en: 'Sum and average', ko: '합계와 평균' },
		support: { js: 'y y n', dart: 'y n p', python: 'y y p' }
	},
	{
		name: { en: 'Random integer in a range', ko: '범위 안의 무작위 정수' },
		support: { js: 'y y y', dart: 'y n y', python: 'y y n' }
	},
	{
		name: { en: 'Range membership check', ko: '범위 포함 여부 검사' },
		support: { js: 'y y n', dart: 'y n n', python: 'y y n' }
	},
	{
		name: { en: 'Median, variance and other statistics', ko: '중앙값·분산 등의 통계' },
		languages: 'dart python',
		support: { dart: 'n n y', python: 'n y y' }
	},

	{ group: { en: 'Validation', ko: '검증' } },
	{
		name: { en: 'Empty check for any value', ko: '값의 종류를 가리지 않는 빈 값 검사' },
		support: { js: 'y y y', dart: 'y p p', python: 'y y n' }
	},
	{
		name: { en: 'Deep equality', ko: '깊은 동등성 비교' },
		support: { js: 'n y y', dart: 'n p n', python: 'y y n' }
	},
	{
		name: { en: 'Email validation', ko: '이메일 주소 검증' },
		support: { js: 'y n n', dart: 'y n y', python: 'y n n' }
	},
	{
		name: { en: 'URL or domain validation', ko: 'URL·도메인 검증' },
		support: { js: 'y n n', dart: 'y n p', python: 'y n p' }
	},
	{
		name: { en: 'Date validation', ko: '날짜 유효성 검사' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Banned word check', ko: '금칙어 검사' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},

	{ group: { en: 'Formatting', ko: '형식화' } },
	{
		name: { en: 'Human-readable file size', ko: '사람이 읽는 파일 용량' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n y' }
	},
	{
		name: { en: 'Human-readable duration', ko: '사람이 읽는 시간 길이' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n p' }
	},
	{
		name: { en: 'Thousands separator', ko: '천 단위 구분 기호' },
		support: { js: 'y n n', dart: 'y n n', python: 'y y n' }
	},
	{
		name: { en: 'Safe JSON parse with a fallback', ko: '실패해도 되는 JSON 파싱' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Safe integer parse with a fallback', ko: '실패해도 되는 정수 파싱' },
		support: { js: 'y p n', dart: 'y n n', python: 'y p n' }
	},

	{ group: { en: 'Dates', ko: '날짜' } },
	{
		name: { en: 'Today, and formatting as YYYY-MM-DD', ko: '오늘 날짜와 YYYY-MM-DD 형식화' },
		support: { js: 'y n n', dart: 'y p n', python: 'y n n' }
	},
	{
		name: { en: 'Difference between two dates in days', ko: '두 날짜의 일수 차이' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Every date in a range', ko: '범위 안의 모든 날짜' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n y' }
	},
	{
		name: { en: 'Calendar helpers such as leap years', ko: '윤년 같은 달력 계산' },
		languages: 'dart',
		support: { dart: 'n y p' }
	},
	{
		name: { en: 'An injectable clock for tests', ko: '테스트용으로 주입하는 시계' },
		languages: 'dart',
		support: { dart: 'n y n' }
	},

	{ group: { en: 'The web', ko: '웹' } },
	{
		name: { en: 'URL slug', ko: 'URL 슬러그' },
		support: { js: 'y n n', dart: 'y n n', python: 'y y y' }
	},
	{
		name: { en: 'HTML escape and unescape', ko: 'HTML 이스케이프와 복원' },
		support: { js: 'y y y', dart: 'y n n', python: 'y y p' }
	},
	{
		name: { en: 'Bot and mobile user-agent detection', ko: '봇·모바일 user agent 판별' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Match a URL path against rules', ko: 'URL 경로를 규칙과 맞추기' },
		support: { js: 'y n n', dart: 'y p n', python: 'y n n' }
	},
	{
		name: { en: 'Parse an address into its parts', ko: '주소를 부분으로 분해' },
		support: { js: 'y n n', dart: 'y n p', python: 'y n y' }
	},
	{
		name: { en: 'Join URL segments', ko: 'URL 조각 이어 붙이기' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},

	{ group: { en: 'Hashing and encryption', ko: '해시와 암호화' } },
	{
		name: { en: 'MD5 and SHA hashes', ko: 'MD5·SHA 해시' },
		support: { js: 'y n n', dart: 'y n y', python: 'y n n' }
	},
	{
		name: { en: 'Base64 encode and decode', ko: 'Base64 인코딩과 디코딩' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Symmetric encryption', ko: '대칭키 암호화' },
		support: { js: 'y n n', dart: 'y n p', python: 'y n n' }
	},
	{
		name: { en: 'ObjectId generation', ko: 'ObjectId 생성' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'X.509 and PKCS12 certificates', ko: 'X.509·PKCS12 인증서' },
		languages: 'dart',
		support: { dart: 'n n y' }
	},

	{ group: { en: 'Files', ko: '파일' } },
	{
		name: { en: 'Create and delete files and directories', ko: '파일과 디렉터리 생성·삭제' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n p' }
	},
	{
		name: { en: 'File size and metadata', ko: '파일 크기와 정보' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Path helpers: name, extension, parent', ko: '경로 헬퍼: 이름·확장자·상위 경로' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n p' }
	},
	{
		name: { en: 'First or last lines of a text file', ko: '텍스트 파일의 앞뒤 몇 줄 읽기' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Hash a file', ko: '파일 해시' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Atomic file write', ko: '원자적 파일 쓰기' },
		languages: 'python',
		support: { python: 'n n y' }
	},

	{ group: { en: 'The machine', ko: '시스템' } },
	{
		name: { en: 'CPU, memory and disk information', ko: 'CPU·메모리·디스크 정보' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Operating system, host and user', ko: '운영 체제·호스트·사용자 정보' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Run a shell command', ko: '셸 명령 실행' },
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	},

	{ group: { en: 'Functions and timing', ko: '함수와 타이밍' } },
	{
		name: { en: 'Debounce and throttle', ko: 'debounce와 throttle' },
		support: { js: 'y y y', dart: 'y n n', python: 'y y n' }
	},
	{
		name: { en: 'Retry with backoff', ko: '백오프를 둔 재시도' },
		support: { js: 'y n n', dart: 'y n n', python: 'y y p' }
	},
	{
		name: { en: 'Wait for a duration', ko: '일정 시간 대기' },
		support: { js: 'y p p', dart: 'y n n', python: 'y n n' }
	},
	{
		name: { en: 'Repeat a function n times', ko: '함수를 n번 반복' },
		support: { js: 'y y y', dart: 'y n n', python: 'y y n' }
	},
	{
		name: { en: 'Memoize', ko: '메모이제이션' },
		support: { js: 'n y y', dart: 'n p n', python: 'n y y' }
	},
	{
		name: { en: 'Currying and partial application', ko: '커링과 부분 적용' },
		support: { js: 'n y y', dart: 'n n n', python: 'n y p' }
	},
	{
		name: { en: 'Function composition', ko: '함수 합성' },
		support: { js: 'n y y', dart: 'n n n', python: 'n y n' }
	},
	{
		name: { en: 'Chained, fluent calls', ko: '체이닝 호출' },
		support: { js: 'n y y', dart: 'n n n', python: 'n y n' }
	},

	{ group: { en: 'Data structures', ko: '자료구조' } },
	{
		name: { en: 'Collection types the language lacks', ko: '언어에 없는 컬렉션 타입' },
		languages: 'dart python',
		support: { dart: 'n y n', python: 'n n y' }
	},
	{
		name: { en: 'Lazy iterators', ko: '지연 평가 이터레이터' },
		support: { js: 'n p n', dart: 'n y n', python: 'n n y' }
	},

	{ group: { en: 'The package', ko: '패키지' } },
	{
		name: { en: 'No runtime dependencies', ko: '런타임 의존성 없음' },
		support: { js: 'y y y', dart: 'n p n', python: 'n y y' }
	},
	{
		name: { en: 'Ships its own type definitions', ko: '타입 정의를 직접 배포' },
		languages: 'js python',
		support: { js: 'y n n', python: 'y y n' }
	},
	{
		name: { en: 'Import one category at a time', ko: '카테고리 단위로 불러오기' },
		support: { js: 'y p y', dart: 'n y n', python: 'y n y' }
	},
	{
		name: { en: 'Runs in the browser or on the web', ko: '브라우저와 웹에서 동작' },
		languages: 'js dart',
		support: { js: 'p y y', dart: 'p y y' }
	},
	{
		name: {
			en: 'The same API in JavaScript, Dart and Python',
			ko: 'JavaScript·Dart·Python에서 같은 API'
		},
		support: { js: 'y n n', dart: 'y n n', python: 'y n n' }
	}
];
