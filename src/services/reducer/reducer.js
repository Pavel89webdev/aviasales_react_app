import actions from "../actions";
import filterChecker from "../filterChecker";

function reducer(state, action) {
	switch (action.type) {
		case actions.changeSortId().type:
			return { ...state, sortById: action.sortId };
		case actions.changeFilterId().type:
			return {
				...state,
				activeFilterId: filterChecker(
					state.activeFilterId,
					action.filterId
				),
			};
		case "GET_SEARCH_RESULTS":
			return {
				...state,
				tickets0Stops: [
					...state.tickets0Stops,
					...action.tickets0Stops,
				],
				tickets1Stops: [
					...state.tickets1Stops,
					...action.tickets1Stops,
				],
				tickets2Stops: [
					...state.tickets2Stops,
					...action.tickets2Stops,
				],
				tickets3Stops: [
					...state.tickets3Stops,
					...action.tickets3Stops,
				],
				isFetching: false,
				stop: action.stop,
				ticketsCount: state.ticketsCount + action.ticketsCount,
				loadingProgress: action.stop
					? 100
					: Math.floor(
							((state.ticketsCount + action.ticketsCount) /
								10000) *
								100
					  ),
			};
		case actions.isFetchingOn().type:
			return {
				...state,
				isFetching: true,
			};
		default:
			return state;
	}
}

export default reducer;
