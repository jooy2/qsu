import { platform } from 'node:os';
import type { PlatformName } from '../../_types/global.js';

// What each runtime calls the systems qsu knows. A name outside this table is
// reported as `unknown` rather than guessed at from the one next to it.
const PLATFORM_NAMES: Record<string, PlatformName> = {
	android: 'linux',
	cygwin: 'windows',
	darwin: 'macos',
	freebsd: 'freebsd',
	linux: 'linux',
	msys: 'windows',
	win32: 'windows'
};

export function getPlatform(): PlatformName {
	return PLATFORM_NAMES[platform()] || 'unknown';
}
