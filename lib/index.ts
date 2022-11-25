import { basename, extname, win32 } from 'path';
import { randomBytes, createCipheriv, createDecipheriv, createHash } from 'crypto';

declare interface LicenseOption {
	author: string;
	email?: string;
	yearStart: string | number;
	yearEnd?: string;
	htmlBr?: boolean;
	type: 'mit' | 'apache20';
}

declare type PositiveNumber<N extends number> = number extends N
	? N
	: `${N}` extends `-${string}`
	? never
	: N;

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

	static getPlatform(): string {
		switch (process.platform) {
			case 'win32':
				return 'Windows';
			case 'darwin':
				return 'macOS';
			case 'linux':
			case 'aix':
			case 'sunos':
			case 'netbsd':
			case 'openbsd':
			case 'freebsd':
			case 'cygwin':
			case 'android':
				return 'Linux';
			default:
				return 'Unknown';
		}
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

	static isRealDate(date: string | Date): boolean {
		const dateConverted: Date = typeof date === 'string' ? new Date(date) : date;

		if (!dateConverted.getTime()) {
			return false;
		}

		return dateConverted.toISOString().slice(0, 10) === date;
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
			return array
				.map((x): string => JSON.stringify(x))
				.reverse()
				.filter((e, i, a) => a.indexOf(e, i + 1) === -1)
				.reverse()
				.map((x): object => JSON.parse(x));
		}

		return [...new Set(array)];
	}

	static arrWithNumber(start: number, end: number): number[] {
		if (start > end) {
			throw new Error('end is greater than start.');
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

	/*
	 * String
	 * */
	static trim(str: string, removeAllSpace = false): string {
		return str.trim().replace(removeAllSpace ? /\s+/g : /\s{2,}/g, '');
	}

	static removeSpecialChar(str: string, withoutSpace?: boolean): string {
		if (!str) {
			return '';
		}

		return str.replace(
			new RegExp(
				`[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f${
					withoutSpace ? ' ' : ''
				}]`,
				'gi'
			),
			''
		);
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

	static encrypt(str: string, secret: string, algorithm = 'aes-256-cbc', ivSize = 16): string {
		if (!str || str.length < 1) {
			return '';
		}

		const iv: Buffer = randomBytes(ivSize);
		const cipher = createCipheriv(algorithm, secret, iv);
		let enc = cipher.update(str);

		enc = Buffer.concat([enc, cipher.final()]);

		return `${iv.toString('hex')}:${enc.toString('hex')}`;
	}

	static decrypt(str: string, secret: string, algorithm = 'aes-256-cbc'): string {
		if (!str || str.length < 1) {
			return '';
		}

		const arrStr: any[] = str.split(':');
		const decipher = createDecipheriv(algorithm, secret, Buffer.from(arrStr.shift(), 'hex'));
		let decrypted = decipher.update(Buffer.from(arrStr.join(':'), 'hex'));

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

	static strUnique(str: string): string {
		if (!str) {
			return '';
		}

		return [...new Set(str)].join('');
	}

	/*
	 * Verify
	 * */
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

	static isBotAgent(userAgent: string): boolean {
		return /bot|naverbot|google|Googlebot|Googlebot-Mobile|Googlebot-Image|Google favicon|Chrome-Lighthouse|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis/i.test(
			userAgent
		);
	}

	/*
	 * Format
	 * */
	static numberFormat(number: number): string {
		return new Intl.NumberFormat().format(number);
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

	static license(options: LicenseOption): string {
		const br = options.htmlBr ? '<br/>' : '\n';
		const yearString = `${options.yearStart}${options.yearEnd ? `-${options.yearEnd}` : ''}`;
		const authorString = `${options.author}${options.email ? ` <${options.email}>` : ''}`;

		switch (options.type.replace(/\.-_,\s/g, '').toLowerCase()) {
			case 'apache20':
				return `Copyright ${yearString} ${authorString}${br}${br}Licensed under the Apache License, Version 2.0 (the "License");${br}you may not use this file except in compliance with the License.${br}You may obtain a copy of the License at${br}${br}    http://www.apache.org/licenses/LICENSE-2.0${br}${br}Unless required by applicable law or agreed to in writing, software${br}distributed under the License is distributed on an "AS IS" BASIS,${br}WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.${br}See the License for the specific language governing permissions and${br}limitations under the License.`;
			case 'mit':
			default:
				return `Copyright (c) ${yearString} ${authorString}${br}${br}Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:${br}${br}The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.${br}${br}THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
		}
	}
}

export { Qsu };

export const {
	sleep,
	funcTimes,
	getPlatform,
	numRandom,
	sum,
	mul,
	dayDiff,
	today,
	isRealDate,
	arrShuffle,
	arrWithDefault,
	arrUnique,
	arrWithNumber,
	average,
	arrMove,
	arrTo1dArray,
	trim,
	removeSpecialChar,
	removeNewLine,
	capitalizeFirst,
	capitalizeEachWords,
	strCount,
	strShuffle,
	strRandom,
	strBlindRandom,
	truncate,
	split,
	encrypt,
	decrypt,
	md5,
	sha1,
	sha256,
	encodeBase64,
	decodeBase64,
	strUnique,
	isEqual,
	isEqualStrict,
	isEmpty,
	isUrl,
	contains,
	is2dArray,
	between,
	len,
	isBotAgent,
	numberFormat,
	fileName,
	fileSize,
	fileExt,
	msToTime,
	secToTime,
	license
} = Qsu;
