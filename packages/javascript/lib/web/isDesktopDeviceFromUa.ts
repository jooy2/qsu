import { deviceType } from './_deviceType.js';

export function isDesktopDeviceFromUa(userAgent: string): boolean {
	return deviceType(userAgent) === 'desktop';
}
