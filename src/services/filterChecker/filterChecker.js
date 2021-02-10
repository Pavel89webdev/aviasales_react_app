import filters from "../../components/filters";

function filterChecker(currentFiltersId, filterId) {
	let newFilters = {};
	const all = filters[0].id;
	let coincidence = 0;

	filters.map((filter, index) => {
		const currrentFilterId = filters[index].id;

		if (filterId === all && !currentFiltersId[all]) {
			coincidence++;
			newFilters[currrentFilterId] = true;
			return filter;
		}

		if (filterId === all && currentFiltersId[all]) {
			newFilters[currrentFilterId] = false;
			return filter;
		}

		if (
			filterId === currrentFilterId &&
			currentFiltersId[currrentFilterId]
		) {
			newFilters[currrentFilterId] = false;
			newFilters[all] = false;
			coincidence -= 2;
			return filter;
		}

		if (
			filterId === currrentFilterId ||
			currentFiltersId[currrentFilterId]
		) {
			coincidence++;
			newFilters[currrentFilterId] = true;
		}
		if (coincidence >= filters.length - 1) {
			newFilters[all] = true;
		}
		return filter;
	});

	return newFilters;
}

export default filterChecker;
