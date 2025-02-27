export function between(range: [number, number], number: number, inclusive = false): boolean {
	const minM = Math.min.apply(Math, [range[0], range[1]]);
	const maxM = Math.max.apply(Math, [range[0], range[1]]);

	return inclusive ? number >= minM && number <= maxM : number > minM && number < maxM;
}
