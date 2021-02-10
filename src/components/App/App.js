import React from "react";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import reduceFilters from "../../services/reduceFilters";
import reduceSort from "../../services/reduceSort";
import reduceTickets from "../../services/reduceTickets";

import actionsCreators from "../../services/actionsCreators";

import SearchService from "../../services/SearchService";

import FilterBar from "../FilterBar";
import SortBar from "../SortBar";
import TicketsList from "../TicketsList";
import LoadingBar from "../LoadingBar";
import filters from "../filters";
import sortTabs from "../sortTabs";

import classes from "./App.module.sass";

// redux dev tools setup:
const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;

const allFiltersOn = () =>
	filters.reduce((acc, filter) => {
		acc[`${filter.id}`] = true;
		return acc;
	}, {});

const activeFilterId = allFiltersOn();
const sortById = sortTabs[0].id;

const initialState = {
	activeFilterId,
	sortById,
	tickets: {
		isFetching: false,
		tickets0Stops: [],
		tickets1Stops: [],
		tickets2Stops: [],
		tickets3Stops: [],
		ticketsCount: 0,
		stop: false,
	},
};

const store = createStore(
	combineReducers({
		activeFilterId: reduceFilters,
		sortById: reduceSort,
		tickets: reduceTickets,
	}),
	initialState,
	composeEnhancers(applyMiddleware(reduxThunk))
);

const searchService = new SearchService();
searchService.getSearchId();

store.dispatch((dispatch) => {
	actionsCreators.getSearchResults(dispatch, searchService);
});

function App() {
	return (
		<Provider store={store}>
			<main className={classes.main}>
				<div className={classes.container}>
					<div className={classes.logo}>
						<img
							src={`${process.env.PUBLIC_URL}img/Logo.svg`}
							alt="aviasales logo"
						/>
					</div>
				</div>
				<LoadingBar />
				<div className={classes.container}>
					<div className={classes.content}>
						<FilterBar />
						<div>
							<SortBar />
							<TicketsList />
						</div>
					</div>
				</div>
			</main>
		</Provider>
	);
}

export default App;
