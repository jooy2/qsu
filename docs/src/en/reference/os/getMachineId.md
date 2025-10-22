# getMachineId <Lang js />

<NodeRequired en />

Gets the unique UUID of the current device. Throws an error if the value is not retrieved. Returns a `Promise` object, so use `await` or `.then()` to wait for the operation to complete and get the correct value.

The UUID may change when the system is reinstalled or as the virtual machine's environment changes. On some systems, this value can also be modified by the system administrator (but this is rarely utilized as the system may become unstable after modification).

This method returns the same value for every user on the system.

## Parameters

No required parameters

## Returns

> string

## Examples

```javascript
console.log(await getMachineId()); // Returns 'a642d9e1-6063-4da7-8ea8-2298f989d01d'
```
