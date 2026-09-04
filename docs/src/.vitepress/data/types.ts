/**
 * One documented type, written the way each language spells it.
 *
 * The reference documents a signature once, in the JavaScript package's terms,
 * because that is the implementation the other two are ported from. Reading
 * `string` on a Dart page is a small lie every time, so the type is translated
 * on the way to the screen instead.
 *
 * The translation is a default, not a rule. Where a package really is different
 * — `int` against `num`, an enum where JavaScript takes a string literal — the
 * page writes the types out itself:
 *
 * ```
 * { name: 'milliseconds', type: { js: 'number', dart: 'num', python: 'float' } }
 * ```
 */

import { DEFAULT_CODE_LANGUAGE, variantsOf } from './languages';

/** A documented type: one spelling for every language, or one to translate. */
export type DocumentedType = string | Record<string, string>;

/**
 * The names that carry straight across.
 *
 * `number` is `int` because that is what qsu's numeric parameters almost always
 * are — counts, lengths, indexes and millisecond values. The handful that take a
 * fraction say so on their own row.
 */
const NAMES: Record<string, Record<string, string>> = {
	any: { dart: 'dynamic', python: 'Any' },
	boolean: { dart: 'bool', python: 'bool' },
	Date: { dart: 'DateTime', python: 'datetime' },
	function: { dart: 'Function', python: 'Callable' },
	null: { dart: 'Null', python: 'None' },
	number: { dart: 'int', python: 'int' },
	object: { dart: 'Map<String, dynamic>', python: 'dict' },
	string: { dart: 'String', python: 'str' },
	void: { dart: 'void', python: 'None' }
};

/** Splits on `|`, ignoring the ones inside `<>`, `[]` or quotes. */
function splitUnion(type: string): string[] {
	const parts: string[] = [];
	let depth = 0;
	let quote = '';
	let current = '';

	for (const character of type) {
		if (quote) {
			quote = character === quote ? '' : quote;
		} else if (character === "'" || character === '"') {
			quote = character;
		} else if ('<[('.includes(character)) {
			depth += 1;
		} else if ('>])'.includes(character)) {
			depth -= 1;
		} else if (character === '|' && depth === 0) {
			parts.push(current.trim());
			current = '';
			continue;
		}

		current += character;
	}

	parts.push(current.trim());

	return parts.filter(Boolean);
}

function one(part: string, language: string): string {
	// A value literal is the value, whichever language reads it.
	if (part.startsWith("'")) {
		return part;
	}

	// A rest parameter: several arguments in JavaScript and Python, one list in
	// Dart. `...number[]` and `...number` mean the same thing here.
	if (part.startsWith('...')) {
		const item = translate(part.slice(3).replace(/\[\]$/, ''), language);

		return language === 'dart' ? `List<${item}>` : `*${item}`;
	}

	if (part.endsWith('[]')) {
		const item = translate(part.slice(0, -2), language);

		return language === 'dart' ? `List<${item}>` : `list[${item}]`;
	}

	// A fixed-length pair, such as a range.
	const tuple = part.match(/^\[(.+)\]$/);

	if (tuple) {
		const items = splitUnion(tuple[1].replace(/,/g, '|')).map((item) => translate(item, language));

		return language === 'dart' ? `List<${items[0]}>` : `tuple[${items.join(', ')}]`;
	}

	const generic = part.match(/^(\w+)<(.+)>$/);

	if (generic) {
		const [, name, argument] = generic;
		const item = translate(argument, language);

		// Every port of an asynchronous JavaScript function is synchronous but
		// Dart's, so `Promise<T>` is a `Future<T>` there and a plain `T` in Python.
		if (name === 'Promise') {
			return language === 'dart' ? `Future<${item}>` : item;
		}

		if (name === 'Set') {
			return language === 'dart' ? `Set<${item}>` : `set[${item}]`;
		}

		return `${name}<${item}>`;
	}

	// An unknown name is a name this documentation made up, such as an options
	// type. It reads the same in every language.
	return NAMES[part]?.[language] ?? part;
}

/** `translate('string[]', 'dart')` → `'List<String>'`. */
export function translate(type: string, language: string): string {
	if (language === DEFAULT_CODE_LANGUAGE) {
		return type;
	}

	const written = splitUnion(type);

	// `T | null` is not a union anywhere else: it is a nullable `T`.
	if (written.length === 2 && written[1] === 'null') {
		const item = translate(written[0], language);

		if (language !== 'dart') {
			return `${item} | None`;
		}

		// `dynamic` already covers null, and Dart flags `dynamic?` as redundant.
		return item === 'dynamic' ? item : `${item}?`;
	}

	const parts = written.map((part) => one(part, language));

	// Dart has no union type, so anything that is still one becomes `dynamic` —
	// unless the union is a set of string values, which Dart takes as a `String`.
	if (language === 'dart' && parts.length > 1) {
		return written.every((part) => part.startsWith("'")) ? type : 'dynamic';
	}

	return [...new Set(parts)].join(' | ');
}

/**
 * The type as `language` spells it, honouring what the page wrote by hand.
 *
 * An object gives one language its own spelling; the ones it leaves out are
 * still translated from the JavaScript entry, so a row only has to name the
 * package that is actually different.
 */
export function typeIn(type: DocumentedType, language: string): string {
	if (typeof type !== 'string') {
		return type[language] ?? translate(type[DEFAULT_CODE_LANGUAGE] ?? '', language);
	}

	return translate(type, language);
}

/** The type each language reads, grouped so identical spellings share a cell. */
export function typeVariants(
	type: DocumentedType,
	implemented: string[] | null
): { text: string; languages: string[] }[] {
	return variantsOf(implemented, (language) => typeIn(type, language));
}

/**
 * The value literals whose spelling changes between languages.
 *
 * Only these three. A number, a string and an empty list read the same
 * everywhere, and `NaN` is what every language's own documentation calls the
 * IEEE value, whatever expression produces it. `undefined` is not here because
 * it has no counterpart to be written as: a page that has something to say about
 * it says it in a `::: lang js` block.
 */
const LITERALS: Record<string, Record<string, string>> = {
	true: { python: 'True' },
	false: { python: 'False' },
	null: { python: 'None' }
};

/** Whether `value` is one of the literals each language spells differently. */
export function isLiteral(value: string): boolean {
	return LITERALS[value] !== undefined;
}

/** A literal, written the way each language writes it. */
export function literalVariants(
	value: string,
	implemented: string[] | null
): { text: string; languages: string[] }[] {
	return variantsOf(implemented, (language) => LITERALS[value]?.[language] ?? value);
}

/**
 * The same literal as the `<code>` elements a page renders it through.
 *
 * A reference page writes `` `null` `` and every reader gets the word their own
 * package uses, so the prose does not have to carry "(`None` in Python)" at the
 * end of every sentence that mentions one. Both the Markdown renderer and
 * `ParamsTable` go through here, since a literal turns up in a paragraph and in
 * a parameter description alike.
 */
export function literalHtml(value: string, implemented: string[] | null): string {
	return literalVariants(value, implemented)
		.map(
			(variant) =>
				`<code class="lang-only" data-code-lang="${variant.languages.join(' ')}">${variant.text}</code>`
		)
		.join('');
}
