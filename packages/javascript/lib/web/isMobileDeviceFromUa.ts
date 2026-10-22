import { deviceType } from './_deviceType.js';

export function isMobileDeviceFromUa(userAgent: string): boolean {
	return deviceType(userAgent) === 'mobile';
}
