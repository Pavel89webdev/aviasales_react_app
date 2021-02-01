import React from "react";

import TicketItem from "../TicketItem";
import NextResultsButton from "../NextResultsButton";

import classes from "./TicketsList.module.sass";

function TicketsList() {
	return (
		<ul className={classes.list}>
			<li>
				<TicketItem />
			</li>
			<li>
				<TicketItem />
			</li>
			<li>
				<TicketItem />
			</li>
			<li>
				<NextResultsButton />
			</li>
		</ul>
	);
}

export default TicketsList;
