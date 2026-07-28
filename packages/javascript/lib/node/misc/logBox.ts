import { inspect } from 'node:util';

const BORDER = {
	tl: '┌',
	tr: '┐',
	bl: '└',
	br: '┘',
	h: '─',
	v: '│',
	lt: '├',
	rt: '┤',
	tt: '┬',
	bt: '┴',
	x: '┼'
} as const;

function charWidth(cp: number): number {
	if (cp === 0) return 0;
	if (cp < 32 || (cp >= 0x7f && cp < 0xa0)) return 0;
	if (
		(cp >= 0x1100 && cp <= 0x115f) ||
		(cp >= 0x2e80 && cp <= 0x303e) ||
		(cp >= 0x3041 && cp <= 0x33ff) ||
		(cp >= 0x3400 && cp <= 0x4dbf) ||
		(cp >= 0x4e00 && cp <= 0x9fff) ||
		(cp >= 0xa000 && cp <= 0xa4cf) ||
		(cp >= 0xac00 && cp <= 0xd7a3) ||
		(cp >= 0xf900 && cp <= 0xfaff) ||
		(cp >= 0xfe30 && cp <= 0xfe4f) ||
		(cp >= 0xff00 && cp <= 0xff60) ||
		(cp >= 0xffe0 && cp <= 0xffe6) ||
		(cp >= 0x1f300 && cp <= 0x1faff) ||
		(cp >= 0x20000 && cp <= 0x3fffd)
	) {
		return 2;
	}
	return 1;
}

function stringWidth(str: string): number {
	let w = 0;
	for (const ch of str) w += charWidth(ch.codePointAt(0)!);
	return w;
}

function padEndVisual(str: string, width: number): string {
	const pad = width - stringWidth(str);
	return pad > 0 ? str + ' '.repeat(pad) : str;
}

function centerVisual(str: string, width: number): string {
	const total = width - stringWidth(str);
	if (total <= 0) return str;
	const left = Math.floor(total / 2);
	return ' '.repeat(left) + str + ' '.repeat(total - left);
}

function wrapVisual(text: string, width: number): string[] {
	const out: string[] = [];
	const w = Math.max(1, width);
	for (const rawLine of text.split('\n')) {
		if (rawLine === '') {
			out.push('');
			continue;
		}
		let cur = '';
		let curW = 0;
		for (const ch of rawLine) {
			const cw = charWidth(ch.codePointAt(0)!);
			if (curW + cw > w) {
				out.push(cur);
				cur = ch;
				curW = cw;
			} else {
				cur += ch;
				curW += cw;
			}
		}
		out.push(cur);
	}
	return out;
}

function format(value: unknown, breakLength: number): string {
	if (typeof value === 'string') return value;
	return inspect(value, {
		depth: null,
		breakLength,
		colors: false,
		maxArrayLength: null,
		maxStringLength: null,
		compact: 3
	});
}

function detectWidth(): number {
	for (const stream of [process.stdout, process.stderr]) {
		const c = (stream as { columns?: number } | undefined)?.columns;
		if (typeof c === 'number' && c > 0) return c;
	}
	const env = Number(process.env.COLUMNS);
	if (Number.isFinite(env) && env > 0) return Math.floor(env);
	return 80;
}

export function logBox(...args: unknown[]): void {
	const term = Math.max(detectWidth(), 10);

	const headerIdx = '#';
	const headerVal = 'value';

	const idxStrings = args.map((_, i) => String(i));
	const iwContent = Math.max(stringWidth(headerIdx), ...idxStrings.map(stringWidth), 1);
	const indexCellWidth = iwContent + 2;

	let valueCellWidth = term - indexCellWidth - 3;
	if (valueCellWidth < 3) valueCellWidth = 3;
	const vwContent = valueCellWidth - 2;

	const border = (l: string, mid: string, r: string): string =>
		l + BORDER.h.repeat(indexCellWidth) + mid + BORDER.h.repeat(valueCellWidth) + r;

	const top = border(BORDER.tl, BORDER.tt, BORDER.tr);
	const sep = border(BORDER.lt, BORDER.x, BORDER.rt);
	const bottom = border(BORDER.bl, BORDER.bt, BORDER.br);

	const rowLine = (idxCell: string, valCell: string): string =>
		`${BORDER.v} ${idxCell} ${BORDER.v} ${valCell} ${BORDER.v}`;

	const out: string[] = [top];

	out.push(rowLine(centerVisual(headerIdx, iwContent), padEndVisual(headerVal, vwContent)));
	out.push(sep);

	if (args.length === 0) {
		out.push(rowLine(centerVisual('-', iwContent), padEndVisual('(no arguments)', vwContent)));
		out.push(bottom);
		console.log(out.join('\n'));
		return;
	}

	args.forEach((arg, i) => {
		const text = format(arg, vwContent);
		const wrapped = wrapVisual(text, vwContent);
		wrapped.forEach((vline, li) => {
			const idxCell = li === 0 ? centerVisual(idxStrings[i], iwContent) : ' '.repeat(iwContent);
			out.push(rowLine(idxCell, padEndVisual(vline, vwContent)));
		});
		if (i < args.length - 1) out.push(sep);
	});

	out.push(bottom);
	console.log(out.join('\n'));
}
