import React from "react";
import { connect } from "react-redux";

import classes from "./LoadingBar.module.sass";

const expectedTicketsCount = 10000;

function LoadingBar({ ticketsCount, stop }) {
	const loadingProgress = Math.floor(
		(ticketsCount / expectedTicketsCount) * 100
	);

	const right = stop ? 0 : 100 - loadingProgress;
	const renderClasses = [
		classes["loading-total"],
		stop ? classes.complete : null,
	].join(" ");

	return (
		<div className={classes["loading-bar"]}>
			<div className={renderClasses} style={{ right: `${right}%` }}>
				<div className={classes["loading-progress"]}></div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		stop: state.tickets.stop,
		ticketsCount: state.tickets.ticketsCount,
	};
};

export default connect(mapStateToProps)(LoadingBar);
