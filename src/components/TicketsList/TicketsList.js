import React, { useState } from "react";
import { connect } from "react-redux";

import actions from "../../services/actions";

import TicketItem from "../TicketItem";
import NextResultsButton from "../NextResultsButton";
import NoResultMessage from "../NoResultMessage";

import classes from "./TicketsList.module.sass";

function TicketsList({ tickets, sortById, activeFilterId }) {
	const [itemsToshow, addItems] = useState(3);

	const renderTickets = applyFilters(tickets, activeFilterId);
	const sortList = sortTickets(renderTickets, sortById);
	const ticketItemsList = sortList.reduce((acc, ticket, index) => {
		if (index < itemsToshow) {
			const key =
				ticket.price +
				ticket.carrier +
				ticket.segments[0].date +
				ticket.segments[1].date +
				index;
			return [...acc, <TicketItem ticket={ticket} key={key} />];
		}
		return acc;
	}, []);

	return (
		<ul className={classes.list}>
			{ticketItemsList.length ? ticketItemsList : <NoResultMessage />}
			<li>
				<NextResultsButton
					onAddItems={() => {
						addItems(itemsToshow + 5);
					}}
				/>
			</li>
		</ul>
	);
}

const mapStateToProps = (state) => {
	return {
		tickets: [
			state.tickets0Stops,
			state.tickets1Stops,
			state.tickets2Stops,
			state.tickets3Stops,
		],
		sortById: state.sortById,
		activeFilterId: state.activeFilterId,
	};
};

export default connect(mapStateToProps, actions)(TicketsList);

function applyFilters(tickets, activeFilterId) {
	let renderTickets = [];

	if (activeFilterId.includes(1)) {
		tickets.forEach((ticketArr) => renderTickets.push(...ticketArr));
		return renderTickets;
	}

	if (activeFilterId.includes(2)) {
		renderTickets.push(...tickets[0]);
	}

	if (activeFilterId.includes(3)) {
		renderTickets.push(...tickets[1]);
	}

	if (activeFilterId.includes(4)) {
		renderTickets.push(...tickets[2]);
	}

	if (activeFilterId.includes(5)) {
		renderTickets.push(...tickets[3]);
	}
	return renderTickets;
}

function sortTickets(items, sortId) {
	let sortList = null;
	if (items && sortId === 1) {
		sortList = items.sort((a, b) => a.price - b.price);
	}

	if (items && sortId === 2) {
		sortList = items.sort(
			(a, b) =>
				a.segments[0].duration +
				a.segments[1].duration -
				(b.segments[0].duration + b.segments[1].duration)
		);
	}

	if (items && sortId === 3) {
		sortList = items.sort(
			(a, b) =>
				a.segments[0].duration +
				a.segments[1].duration +
				a.price -
				(b.segments[0].duration + b.segments[1].duration + b.price)
		);
	}
	return sortList;
}
