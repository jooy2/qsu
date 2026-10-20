import { deviceType } from './_deviceType.js';

export function isDesktopDeviceFromUA(userAgent: string): boolean {
	return deviceType(userAgent) === 'desktop';
}
