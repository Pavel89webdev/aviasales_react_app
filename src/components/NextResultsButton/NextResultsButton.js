import React from "react";

import classes from "./NextResultsButton.module.sass";

function NextResultsButton({ onAddItems }) {
	return (
		<button className={classes.button} onClick={onAddItems}>
			Показать еще 5 билетов!
		</button>
	);
}

export default NextResultsButton;
