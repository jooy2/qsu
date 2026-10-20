import { deviceType } from './_deviceType.js';

export function isMobileDeviceFromUA(userAgent: string): boolean {
	return deviceType(userAgent) === 'mobile';
}
