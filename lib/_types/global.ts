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
