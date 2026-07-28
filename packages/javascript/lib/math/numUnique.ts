// Last value handed out, so repeated calls can never collide.
let lastId = 0;

export function numUnique(): number {
	// Milliseconds (13 digits) * 1000 leaves room for a per-millisecond sequence while
	// staying inside Number.MAX_SAFE_INTEGER. The previous 18-digit value exceeded it, so
	// digits were rounded away and different draws collapsed onto the same number.
	const id = new Date().valueOf() * 1000;

	// Always move forward: within the same millisecond, and even if the system clock
	// steps backwards.
	lastId = id > lastId ? id : lastId + 1;

	return lastId;
}
