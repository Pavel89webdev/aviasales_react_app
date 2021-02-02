const actions = {
	changeSortId: (id = 1) => ({
		type: "CHANGE_SORT_ID",
		sortId: id,
	}),
	changeFilterId: (id = 1) => ({
		type: "CHANGE_FILTER_ID",
		filterId: id,
	}),
};

export default actions;
