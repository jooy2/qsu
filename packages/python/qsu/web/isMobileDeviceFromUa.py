from ._deviceType import _deviceType


def isMobileDeviceFromUa(userAgent: str) -> bool:
	return _deviceType(userAgent) == 'mobile'
