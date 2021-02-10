import React, { useState, useMemo } from "react";
import { connect } from "react-redux";

import actionsCreators from "../../services/actionsCreators";
import filters from "../filters";
import sortTabs from "../sortTabs";

import TicketItem from "../TicketItem";
import NextResultsButton from "../NextResultsButton";
import NoResultMessage from "../NoResultMessage";

import classes from "./TicketsList.module.sass";

function TicketsList({ tickets, sortById, activeFilterId }) {
	const [itemsToshow, addItems] = useState(5);

	const renderTickets = useMemo(() => applyFilters(tickets, activeFilterId), [
		tickets,
		activeFilterId,
	]);

	const sortList = useMemo(() => sortTickets(renderTickets, sortById), [
		renderTickets,
		sortById,
	]);

	const ticketItemsList = sortList.reduce((acc, ticket, index) => {
		if (index < itemsToshow) {
			const key =
				ticket.price +
				ticket.carrier +
				ticket.segments[0].date +
				ticket.segments[1].date;
			return [...acc, <TicketItem ticket={ticket} key={key} />];
		}
		return acc;
	}, []);

	return (
		<ul className={classes.list}>
			{ticketItemsList.length ? ticketItemsList : <NoResultMessage />}
			{ticketItemsList.length ? (
				<li>
					<NextResultsButton
						onAddItems={() => {
							addItems(itemsToshow + 5);
						}}
					/>
				</li>
			) : null}
		</ul>
	);
}

const mapStateToProps = (state) => {
	return {
		tickets: [
			state.tickets.tickets0Stops,
			state.tickets.tickets1Stops,
			state.tickets.tickets2Stops,
			state.tickets.tickets3Stops,
		],
		sortById: state.sortById,
		activeFilterId: state.activeFilterId,
	};
};

export default connect(mapStateToProps, actionsCreators)(TicketsList);

function applyFilters(tickets, activeFilterId) {
	let renderTickets = [];

	if (activeFilterId[filters[0].id]) {
		tickets.forEach((ticketArr) => renderTickets.push(...ticketArr));
		return renderTickets;
	}

	renderTickets = tickets.reduce((acc, tiketsArr, index) => {
		if (activeFilterId[filters[++index].id]) {
			acc.push(...tiketsArr);
		}
		return acc;
	}, renderTickets);

	return renderTickets;
}

function sortTickets(items, sortId) {
	let sortList = null;
	if (items && sortId === sortTabs[0].id) {
		sortList = items.sort((a, b) => a.price - b.price);
	}

	if (items && sortId === sortTabs[1].id) {
		sortList = items.sort(
			(a, b) =>
				a.segments[0].duration +
				a.segments[1].duration -
				(b.segments[0].duration + b.segments[1].duration)
		);
	}

	if (items && sortId === sortTabs[2].id) {
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
