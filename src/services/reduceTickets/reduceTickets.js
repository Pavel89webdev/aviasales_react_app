import actionsTypes from "../actionsTypes";

const stops = 3;

function reduceTickets(state = null, action) {
	switch (action.type) {
		case actionsTypes.getSearchResults:
			return {
				...state,
				...mergeTickets(state, action, stops),
				isFetching: false,
				stop: action.stop,
				ticketsCount: state.ticketsCount + action.ticketsCount,
			};
		case actionsTypes.isFetchingOn:
			return {
				...state,
				isFetching: true,
			};
		default:
			return state;
	}
}

export default reduceTickets;

function mergeTickets(state, action, stops) {
	const result = {};

	for (let i = 0; i <= stops; i++) {
		const key = `tickets${i}Stops`;
		result[key] = [...state[key], ...action[key]];
	}

	return result;
}
