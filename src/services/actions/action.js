const actions = {
	changeSortId: (id = 1) => ({
		type: "CHANGE_SORT_ID",
		sortId: id,
	}),
	changeFilterId: (id = 1) => ({
		type: "CHANGE_FILTER_ID",
		filterId: id,
	}),
	isFetchingOn: () => ({
		type: "FETCHING_IS_ON",
	}),
	async getSearchResults(dispatch, searchService) {
		dispatch(actions.isFetchingOn());
		let searchResult = await searchService.getSearchResult();

		const action = {
			type: "GET_SEARCH_RESULTS",
			searchResult,
		};
		return dispatch(action);
	},
};

export default actions;
