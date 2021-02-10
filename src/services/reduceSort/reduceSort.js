import actionsTypes from "../actionsTypes";

function reduceSort(state = null, action) {
	switch (action.type) {
		case actionsTypes.changeSortId:
			return action.sortId;
		default:
			return state;
	}
}

export default reduceSort;
