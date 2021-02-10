import actionsTypes from "../actionsTypes";

const actionsCreators = {
	changeSortId: (id = "all") => ({
		type: actionsTypes.changeSortId,
		sortId: id,
	}),
	changeFilterId: (id = "all") => ({
		type: actionsTypes.changeFilterId,
		filterId: id,
	}),
	isFetchingOn: () => ({
		type: actionsTypes.isFetchingOn,
	}),
	async getSearchResults(dispatch, searchService) {
		dispatch(actionsCreators.isFetchingOn());
		let searchResult = await searchService.getSearchResult();

		const tickets0Stops = [],
			tickets1Stops = [],
			tickets2Stops = [],
			tickets3Stops = [];

		let ticketsCount = 0;

		searchResult.tickets.map((ticket) => {
			ticketsCount++;

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
			type: actionsTypes.getSearchResults,
			tickets0Stops,
			tickets1Stops,
			tickets2Stops,
			tickets3Stops,
			stop: searchResult.stop,
			ticketsCount,
		};

		if (!searchResult.stop) {
			window.setTimeout(() => {
				this.getSearchResults(dispatch, searchService);
			}, 0);
		}
		return dispatch(action);
	},
};

export default actionsCreators;
