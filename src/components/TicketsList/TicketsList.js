import React from "react";
import { connect } from "react-redux";
import { v4 } from "uuid";

import actions from "../../services/actions";

import TicketItem from "../TicketItem";
import NextResultsButton from "../NextResultsButton";

import classes from "./TicketsList.module.sass";

function TicketsList({ tickets }) {
	let ticketsItems = null;

	if (tickets) {
		ticketsItems = tickets.map((ticket) => (
			<li key={v4()}>
				<TicketItem ticket={ticket} />
			</li>
		));
	}

	return (
		<ul className={classes.list}>
			{ticketsItems}
			<li>
				<NextResultsButton />
			</li>
		</ul>
	);
}

const mapStateToProps = (state) => {
	return {
		tickets: state.searchResult.tickets,
	};
};

export default connect(mapStateToProps, actions)(TicketsList);
