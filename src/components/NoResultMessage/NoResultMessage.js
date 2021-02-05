import React from "react";
import classes from "./NoResultMessage.module.sass";

function NoResultMessage() {
	return (
		<div className={classes.item}>
			<p className={classes.title}>
				Рейсов, подходящих под заданные фильтры, не найдено
			</p>
		</div>
	);
}

export default NoResultMessage;
