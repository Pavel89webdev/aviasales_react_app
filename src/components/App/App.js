import React from "react";

import FilterBar from "../FilterBar";
import SortBar from "../SortBar";
import TicketsList from "../TicketsList";

import classes from "./App.module.sass";

function App() {
	return (
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
	);
}

export default App;
