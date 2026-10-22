import { deviceType } from './_deviceType.js';

export function isTabletDeviceFromUa(userAgent: string): boolean {
	return deviceType(userAgent) === 'tablet';
}
