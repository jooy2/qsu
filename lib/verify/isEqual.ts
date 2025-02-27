export function isEqual(leftOperand: any, ...rightOperand: Array<any>): boolean {
	const rightOperands =
		rightOperand.length > 0 && typeof rightOperand[0] === 'object' ? rightOperand[0] : rightOperand;
	const rightOperandLength: number = rightOperands.length;

	for (let i = 0; i < rightOperandLength; i += 1) {
		// eslint-disable-next-line eqeqeq
		if (rightOperands[i] != leftOperand) {
			return false;
		}
	}

	return true;
}
