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

		const tickets0Stops = [],
			tickets1Stops = [],
			tickets2Stops = [],
			tickets3Stops = [];

		searchResult.tickets.map((ticket) => {
			const stops = Math.max(
				0,
				ticket.segments[0].stops.length,
				ticket.segments[1].stops.length
			);
			if (stops === 0) {
				tickets0Stops.push(ticket);
			}
			if (stops === 1) {
				tickets1Stops.push(ticket);
			}
			if (stops === 2) {
				tickets2Stops.push(ticket);
			}
			if (stops === 3) {
				tickets3Stops.push(ticket);
			}
			return ticket;
		});

		const action = {
			type: "GET_SEARCH_RESULTS",
			tickets0Stops,
			tickets1Stops,
			tickets2Stops,
			tickets3Stops,
			stop: /* searchResult.stop */ true,
		};

		if (/* !searchResult.stop */ false) {
			window.setTimeout(() => {
				this.getSearchResults(dispatch, searchService);
			}, 0);
		}
		return dispatch(action);
	},
};

export default actions;
