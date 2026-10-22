from ._deviceType import _deviceType


def isTabletDeviceFromUa(userAgent: str) -> bool:
	return _deviceType(userAgent) == 'tablet'
