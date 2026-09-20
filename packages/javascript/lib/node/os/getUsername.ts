import { userInfo } from 'node:os';
import { env } from 'node:process';

export function getUsername(): string {
	try {
		return userInfo().username || 'Unknown';
	} catch {
		// The account has no entry in the password database, which happens in a
		// container running under an id that was never given a name.
		return env.USER || env.USERNAME || env.LOGNAME || 'Unknown';
	}
}
