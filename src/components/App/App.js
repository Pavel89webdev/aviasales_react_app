import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import reducer from "../../services/reducer";

import actions from "../../services/actions";

import SearchService from "../../services/SearchService";

import FilterBar from "../FilterBar";
import SortBar from "../SortBar";
import TicketsList from "../TicketsList";
import LoadingBar from "../LoadingBar";

import classes from "./App.module.sass";

// redux dev tools setup:
const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;

const initialState = {
	activeFilterId: [1, 2, 3, 4, 5],
	sortById: 1,
	isFetching: false,
	tickets0Stops: [],
	tickets1Stops: [],
	tickets2Stops: [],
	tickets3Stops: [],
	ticketsCount: 0,
	loadingProgress: 1,
	stop: false,
};

const store = createStore(
	reducer,
	initialState,
	composeEnhancers(applyMiddleware(reduxThunk))
);

const searchService = new SearchService();
searchService.getSearchId();

store.dispatch((dispatch) => {
	actions.getSearchResults(dispatch, searchService);
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
