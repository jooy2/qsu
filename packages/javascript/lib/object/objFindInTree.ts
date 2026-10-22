import type { AnyValueObject } from '../_types/global.js';
import { isEmpty } from '../verify/isEmpty.js';

export function objFindInTree(
	obj: AnyValueObject | any[],
	searchKey: string,
	searchValue: any,
	childrenKey: string
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
			if (!isEmpty(searchArray[i][childrenKey])) {
				const childItem = findItemFromList(searchArray[i][childrenKey]);

				if (childItem) {
					return childItem;
				}
			}
		}
		return null;
	};

	return findItemFromList(obj);
}
