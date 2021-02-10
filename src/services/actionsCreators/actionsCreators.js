import actionsTypes from "../actionsTypes";
import searchService from "../../services/SearchService";

const stops = 3;

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
	async getSearchResults(dispatch) {
		dispatch(actionsCreators.isFetchingOn());

		let action = {};

		try {
			let searchResult = await searchService.getSearchResult();

			action = {
				type: actionsTypes.getSearchResults,
				...sortTicketsByStops(searchResult),
				stop: searchResult.stop,
			};
			if (!searchResult.stop) {
				this.getSearchResults(dispatch);
			}
		} catch (e) {
			return this.getSearchResults(dispatch);
		}

		return dispatch(action);
	},
};

export default actionsCreators;

function sortTicketsByStops(searchResult) {
	const result = {
		ticketsCount: 0,
	};

	const addStopsToKey = (stops) => `tickets${stops}Stops`;

	for (let i = 0; i <= stops; i++) {
		const key = addStopsToKey(i);
		result[key] = [];
	}

	searchResult.tickets.map((ticket) => {
		result.ticketsCount++;

		const stops = Math.max(
			0,
			ticket.segments[0].stops.length,
			ticket.segments[1].stops.length
		);

		result[addStopsToKey(stops)].push(ticket);

		return ticket;
	});

	return result;
}
