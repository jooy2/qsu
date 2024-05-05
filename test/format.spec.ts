import assert from 'assert';
import { numberFormat, fileName, fileExt, fileSize, duration, safeJSONParse } from '../dist';

describe('Format', () => {
	it('numberFormat', (done) => {
		assert.strictEqual(numberFormat(1234), '1,234');
		assert.strictEqual(numberFormat(12345678), '12,345,678');
		// @ts-ignore
		assert.strictEqual(numberFormat(null), '0');
		assert.strictEqual(numberFormat('123123'), '123,123');
		done();
	});

	it('fileName', (done) => {
		assert.strictEqual(fileName('C:\\Users\\test\\Desktop\\text.txt'), 'text');
		assert.strictEqual(fileName('/home/user/Desktop/example.txt'), 'example');
		assert.strictEqual(fileName('C:\\example.txt', true), 'example.txt');
		done();
	});

	it('fileExt', (done) => {
		assert.strictEqual(fileExt('C:\\Users\\test\\Desktop\\text.txt'), 'txt');
		assert.strictEqual(fileExt('hello.html'), 'html');
		assert.strictEqual(fileExt('this.is.file.PNG'), 'png');
		assert.strictEqual(fileExt('no-ext'), 'Unknown');
		done();
	});

	it('fileSize', (done) => {
		assert.strictEqual(fileSize(1), '1 Bytes');
		assert.strictEqual(fileSize(1000000), '976.56 KB');
		assert.strictEqual(fileSize(2000, 3), '1.953 KB');
		assert.strictEqual(fileSize(250000000), '238.42 MB');
		done();
	});

	it('duration', (done) => {
		assert.strictEqual(duration(0), '');
		assert.strictEqual(duration(604800000), '7 Days');
		assert.strictEqual(
			duration(604800000, {
				withZeroValue: true
			}),
			'7 Days 0 Hour 0 Minute 0 Second 0 Millisecond'
		);
		assert.strictEqual(
			duration(604800000, {
				useSpace: false
			}),
			'7Days'
		);
		assert.strictEqual(
			duration(604800000, {
				useShortString: true
			}),
			'7 D'
		);
		assert.strictEqual(
			duration(604800001, {
				separator: '-'
			}),
			'7 Days-1 Millisecond'
		);
		assert.strictEqual(
			duration(1234567890, {
				useSpace: true,
				useShortString: true
			}),
			'14 D 6 H 56 M 7 S 890 ms'
		);
		assert.strictEqual(
			duration(1234567890),
			'14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
		);
		done();
	});

	it('safeJSONParse', (done) => {
		assert.deepStrictEqual(safeJSONParse({}), {});
		assert.deepStrictEqual(safeJSONParse('{}'), {});
		assert.deepStrictEqual(safeJSONParse(''), {});
		assert.deepStrictEqual(safeJSONParse(null), {});
		assert.deepStrictEqual(safeJSONParse('{"a":1,"b":2}'), { a: 1, b: 2 });
		assert.deepStrictEqual(safeJSONParse('{"a":{"aa":1},"b":null}'), { a: { aa: 1 }, b: null });

		done();
	});
});
