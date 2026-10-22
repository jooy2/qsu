export type NonNegativeNumber<N extends number> = number extends N
	? N
	: `${N}` extends `-${string}`
		? never
		: N;

export type NumberValueObject = { [key: string]: number };

export type StringValueObject = { [key: string]: string };

export type AnyValueObject = { [key: string]: any };

export type DurationUnitName =
	'Year' | 'Month' | 'Day' | 'Hour' | 'Minute' | 'Second' | 'Millisecond';

// The options that decide which units a duration is broken into, shared by `duration`
// and `durationParts`. The rest of `DurationOptions` only decides how the pieces are
// written, which `durationParts` leaves to the caller.
export type DurationPartsOptions = {
	withZeroValue?: boolean;
	withMilliseconds?: boolean;
	maxUnitCount?: number;
	unit?: DurationUnitName;
};

export type DurationOptions = DurationPartsOptions & {
	useShortString?: boolean;
	useSpace?: boolean;
	separator?: string;
};

export type DurationPart = {
	value: number;
	unit: DurationUnitName;
};

export type FileSizeStandard = 'jedec' | 'iec' | 'si';

export type FileSizeUnitDisplay = 'short' | 'long';

export type FileSizeOptions = {
	standard?: FileSizeStandard;
	unitDisplay?: FileSizeUnitDisplay;
};

export type FileSizeParts = {
	value: number;
	unit: string;
	exponent: number;
};

// One language `detectLanguages` found, with the share of the letters written in it.
export type DetectedLanguage = {
	language: string;
	ratio: number;
};

export type RetryOptions = {
	attempts?: number;
	delay?: number;
	backoff?: number;
};

export type PadOptions = {
	position?: 'start' | 'end' | 'both';
	char?: string;
};

export type ThrottleOptions = {
	leading?: boolean;
	trailing?: boolean;
};

export interface FileInfo {
	success: boolean;
	isDirectory: boolean;
	size: number;
	sizeHumanized: string;
	name: string;
	dirname: string;
	path: string;
	ext: string | null;
	changed: number;
	modified: number;
}

export type LicenseType =
	| 'mit'
	| 'isc'
	| 'apache20'
	| 'bsd2'
	| 'bsd3'
	| 'mpl20'
	| 'gpl3'
	| 'lgpl3'
	| 'agpl3'
	| 'MIT'
	| 'ISC'
	| 'Apache-2.0'
	| 'BSD-2-Clause'
	| 'BSD-3-Clause'
	| 'MPL-2.0'
	| 'GPL-3.0-or-later'
	| 'LGPL-3.0-or-later'
	| 'AGPL-3.0-or-later';

export interface LicenseOption {
	author: string;
	email?: string;
	yearStart?: string | number;
	yearEnd?: string | number;
	htmlBr?: boolean;
	type: LicenseType;
}

export interface HttpRequestOptions {
	auth?: {
		apiKey?: string;
		bearer?: string;
	};
	get?: boolean;
	post?: boolean;
	put?: boolean;
	delete?: boolean;
	patch?: boolean;
	toStream?: boolean;
	timeout?: number;
	method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
	host?: string;
	queryParameters?: object;
	body?: AnyValueObject | string | undefined | null | FormData;
	bodyType?: 'text' | 'json' | 'form-data' | 'x-www-form-urlencoded';
	headers?: AnyValueObject | undefined | null;
	onError?: (error: any) => void;
}

/** What qsu calls the operating systems it knows, in `getPlatform`. */
export type PlatformName =
	'windows' | 'macos' | 'linux' | 'android' | 'ios' | 'freebsd' | 'unknown';

export interface UptimeOptions {
	format?: boolean;
	floor?: boolean;
}

/** One face of an installed font file, as `getFonts` reports it. */
export interface FontInfo {
	family: string;
	style: string;
	fullName: string;
	postScriptName: string | null;
	version: string | null;
	manufacturer: string | null;
	designer: string | null;
	weight: number;
	width: number;
	italic: boolean;
	monospace: boolean;
	variable: boolean;
	color: boolean;
	path: string;
	index: number;
}

export interface GetFontsOptions {
	directories?: string[];
}

export interface ParsedAddress {
	error: boolean;
	protocol?: string;
	host?: string;
	hostname?: string;
	port?: number;
	defaultPort?: number;
	username?: string;
	password?: string;
	path?: string;
	query?: string;
	params?: StringValueObject;
	hash?: string;
	isIp: boolean;
	isIpv6: boolean;
}

export interface ParseAddressOptions {
	decode?: boolean;
}

export interface SlugOptions {
	separator?: string;
	includeNumbers?: boolean;
	includeSpecial?: boolean;
	uppercase?: boolean;
	includeNonLatin?: boolean;
	baseUrl?: string;
}
