from ._deviceType import _deviceType


def isDesktopDeviceFromUA(userAgent: str) -> bool:
	return _deviceType(userAgent) == 'desktop'
