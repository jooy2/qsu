export function removeSpecialChar(str: string, exceptionCharacters?: string): string {
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
