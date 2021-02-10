import React from "react";

import classes from "./TicketItem.module.sass";
import s7Logo from "../../img/S7-logo.svg";

function TicketItem({ ticket }) {
	const price = ticket.price + " р.";

	const forwardWay = getTicketDescription(ticket.segments[0]);
	const backWay = getTicketDescription(ticket.segments[1]);

	return (
		<li>
			<div className={classes.item}>
				<div className={classes.title}>
					<p className={classes.price}>{price}</p>
					<img src={s7Logo} alt="логотип компании" />
				</div>
				<div className={classes.description}>
					<div>
						<p className={classes["description-title"]}>
							{forwardWay.fromTo}
						</p>
						<p className={classes["description-text"]}>
							{forwardWay.departureTime} –{" "}
							{forwardWay.arraivalTime}
						</p>
					</div>
					<div>
						<p className={classes["description-title"]}>В пути</p>
						<p className={classes["description-text"]}>
							{forwardWay.duration}
						</p>
					</div>
					<div>
						<p className={classes["description-title"]}>
							{forwardWay.stopsCount}
						</p>
						<p className={classes["description-text"]}>
							{forwardWay.renderStops}
						</p>
					</div>
				</div>
				<div className={classes.description}>
					<div>
						<p className={classes["description-title"]}>
							{backWay.fromTo}
						</p>
						<p className={classes["description-text"]}>
							{backWay.departureTime} – {backWay.arraivalTime}
						</p>
					</div>
					<div>
						<p className={classes["description-title"]}>В пути</p>
						<p className={classes["description-text"]}>
							{backWay.duration}
						</p>
					</div>
					<div>
						<p className={classes["description-title"]}>
							{backWay.stopsCount}
						</p>
						<p className={classes["description-text"]}>
							{backWay.renderStops}
						</p>
					</div>
				</div>
			</div>
		</li>
	);
}

function addZero(a) {
	if (+a < 10) {
		return "0" + a;
	}
	return a;
}

function getTicketDescription(segment) {
	const fromTo = segment.origin + " - " + segment.destination;

	const durationForwardWay = segment.duration;
	const hoursForwardWay = Math.floor(durationForwardWay / 60);
	const minutesForwardWay = durationForwardWay - hoursForwardWay * 60;
	const duration =
		addZero(hoursForwardWay) + "ч " + addZero(minutesForwardWay) + "м ";

	const startDate = new Date(segment.date);
	const departureTime =
		addZero(startDate.getUTCHours()) +
		":" +
		addZero(startDate.getUTCMinutes());
	const arraivalTimeData = new Date(
		+Date.parse(startDate) + durationForwardWay * 60 * 1000
	);
	const arraivalTime =
		addZero(arraivalTimeData.getUTCHours()) +
		":" +
		addZero(arraivalTimeData.getUTCMinutes());

	const stops = segment.stops;
	const renderStops = stops.join(", ");
	let stopsCount = stops.length;
	if (stopsCount === 0) {
		stopsCount = "без пересадок";
	}
	if (stopsCount === 1) {
		stopsCount = "1 пересадка";
	}
	if (stopsCount > 1) {
		stopsCount = `${stopsCount} пересадки`;
	}

	const description = {
		fromTo,
		duration,
		departureTime,
		arraivalTime,
		renderStops,
		stopsCount,
	};

	return description;
}

export default TicketItem;
