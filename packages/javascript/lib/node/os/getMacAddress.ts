import { networkInterfaces } from 'node:os';

const EMPTY_MAC = '00:00:00:00:00:00';

export function getMacAddress(): string {
	for (const addresses of Object.values(networkInterfaces())) {
		for (const address of addresses || []) {
			// The loopback interface has no hardware behind it, and an interface that
			// is configured but not attached reports an address of all zeroes.
			if (!address.internal && address.mac && address.mac !== EMPTY_MAC) {
				return address.mac.toLowerCase();
			}
		}
	}

	return EMPTY_MAC;
}
