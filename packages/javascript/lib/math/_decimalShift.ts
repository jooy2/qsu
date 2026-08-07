/**
 * (Private, not exported from the package) Multiplies a number by a power of ten by moving
 * the exponent of its shortest string representation, instead of multiplying by `10 ** n`.
 *
 * `1.005 * 100` is `100.49999999999999`, so the naive form answers `1` for `round(1.005, 2)`
 * and `1.1 * 10` is `11.000000000000002`, so `ceil(1.1, 1)` answers `1.2`. Parsing
 * `'1.005e2'` yields exactly `100.5` instead, because the shortest representation is the
 * decimal the caller wrote and the parser rounds it to the nearest double exactly once.
 */
export function decimalShift(value: number, exponent: number): number {
	// A large or tiny number already stringifies with an exponent (`1e+21`), which has to be
	// folded into the new one rather than appended to it.
	const [base, currentExponent] = String(value).split('e');

	return Number(`${base}e${(currentExponent ? Number(currentExponent) : 0) + exponent}`);
}
