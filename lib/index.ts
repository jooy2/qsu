import { basename, extname, win32 } from 'path';
import { randomBytes, createCipheriv, createDecipheriv, createHash } from 'crypto';

declare type PositiveNumber<N extends number> = number extends N
	? N
	: `${N}` extends `-${string}`
		? never
		: N;

declare type NumberValueObject = { [key: string]: number };

declare type AnyValueObject = { [key: string]: any };

export default class Qsu {
	/*
	 * Misc
	 * */
	static sleep<N extends number>(delay: PositiveNumber<N>): Promise<void> {
		return new Promise<void>((resolve) => {
			setTimeout(resolve, delay);
		});
	}

	static funcTimes<N extends number>(times: PositiveNumber<N>, iteratee: any): Array<any> {
		const results = [];

		for (let i = 0; i < times; i += 1) {
			if (typeof iteratee === 'function') {
				results[i] = iteratee.call();
			} else {
				results[i] = iteratee;
			}
		}

		return results;
	}

	static debounce<N extends number>(
		func: (...args: any[]) => void,
		timeout: PositiveNumber<N>
	): (...args: any[]) => void {
		let timer: NodeJS.Timeout;

		return (...args: any[]): void => {
			clearTimeout(timer);

			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	}

	static objectId(): string {
		return (
			Math.floor(Date.now() / 1000).toString(16) +
			'x'.repeat(16).replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))
		);
	}

	/*
	 * Math
	 * */
	static numRandom(min: number, max: number): number {
		if (!min && !max) {
			return Math.random() > 0.5 ? 1 : 0;
		}

		const limit = !max ? min : max;
		const offset = !max || min >= max ? null : min;

		return Math.floor(Math.random() * (offset ? limit - offset + 1 : limit + 1)) + (offset || 0);
	}

	static sum(...args: any[]): number;

	static sum(...args: Array<number>): number;

	static sum(...args: Array<number> | number[]): number {
		const val = args.length > 0 && typeof args[0] === 'object' ? args[0] : args;
		let total = 0;

		for (let i = 0, iLen = val.length; i < iLen; i += 1) {
			if (typeof val[i] === 'number') {
				total += val[i];
			}
		}

		return total;
	}

	static mul(...args: any[]): number;

	static mul(...args: Array<number>): number;

	static mul(...args: Array<number> | number[]): number {
		const val = args.length > 0 && typeof args[0] === 'object' ? args[0] : args;
		let total = val[0];

		for (let i = 1, iLen = val.length; i < iLen; i += 1) {
			if (typeof val[i] === 'number') {
				total *= val[i];
			}
		}

		return total;
	}

	static sub(...args: any[]): number;

	static sub(...args: Array<number>): number;

	static sub(...args: Array<number> | number[]): number {
		const val = args.length > 0 && typeof args[0] === 'object' ? args[0] : args;
		let total = val[0];

		for (let i = 1, iLen = val.length; i < iLen; i += 1) {
			if (typeof val[i] === 'number') {
				total -= val[i];
			}
		}

		return total;
	}

	static div(...args: any[]): number;

	static div(...args: Array<number>): number;

	static div(...args: Array<number> | number[]): number {
		const val = args.length > 0 && typeof args[0] === 'object' ? args[0] : args;
		let total = val[0];

		for (let i = 1, iLen = val.length; i < iLen; i += 1) {
			if (typeof val[i] === 'number') {
				total /= val[i];
			}
		}

		return total;
	}

	/*
	 * Date
	 * */
	static dayDiff(date1: Date, date2?: Date): number {
		const date2c = date2 || new Date();

		return Math.ceil(Math.abs(date2c.getTime() - date1.getTime()) / (1000 * 3600 * 24));
	}

	static today(separator = '-', yearFirst = true): string {
		const date = new Date();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		const dateArr = [`${month < 10 ? '0' : ''}${month}`, `${day < 10 ? '0' : ''}${day}`];

		if (yearFirst) {
			dateArr.unshift(date.getFullYear().toString());
		} else {
			dateArr.push(date.getFullYear().toString());
		}

		return dateArr.join(separator);
	}

	static isValidDate(dateYYYYMMDD: string): boolean {
		if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(dateYYYYMMDD)) {
			throw new Error("The date format must be 'YYYY-MM-DD'");
		}

		const convertedDate: string[] = dateYYYYMMDD.split('-');

		return /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/.test(
			`${parseInt(convertedDate[2], 10)}-${parseInt(convertedDate[1], 10)}-${parseInt(
				convertedDate[0],
				10
			)}`
		);
	}

	static dateToYYYYMMDD(date: Date, separator = '-'): string {
		const month: number = date.getMonth() + 1;
		const day: number = date.getDate();

		return `${date.getFullYear()}${separator}${month < 10 ? `0${month}` : month}${separator}${
			day < 10 ? `0${day}` : day
		}`;
	}

	static createDateListFromRange(startDate: Date, endDate: Date): string[] {
		if (
			!Qsu.isValidDate(Qsu.dateToYYYYMMDD(startDate)) ||
			!Qsu.isValidDate(Qsu.dateToYYYYMMDD(endDate))
		) {
			throw new Error('Either the start date or end date is an invalid date.');
		}

		const dateDiff = Math.floor(
			(Date.parse(endDate.toString()) - Date.parse(startDate.toString())) / 86400000
		);

		if (dateDiff < 0) {
			throw new Error('The start date is more recent than the end date.');
		}

		const endDateStr: string = Qsu.dateToYYYYMMDD(endDate);
		const allDate: string[] = [];
		let currentYear: number = startDate.getFullYear();
		let currentMonth: number = startDate.getMonth() + 1;
		let currentDay: number = startDate.getDate();
		let currentDateStr = '';

		const createNewDateStr = (year: number, month: number, day: number): string =>
			`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

		while (endDateStr !== currentDateStr) {
			if (/[0-9]{4}-12-31/g.test(currentDateStr)) {
				currentYear += 1;
				currentMonth = 1;
				currentDay = 1;
			}

			const currentNewDateStr = createNewDateStr(currentYear, currentMonth, currentDay);

			if (Qsu.isValidDate(currentNewDateStr)) {
				currentDay += 1;
				allDate.push(currentNewDateStr);
				currentDateStr = currentNewDateStr;
			} else {
				currentMonth += 1;
				currentDay = 1;
				currentDateStr = createNewDateStr(currentYear, currentMonth, currentDay);
			}
		}

		return allDate;
	}

	/*
	 * Array
	 * */
	static arrShuffle(array: any[]): any[] {
		if (array.length === 1) {
			return array[0];
		}

		const newArray = array;

		for (let i = array.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [array[j], array[i]];
		}

		return newArray;
	}

	static arrWithDefault(defaultValue: any, length = 0): any[] {
		if (length < 1) {
			return [];
		}

		return Array(length).fill(defaultValue);
	}

	static arrUnique(array: any[]): any[] {
		if (Qsu.is2dArray(array)) {
			return Array.from(new Set(array.map((x) => JSON.stringify(x))), (x) => JSON.parse(x));
		}

		return [...new Set(array)];
	}

	static arrWithNumber(start: number, end: number): number[] {
		if (start > end) {
			throw new Error('`end` is greater than `start`.');
		}

		return Array.from({ length: end - start + 1 }, (_, i) => i + start);
	}

	static average(array: number[]): number {
		return array.reduce((p, c) => p + c, 0) / array.length;
	}

	static arrMove<N extends number>(
		array: any[],
		from: PositiveNumber<N>,
		to: PositiveNumber<N>
	): any[] {
		const arrayLength = array.length;

		if (arrayLength <= from || arrayLength <= to) {
			throw new Error('Invalid move params');
		}

		array.splice(to, 0, array.splice(from, 1)[0]);

		return array;
	}

	static arrTo1dArray(array: any[]): any[] {
		const convert1dArray = (arr: any[]): any[] => {
			const tempArr = [];
			const arrayLength = arr.length;

			for (let i = 0; i < arrayLength; i += 1) {
				if (typeof arr[i] !== 'object') {
					tempArr.push(arr[i]);
				} else if (Qsu.is2dArray(arr[i])) {
					tempArr.push(...convert1dArray(arr[i]));
				} else {
					tempArr.push(...arr[i]);
				}
			}

			return tempArr;
		};

		return convert1dArray(array);
	}

	static arrRepeat<N extends number>(array: any, count: PositiveNumber<N>): any[] {
		if (!array || count < 1 || typeof array !== 'object') {
			return [];
		}

		const isObject = Qsu.isObject(array);
		const result: any[] = [];

		for (let i = 0, iLen = count; i < iLen; i += 1) {
			if (isObject) {
				result.push(array);
			} else {
				result.push(...array);
			}
		}

		return result;
	}

	static arrCount(array: string[] | number[]): NumberValueObject {
		const result: NumberValueObject = {};

		for (let i = 0; i < array.length; i += 1) {
			const x = array[i];

			result[x] = (result[x] || 0) + 1;
		}

		return result;
	}

	static sortByObjectKey(
		array: any[],
		key: string,
		descending = false,
		numerically = false
	): any[] {
		if (numerically) {
			const collator = new Intl.Collator([], { numeric: true });
			const result = array.sort((a: any, b: any) => collator.compare(a[key], b[key]));

			return descending ? result.reverse() : result;
		}

		return array.sort((a: any, b: any) => {
			if (!descending) {
				if (a[key] < b[key]) return -1;
				if (a[key] > b[key]) return 1;

				return 0;
			}

			if (a[key] > b[key]) return -1;
			if (a[key] < b[key]) return 1;

			return 0;
		});
	}

	static sortNumeric(array: string[], descending = false): string[] {
		const collator = new Intl.Collator([], { numeric: true });
		const result = array.sort((a: any, b: any) => collator.compare(a, b));

		return descending ? result.reverse() : result;
	}

	static arrGroupByMaxCount(array: any[], maxLengthPerGroup = 1): any[] {
		const result = [];
		const arrayLength = array.length;
		let tempArray = [];

		for (let i = 0; i < arrayLength; i += 1) {
			if (tempArray.length === maxLengthPerGroup) {
				result.push(tempArray);
				tempArray = [];
			}

			tempArray.push(array[i]);
		}

		if (tempArray.length > 0) {
			result.push(tempArray);
		}

		return result;
	}

	/*
	 * Object
	 * */
	static objToQueryString(obj: AnyValueObject): string {
		return Object.keys(obj)
			.map((key) => {
				let value = obj[key];

				if (typeof value === 'object') {
					value = JSON.stringify(value);
				}

				return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
			})
			.join('&');
	}

	static objFindItemRecursiveByKey(
		obj: AnyValueObject | any[],
		searchKey: string,
		searchValue: any,
		childKey: string
	): AnyValueObject | null {
		const findItemFromList = (lists: AnyValueObject): any | null => {
			let searchArray: any[];

			if (typeof lists !== 'object' || !Array.isArray(lists)) {
				searchArray = [lists];
			} else {
				searchArray = lists;
			}

			for (let i = 0, iLen = searchArray.length; i < iLen; i += 1) {
				if (searchArray[i][searchKey] === searchValue) {
					return searchArray[i];
				}
				if (!Qsu.isEmpty(searchArray[i][childKey])) {
					const childItem = findItemFromList(searchArray[i][childKey]);

					if (childItem) {
						return childItem;
					}
				}
			}
			return null;
		};

		return findItemFromList(obj);
	}

	static objToPrettyStr(obj: AnyValueObject): string {
		return JSON.stringify(obj, null, '\t');
	}

	static objToArray(obj: AnyValueObject, recursive = false): any[] {
		const convertToArray = (o: AnyValueObject): any[] => {
			const r = [];
			const oLen = Object.keys(o).length;

			for (let i = 0; i < oLen; i += 1) {
				const key = Object.keys(o)[i];

				if (recursive && typeof o[key] === 'object') {
					r.push([key, convertToArray(o[key])]);
				} else {
					r.push([key, o[key]]);
				}
			}

			return r;
		};

		return convertToArray(obj);
	}

	static objDeleteKeyByValue(
		obj: AnyValueObject,
		searchValue: string | number | null | undefined,
		recursive = false
	): AnyValueObject | null {
		if (!obj || typeof obj !== 'object') {
			return null;
		}

		const newObj = Object.assign(obj, {});

		for (let i = Object.keys(newObj).length; i >= 0; i -= 1) {
			const key = Object.keys(newObj)[i];

			if (recursive && newObj[key] && typeof newObj[key] === 'object') {
				Qsu.objDeleteKeyByValue(newObj[key], searchValue, recursive);
			} else if (newObj[key] === searchValue) {
				delete newObj[key];
			}
		}

		return newObj;
	}

	static objUpdate(
		obj: AnyValueObject,
		key: string,
		value: any,
		recursive = false,
		upsert = false
	): AnyValueObject | null {
		if (!obj || typeof obj !== 'object') {
			return null;
		}

		const newObj = Object.assign(obj, {});
		let hasUpdated = false;

		const checkObjectKey = (currentObj: AnyValueObject): void => {
			for (let i = 0; i < Object.keys(currentObj).length; i += 1) {
				const currentKey = Object.keys(currentObj)[i];

				if (recursive && currentObj[currentKey] && typeof currentObj[currentKey] === 'object') {
					checkObjectKey(currentObj[currentKey]);
				}

				if (Object.hasOwn(currentObj, key)) {
					// eslint-disable-next-line no-param-reassign
					currentObj[key] = value;
					hasUpdated = true;
				}
			}
		};

		checkObjectKey(newObj);

		if (!hasUpdated && upsert) {
			newObj[key] = value;
		}

		return newObj;
	}

	/*
	 * String
	 * */
	static trim(str?: string | null): string | null {
		if (typeof str !== 'string' && !str) {
			return null;
		}

		return str.trim().replace(/\s{2,}/g, ' ');
	}

	static removeSpecialChar(str: string, exceptionCharacters?: string): string {
		if (!str) {
			return '';
		}

		return str.replace(
			new RegExp(
				`[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f${
					exceptionCharacters ?? ''
				}]`,
				'gi'
			),
			''
		);
	}

	static replaceBetween(str: string, startChar: string, endChar: string, replaceWith = ''): string {
		if (!str) {
			return '';
		}

		const specialCharacters = /[.*+?^${}()|[\]\\]/g;
		const startCharRegExp = specialCharacters.test(startChar) ? `\\${startChar}` : startChar;
		const endCharRegExp = specialCharacters.test(endChar) ? `\\${endChar}` : endChar;

		return str.replace(new RegExp(`${startCharRegExp}.*?${endCharRegExp}`, 'g'), replaceWith);
	}

	static removeNewLine(str: string, replaceTo = ''): string {
		if (!str) {
			return '';
		}

		return str.replace(/(\r\n|\n|\r)/gm, replaceTo).trim();
	}

	static capitalizeFirst(str: string): string {
		if (!str) {
			return '';
		}

		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	static capitalizeEverySentence(str: string, splitChar?: string): string {
		if (!str) {
			return '';
		}

		const splitter: string = splitChar || '.';
		const splitStr = str.split(splitter);
		let resultStr = '';
		let sentenceChars;

		for (let i = 0, iLen = splitStr.length; i < iLen; i += 1) {
			sentenceChars = [...splitStr[i]];

			for (let j = 0, jLen = sentenceChars.length; j < jLen; j += 1) {
				if (/[a-zA-Z]/.test(splitStr[i][j])) {
					sentenceChars[j] = splitStr[i][j].toUpperCase();
					break;
				}
			}

			resultStr += `${sentenceChars.join('')}${i < iLen - 1 ? splitter : ''}`;
		}

		return resultStr;
	}

	static capitalizeEachWords(str: string, natural?: boolean): string {
		if (!str) {
			return '';
		}

		const splitStr = str.trim().toLowerCase().split(' ');

		for (let i = 0, iLen = splitStr.length; i < iLen; i += 1) {
			if (
				!natural ||
				!Qsu.contains(
					splitStr[i],
					[
						'in',
						'on',
						'the',
						'at',
						'and',
						'or',
						'of',
						'for',
						'to',
						'that',
						'a',
						'by',
						'it',
						'is',
						'as',
						'are',
						'were',
						'was',
						'nor',
						'an'
					],
					true
				)
			) {
				splitStr[i] = Qsu.capitalizeFirst(splitStr[i]);
			}
		}

		return Qsu.capitalizeFirst(splitStr.join(' '));
	}

	static strCount(str: string, search: string): number {
		if (!str || !search) {
			return 0;
		}

		let count = 0;
		let pos = str.indexOf(search);

		while (pos > -1) {
			count += 1;
			pos = str.indexOf(search, (pos += search.length));
		}

		return count;
	}

	static strShuffle(str: string): string {
		if (!str) {
			return '';
		}

		return [...str].sort(() => Math.random() - 0.5).join('');
	}

	static strRandom<N extends number>(
		length: PositiveNumber<N>,
		additionalCharacters?: string
	): string {
		const availCharacters = `abcdefghijklmnopqrstuvwxyz0123456789${additionalCharacters}`;
		const availCharacterLength = availCharacters.length;
		let result = '';
		let newChar;

		for (let i = 0; i < length; i += 1) {
			newChar = availCharacters.charAt(Math.floor(Math.random() * availCharacterLength));
			newChar = Math.random() < 0.5 ? newChar.toUpperCase() : newChar;
			result += newChar;
		}

		return result;
	}

	static strBlindRandom<N extends number>(
		str: string,
		blindLength: PositiveNumber<N>,
		blindStr = '*'
	): string {
		if (!str) {
			return '';
		}

		let currentStr = str;
		let hideCount = 0;
		let tempIdx = 0;
		let currentStrLength = 0;

		const totalStrLength = currentStr.length;

		while (hideCount < blindLength && currentStrLength < totalStrLength) {
			tempIdx = Qsu.numRandom(0, totalStrLength);

			if (/[a-zA-Z가-힣]/.test(currentStr.substring(tempIdx, tempIdx + 1))) {
				currentStr = `${currentStr.substring(0, tempIdx + 1)}${blindStr}${currentStr.substring(
					tempIdx + 2
				)}`;
				hideCount += 1;
			}

			currentStrLength += 1;
		}

		return currentStr;
	}

	static truncate<N extends number>(str: string, length: PositiveNumber<N>, ellipsis = ''): string {
		if (!str) {
			return '';
		}

		let convStr = str;

		if (str.length > length) {
			convStr = str.substring(0, length) + ellipsis;
		}

		return convStr;
	}

	static truncateExpect<N extends number>(
		str: string,
		expectLength: PositiveNumber<N>,
		endStringChar = '.'
	): string {
		if (!str) {
			return '';
		}

		const isEndStringCharLastSentence = str.slice(-1) === endStringChar;
		const splitStr = str.split(endStringChar);
		const splitStrLength = splitStr.length;
		let convStr = '';
		let currentLength = 0;

		for (let i = 0; i < splitStrLength; i += 1) {
			if (currentLength < expectLength) {
				convStr += `${splitStr[i]}${
					i !== splitStrLength - 1 || isEndStringCharLastSentence ? endStringChar : ''
				}`;
				currentLength += splitStr[i].length + endStringChar.length;
			} else {
				break;
			}
		}

		return convStr;
	}

	static split(str: string, ...splitter: any[]): string[];

	static split(str: string, ...splitter: Array<string>): string[];

	static split(str: string, ...splitter: Array<string> | string[]): string[] {
		if (!str) {
			return [];
		}

		const splitters =
			splitter.length > 0 && typeof splitter[0] === 'object' ? splitter[0] : splitter;
		const splitterLength: number = splitters.length;
		let charPattern = '';
		let strPattern = '';

		for (let i = 0; i < splitterLength; i += 1) {
			const spl = splitters[i];

			if (spl.length > 1) {
				strPattern += `${strPattern.length < 1 ? '' : '|'}${spl
					.replace(/\\/g, '\\\\')
					.replace(/\[/g, '\\[')
					.replace(/]/g, '\\]')
					.replace(/\?/g, '\\?')
					.replace(/\./g, '\\.')
					.replace(/\{/g, '\\{')
					.replace(/}/g, '\\}')
					.replace(/\+/g, '\\+')}`;
			} else if (spl === '-' || spl === '[' || spl === ']') {
				charPattern += `\\${spl}`;
			} else {
				charPattern += spl;
			}
		}

		if (charPattern.length < 1 && strPattern.length < 1) {
			return [str];
		}

		if (charPattern.length > 0) {
			charPattern = `[${charPattern}]`;
			if (strPattern.length > 0) {
				strPattern = `|${strPattern}`;
			}
		}

		return str.split(new RegExp(`${charPattern}${strPattern}+`, 'gi'));
	}

	static encrypt(
		str: string,
		secret: string,
		algorithm = 'aes-256-cbc',
		ivSize = 16,
		toBase64 = false
	): string {
		if (!str || str.length < 1) {
			return '';
		}

		const iv: Buffer = randomBytes(ivSize);
		const cipher = createCipheriv(algorithm, secret, iv);
		let enc = cipher.update(str);

		enc = Buffer.concat([enc, cipher.final()]);

		const encoding: BufferEncoding = toBase64 ? 'base64' : 'hex';

		return `${iv.toString(encoding)}:${enc.toString(encoding)}`;
	}

	static decrypt(str: string, secret: string, algorithm = 'aes-256-cbc', toBase64 = false): string {
		if (!str || str.length < 1) {
			return '';
		}

		const encoding: BufferEncoding = toBase64 ? 'base64' : 'hex';
		const arrStr: any[] = str.split(':');
		const decipher = createDecipheriv(algorithm, secret, Buffer.from(arrStr.shift(), encoding));
		let decrypted = decipher.update(Buffer.from(arrStr.join(':'), encoding));

		decrypted = Buffer.concat([decrypted, decipher.final()]);

		return decrypted.toString();
	}

	static md5(str: string): string {
		return createHash('md5').update(str).digest('hex');
	}

	static sha1(str: string): string {
		return createHash('sha1').update(str).digest('hex');
	}

	static sha256(str: string): string {
		return createHash('sha256').update(str).digest('hex');
	}

	static encodeBase64(str: string): string {
		return Buffer.from(str, 'utf8').toString('base64');
	}

	static decodeBase64(encodedStr: string): string {
		return Buffer.from(encodedStr, 'base64').toString('utf8');
	}

	static strToNumberHash(str: string): number {
		if (!str) {
			return 0;
		}

		let hash = 0;

		for (let i = 0; i < str.length; i += 1) {
			hash = (hash << 5) - hash + str.charCodeAt(i);
			hash |= 0;
		}

		return hash;
	}

	static strToAscii(str: string): number[] {
		const arr = [];
		for (let i = 0; i < str.length; i += 1) {
			arr.push(str.charCodeAt(i));
		}
		return arr;
	}

	static strUnique(str: string): string {
		if (!str) {
			return '';
		}

		return [...new Set(str)].join('');
	}

	static urlJoin(...args: any[]): string {
		if (!args) {
			return '';
		}

		const argLength = args.length;
		let urlResult = '';
		let joinCount = 0;

		for (let i = 0; i < argLength; i += 1) {
			if (args[i] !== null && args[i] !== undefined) {
				if (
					joinCount === 0 ||
					args[i].startsWith('/') ||
					args[i].startsWith('?') ||
					args[i].startsWith('&')
				) {
					urlResult += args[i];
				} else {
					urlResult += `/${args[i]}`;
				}

				joinCount += 1;
			}
		}

		return urlResult.replace(/\/$/g, '');
	}

	/*
	 * Verify
	 * */
	static isObject(data: any): boolean {
		return typeof data === 'object' && !Array.isArray(data) && data !== null;
	}

	static isEqual(leftOperand: any, ...rightOperand: Array<any>): boolean {
		const rightOperands =
			rightOperand.length > 0 && typeof rightOperand[0] === 'object'
				? rightOperand[0]
				: rightOperand;
		const rightOperandLength: number = rightOperands.length;

		for (let i = 0; i < rightOperandLength; i += 1) {
			// eslint-disable-next-line eqeqeq
			if (rightOperands[i] != leftOperand) {
				return false;
			}
		}

		return true;
	}

	static isEqualStrict(leftOperand: any, ...rightOperand: Array<any>): boolean {
		const rightOperands =
			rightOperand.length > 0 && typeof rightOperand[0] === 'object'
				? rightOperand[0]
				: rightOperand;
		const rightOperandLength: number = rightOperands.length;

		for (let i = 0; i < rightOperandLength; i += 1) {
			if (rightOperands[i] !== leftOperand) {
				return false;
			}
		}

		return true;
	}

	static isEmpty(data?: any): boolean {
		if (!data) {
			return true;
		}

		switch (typeof data) {
			case 'string':
				return data.length < 1;
			case 'object':
				if (Array.isArray(data)) {
					return data.length < 1;
				}
				return Object.keys(data).length < 1;
			default:
				return false;
		}
	}

	static isUrl(url: string, withProtocol = false, strict = false): boolean {
		if (strict && url.indexOf('.') === -1) {
			return false;
		}

		try {
			new URL(`${withProtocol && url.indexOf('://') === -1 ? 'https://' : ''}${url}`).toString();
		} catch (e) {
			return false;
		}

		return true;
	}

	static contains(str: any[] | string, search: any[] | string, exact = false): boolean {
		if (typeof search === 'string') {
			return str.length < 1 ? false : str.indexOf(search) !== -1;
		}

		for (let i = 0, iLen = search.length; i < iLen; i += 1) {
			if (exact) {
				if (str === search[i]) {
					return true;
				}
			} else if (str.indexOf(search[i]) !== -1) {
				return true;
			}
		}

		return false;
	}

	static is2dArray(array: any[]): boolean {
		return array.filter(Array.isArray).length > 0;
	}

	static between(range: [number, number], number: number, inclusive = false): boolean {
		const minM = Math.min.apply(Math, [range[0], range[1]]);
		const maxM = Math.max.apply(Math, [range[0], range[1]]);

		return inclusive ? number >= minM && number <= maxM : number > minM && number < maxM;
	}

	static len(data: any): number {
		if (!data) {
			return 0;
		}
		switch (typeof data) {
			case 'object':
				return Array.isArray(data) ? data.length : Object.keys(data).length;
			case 'number':
			case 'bigint':
				return data.toString().length;
			case 'boolean':
				return data ? 4 : 5;
			case 'function':
				return data().length;
			case 'string':
			default:
				return data.length;
		}
	}

	static isEmail(email: string): boolean {
		// RFC2822 Email Validation
		return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
			email
		);
	}

	static isTrueMinimumNumberOfTimes(conditions: boolean[], minimumCount = 1): boolean {
		const conditionLength = conditions.length;
		let trueCount = 0;

		for (let i = 0; i < conditionLength; i += 1) {
			if (typeof conditions[i] === 'boolean' && conditions[i]) {
				trueCount += 1;
			}
		}

		return trueCount >= minimumCount;
	}

	/*
	 * Format
	 * */
	static numberFormat(number: number | string): string {
		return new Intl.NumberFormat().format(number as number);
	}

	static fileName(filePath: string, withExtension = false): string {
		if (!filePath) {
			return '';
		}

		if (filePath.indexOf('/') === -1) {
			// Windows path
			if (withExtension) {
				return win32.basename(filePath);
			}

			return win32.basename(filePath, extname(filePath));
		}

		if (withExtension) {
			return basename(filePath);
		}

		return basename(filePath, extname(filePath));
	}

	static fileSize<N extends number>(bytes: PositiveNumber<N>, decimals = 2): string {
		if (!bytes || bytes === 0 || bytes < 0) {
			return '0 Bytes';
		}

		const byteCalc = Math.floor(Math.log(bytes) / Math.log(1024));

		return `${parseFloat((bytes / 1024 ** byteCalc).toFixed(decimals < 0 ? 0 : decimals))} ${
			['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][byteCalc]
		}`;
	}

	static fileExt(filePath: string): string {
		if (filePath.indexOf('.') === -1) {
			return 'Unknown';
		}

		const pSpl = filePath.trim().toLowerCase().split('.');

		return pSpl.length > 0 ? pSpl[pSpl.length - 1] : 'Unknown';
	}

	static msToTime(milliseconds = 0, withMilliseconds = false, separator = ':'): string {
		const ms: number = Math.floor((milliseconds % 1000) / 100);
		let sec: string | number = Math.floor((milliseconds / 1000) % 60);
		let min: string | number = Math.floor((milliseconds / (1000 * 60)) % 60);
		let hour: string | number = Math.floor(milliseconds / (1000 * 60 * 60));

		hour = hour < 10 ? `0${hour}` : hour;
		min = min < 10 ? `0${min}` : min;
		sec = sec < 10 ? `0${sec}` : sec;

		return `${hour}${separator}${min}${separator}${sec}${withMilliseconds ? `.${ms}` : ''}`;
	}

	static secToTime(seconds = 0, onlyHour = false, separator = ':'): string {
		let sec: string | number = Math.floor(seconds % 60);
		let min: string | number = Math.floor((seconds / 60) % 60);
		let hour: string | number = Math.floor(seconds / (60 * 60));

		hour = hour < 10 ? `0${hour}` : hour;
		min = min < 10 ? `0${min}` : min;
		sec = sec < 10 ? `0${sec}` : sec;

		return onlyHour ? hour.toString() : `${hour}${separator}${min}${separator}${sec}`;
	}
}

export { Qsu };

export const {
	sleep,
	funcTimes,
	debounce,
	objectId,
	numRandom,
	sum,
	mul,
	sub,
	div,
	dayDiff,
	today,
	isValidDate,
	dateToYYYYMMDD,
	createDateListFromRange,
	arrShuffle,
	arrWithDefault,
	arrUnique,
	arrWithNumber,
	arrRepeat,
	arrCount,
	average,
	arrMove,
	arrTo1dArray,
	sortByObjectKey,
	sortNumeric,
	arrGroupByMaxCount,
	objToQueryString,
	objToPrettyStr,
	objFindItemRecursiveByKey,
	objToArray,
	objDeleteKeyByValue,
	objUpdate,
	trim,
	replaceBetween,
	removeSpecialChar,
	removeNewLine,
	capitalizeFirst,
	capitalizeEverySentence,
	capitalizeEachWords,
	strCount,
	strShuffle,
	strRandom,
	strBlindRandom,
	truncate,
	truncateExpect,
	split,
	encrypt,
	decrypt,
	md5,
	sha1,
	sha256,
	encodeBase64,
	decodeBase64,
	strToNumberHash,
	strUnique,
	strToAscii,
	urlJoin,
	isObject,
	isEqual,
	isEqualStrict,
	isEmpty,
	isUrl,
	contains,
	is2dArray,
	between,
	len,
	isEmail,
	isTrueMinimumNumberOfTimes,
	numberFormat,
	fileName,
	fileSize,
	fileExt,
	msToTime,
	secToTime
} = Qsu;
