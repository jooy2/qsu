export type PositiveNumber<N extends number> = number extends N
	? N
	: `${N}` extends `-${string}`
		? never
		: N;

export type NumberValueObject = { [key: string]: number };

export type AnyValueObject = { [key: string]: any };

export type DurationUnitName =
	'Year' | 'Month' | 'Day' | 'Hour' | 'Minute' | 'Second' | 'Millisecond';

export type DurationOptions = {
	useShortString?: boolean;
	useSpace?: boolean;
	withZeroValue?: boolean;
	separator?: string;
	withMilliSeconds?: boolean;
	maxUnitCount?: number;
	unit?: DurationUnitName;
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
	created: number;
	modified: number;
}

export interface LicenseOption {
	author: string;
	email?: string;
	yearStart: string | number;
	yearEnd?: string;
	htmlBr?: boolean;
	type: 'mit' | 'apache20' | 'bsd3';
}

export interface HTTPRequestOption {
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

export interface GetUptimeOption {
	format?: boolean;
	floor?: boolean;
}

export interface ParsedAddress {
	error: boolean;
	protocol?: string;
	host?: string;
	port?: number;
	user?: string;
	pass?: string;
}

export interface SlugOptions {
	separator?: string;
	includeNumbers?: boolean;
	includeSpecial?: boolean;
	uppercase?: boolean;
	includeNonLatin?: boolean;
	baseUrl?: string;
}
