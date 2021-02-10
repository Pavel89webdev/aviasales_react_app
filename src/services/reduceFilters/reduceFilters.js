import actionTypes from "../actionsTypes";
import filterChecker from "../filterChecker";

function reduceFilters(state = null, action) {
	switch (action.type) {
		case actionTypes.changeFilterId:
			return filterChecker(state, action.filterId);
		default:
			return state;
	}
}

export default reduceFilters;
