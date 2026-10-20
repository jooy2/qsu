import { deviceType } from './_deviceType.js';

export function isTabletDeviceFromUA(userAgent: string): boolean {
	return deviceType(userAgent) === 'tablet';
}
