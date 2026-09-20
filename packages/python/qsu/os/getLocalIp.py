import socket

# Reserved for documentation by RFC 5737, so it is nobody's real address. Nothing
# is sent to it: connecting a UDP socket only asks the kernel which interface
# would carry traffic to it, and the answer is the address this machine is
# reachable at.
_ROUTE_PROBE_ADDRESS = '192.0.2.1'
_ROUTE_PROBE_PORT = 53

_LOOPBACK = '127.0.0.1'


def getLocalIp() -> str:
	probe = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

	try:
		probe.connect((_ROUTE_PROBE_ADDRESS, _ROUTE_PROBE_PORT))

		return probe.getsockname()[0] or _LOOPBACK
	except OSError:
		# No route to anywhere, which is what a machine with no network looks like.
		return _LOOPBACK
	finally:
		probe.close()
