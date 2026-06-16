import secrets
import time


def objectId() -> str:
	timestamp = format(int(time.time()), 'x')
	random_hex = ''.join(format(secrets.randbelow(16), 'x') for _ in range(16))

	return timestamp + random_hex
