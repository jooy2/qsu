from ._deviceType import _deviceType


def isMobileDeviceFromUA(userAgent: str) -> bool:
	return _deviceType(userAgent) == 'mobile'
