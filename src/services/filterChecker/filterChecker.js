import filters from "../../components/filters";

function filterChecker(currentFiltersId, filterId) {
	if (filterId === 1 && !currentFiltersId.includes(filterId)) {
		return filters.map((filter) => filter.id);
	}
	if (filterId === 1 && currentFiltersId.includes(filterId)) {
		return [];
	}
	if (currentFiltersId.includes(filterId)) {
		const newCurrentFilters = [...currentFiltersId];
		newCurrentFilters.splice(newCurrentFilters.indexOf(filterId), 1);

		const indexOfAllFilterId = newCurrentFilters.indexOf(1);
		if (indexOfAllFilterId > -1)
			newCurrentFilters.splice(indexOfAllFilterId, 1);

		return newCurrentFilters;
	}
	if (filterId && filters.length - 2 === currentFiltersId.length) {
		return [...currentFiltersId, filterId, 1];
	}
	if (filterId) {
		return [...currentFiltersId, filterId];
	}
}

export default filterChecker;
