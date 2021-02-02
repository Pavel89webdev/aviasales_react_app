import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../../services/reducer";

import FilterBar from "../FilterBar";
import SortBar from "../SortBar";
import TicketsList from "../TicketsList";

import classes from "./App.module.sass";

const initialState = {
	activeFilterId: [],
	sortById: 1,
};

const store = createStore(reducer, initialState);

function App() {
	console.log(store.getState());
	return (
		<Provider store={store}>
			<main className={classes.container}>
				<div className={classes.logo}>
					<img
						src={`${process.env.PUBLIC_URL}img/Logo.svg`}
						alt="aviasales logo"
					/>
				</div>
				<div className={classes.content}>
					<FilterBar />
					<div>
						<SortBar />
						<TicketsList />
					</div>
				</div>
			</main>
		</Provider>
	);
}

export default App;
