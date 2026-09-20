import sys


def getEndianness() -> str:
	# Written the way the JavaScript package writes it, so the packages agree.
	return 'BE' if sys.byteorder == 'big' else 'LE'
