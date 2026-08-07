// Compiled once. Building a `RegExp` inside a function recompiles the pattern on every call.
const UNESCAPED_HTML_CHARACTERS = /[&<>"']/g;

// `'` is written as `&#39;` rather than `&apos;`, which HTML 4 did not define and which
// therefore does not survive every parser.
const HTML_ESCAPES: { [key: string]: string } = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;'
};

export function escapeHtml(str: string): string {
	if (!str) {
		return '';
	}

	return str.replace(UNESCAPED_HTML_CHARACTERS, (char: string) => HTML_ESCAPES[char]);
}
