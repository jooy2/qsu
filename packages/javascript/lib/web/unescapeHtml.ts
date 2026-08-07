// Compiled once. One pass over the whole string, not five sequential replacements: turning
// `&amp;` into `&` first and `&lt;` into `<` afterwards would read `&amp;lt;` as `<`, where
// it has to come back as the literal text `&lt;`.
const ESCAPED_HTML_ENTITIES = /&(?:amp|lt|gt|quot|#39);/g;

const HTML_UNESCAPES: { [key: string]: string } = {
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&#39;': "'"
};

export function unescapeHtml(str: string): string {
	if (!str) {
		return '';
	}

	return str.replace(ESCAPED_HTML_ENTITIES, (entity: string) => HTML_UNESCAPES[entity]);
}
