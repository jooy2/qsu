export function isEqual(leftOperand: any, ...rightOperand: Array<any>): boolean {
	// Only an array means "the operands were passed as a list". Any other object is a
	// value to compare — treating it as a list made every object comparison return `true`.
	const rightOperands =
		rightOperand.length > 0 && Array.isArray(rightOperand[0]) ? rightOperand[0] : rightOperand;
	const rightOperandLength: number = rightOperands.length;

	for (let i = 0; i < rightOperandLength; i += 1) {
		// eslint-disable-next-line eqeqeq
		if (rightOperands[i] != leftOperand) {
			return false;
		}
	}

	return true;
}
