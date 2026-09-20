import { platform } from 'node:os';
import type { PlatformName } from '../../_types/global.js';

// What each runtime calls the systems qsu knows. A name outside this table is
// reported as `unknown` rather than guessed at from the one next to it. Android
// is its own answer rather than `linux`, because the Dart package runs there and
// reports it that way, and what a program may do differs between the two.
const PLATFORM_NAMES: Record<string, PlatformName> = {
	android: 'android',
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
