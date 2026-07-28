import time

# Last value handed out, so repeated calls can never collide.
_lastId = 0


def numUnique() -> int:
	"""Return a unique number based on the current timestamp.

	Milliseconds * 1000 leaves room for a per-millisecond sequence, so repeated calls
	within a process always return a new, strictly increasing value. Uniqueness is only
	guaranteed within one process, and the value is sequential and therefore predictable,
	so it must not be used for anything security related.
	"""
	global _lastId

	id = int(time.time() * 1000) * 1000

	# Always move forward: within the same millisecond, and even if the clock steps back.
	_lastId = id if id > _lastId else _lastId + 1

	return _lastId
