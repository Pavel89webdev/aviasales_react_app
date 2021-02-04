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
				searchResult: action.searchResult,
				isFetching: false,
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
