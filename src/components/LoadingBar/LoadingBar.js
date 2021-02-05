import React from "react";
import { connect } from "react-redux";

import classes from "./LoadingBar.module.sass";

function LoadingBar({ loadingProgress, stop }) {
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
		loadingProgress: state.loadingProgress,
		stop: state.stop,
	};
};

export default connect(mapStateToProps)(LoadingBar);
