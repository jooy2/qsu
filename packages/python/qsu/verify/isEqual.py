def _loose_eq(a, b) -> bool:
	if type(a) is bool or type(b) is bool:
		return a is b
	if a == b:
		return True
	# Mimic JavaScript `==`: coerce string/number operands to numbers.
	aIsNum = isinstance(a, (int, float))
	bIsNum = isinstance(b, (int, float))
	if aIsNum and isinstance(b, str):
		try:
			return float(a) == float(b)
		except ValueError:
			return False
	if bIsNum and isinstance(a, str):
		try:
			return float(b) == float(a)
		except ValueError:
			return False
	return False


def isEqual(leftOperand, *rightOperand) -> bool:
	if len(rightOperand) > 0 and isinstance(rightOperand[0], (list, tuple, dict)):
		rightOperands = rightOperand[0]
	else:
		rightOperands = rightOperand

	for item in rightOperands:
		if not _loose_eq(item, leftOperand):
			return False

	return True
