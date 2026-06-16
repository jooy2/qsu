def _strict_eq(a, b) -> bool:
	if type(a) is bool or type(b) is bool:
		return a is b
	if isinstance(a, (int, float)) and isinstance(b, (int, float)):
		return a == b
	if type(a) is not type(b):
		return False
	return a == b


def isEqualStrict(leftOperand, *rightOperand) -> bool:
	if len(rightOperand) > 0 and isinstance(rightOperand[0], (list, tuple, dict)):
		rightOperands = rightOperand[0]
	else:
		rightOperands = rightOperand

	for item in rightOperands:
		if not _strict_eq(item, leftOperand):
			return False

	return True
