from ._deviceType import _deviceType


def isDesktopDeviceFromUa(userAgent: str) -> bool:
	return _deviceType(userAgent) == 'desktop'
