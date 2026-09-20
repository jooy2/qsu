import { createSocket } from 'node:dgram';

// Reserved for documentation by RFC 5737, so it is nobody's real address. Nothing
// is sent to it: connecting a UDP socket only asks the kernel which interface
// would carry traffic to it, and the answer is the address this machine is
// reachable at.
const ROUTE_PROBE_ADDRESS = '192.0.2.1';
const ROUTE_PROBE_PORT = 53;

const LOOPBACK = '127.0.0.1';

export function getLocalIp(): Promise<string> {
	return new Promise((resolve) => {
		const probe = createSocket('udp4');
		let settled = false;

		const finish = (address: string) => {
			if (settled) {
				return;
			}

			settled = true;

			try {
				probe.close();
			} catch {
				// Already closed by the error that brought us here.
			}

			resolve(address);
		};

		// No route to anywhere, which is what a machine with no network looks like.
		probe.on('error', () => finish(LOOPBACK));
		probe.connect(ROUTE_PROBE_PORT, ROUTE_PROBE_ADDRESS, () =>
			finish(probe.address().address || LOOPBACK)
		);
	});
}
