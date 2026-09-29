/**
 * (Private, not exported from the package) Reading and writing a key as the object's own data.
 *
 * `__proto__` is an accessor on `Object.prototype`, not a key. Assigning to it replaces the
 * object's prototype, and reading it returns the prototype, so a key of that name taken from
 * `JSON.parse`, a query string or a callback would otherwise vanish, or turn the result into
 * an object that inherits whatever value it carried. Keys such as `constructor` are inherited
 * in the same way and would read as present on an object that never had them.
 */

/** The value `obj` holds under `key` itself, or `undefined` when the key is only inherited. */
export function getOwn(obj: any, key: string): any {
	return Object.hasOwn(obj, key) ? obj[key] : undefined;
}

/** Stores `value` under `key` as an own property, whatever the key is called. */
export function setOwn(obj: any, key: string, value: any): void {
	if (key === '__proto__') {
		Object.defineProperty(obj, key, {
			value,
			writable: true,
			enumerable: true,
			configurable: true
		});

		return;
	}

	obj[key] = value;
}
