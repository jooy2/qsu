import { platform, userInfo } from 'node:os';
import { env } from 'node:process';

export function getShell(): string {
	if (platform() === 'win32') {
		return env.ComSpec || 'cmd.exe';
	}

	try {
		// The shell recorded for the account, which is the one a login starts. It is
		// not necessarily the shell the caller is typing into.
		return userInfo().shell || env.SHELL || '/bin/sh';
	} catch {
		return env.SHELL || '/bin/sh';
	}
}
