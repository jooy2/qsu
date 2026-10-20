from ._deviceType import _deviceType


def isTabletDeviceFromUA(userAgent: str) -> bool:
	return _deviceType(userAgent) == 'tablet'
