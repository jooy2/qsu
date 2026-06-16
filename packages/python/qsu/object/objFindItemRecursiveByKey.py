from ..verify.isEmpty import isEmpty


def objFindItemRecursiveByKey(obj, searchKey, searchValue, childKey):
	def findItemFromList(lists):
		if not isinstance(lists, list):
			searchArray = [lists]
		else:
			searchArray = lists

		for item in searchArray:
			itemSearchValue = item.get(searchKey) if isinstance(item, dict) else None
			itemChildValue = item.get(childKey) if isinstance(item, dict) else None

			if itemSearchValue == searchValue:
				return item
			if not isEmpty(itemChildValue):
				childItem = findItemFromList(itemChildValue)

				if childItem:
					return childItem

		return None

	return findItemFromList(obj)
