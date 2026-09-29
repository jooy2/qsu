def _strict_eq(a, b) -> bool:
	if type(a) is bool or type(b) is bool:
		return a is b
	if isinstance(a, (int, float)) and isinstance(b, (int, float)):
		return a == b
	if type(a) is not type(b):
		return False
	return a == b


def isEqualStrict(leftOperand, *rightOperand) -> bool:
	# Only a list/tuple means "the operands were passed as a sequence", as in `isEqual`. A
	# dict is a value to compare, and iterating it would have read its keys as the operands.
	if len(rightOperand) > 0 and isinstance(rightOperand[0], (list, tuple)):
		rightOperands = rightOperand[0]
	else:
		rightOperands = rightOperand

	for item in rightOperands:
		if not _strict_eq(item, leftOperand):
			return False

	return True
