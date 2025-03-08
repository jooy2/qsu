export type PositiveNumber<N extends number> = number extends N
	? N
	: `${N}` extends `-${string}`
		? never
		: N;

export type NumberValueObject = { [key: string]: number };

export type AnyValueObject = { [key: string]: any };

export type DurationOptions = {
	useShortString?: boolean;
	useSpace?: boolean;
	withZeroValue?: boolean;
	separator?: string;
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
