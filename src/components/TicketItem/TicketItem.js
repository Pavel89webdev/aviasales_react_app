import React from "react";

import classes from "./TicketItem.module.sass";

function TicketItem() {
	return (
		<div className={classes.item}>
			<div className={classes.title}>
				<p className={classes.price}>13400 р.</p>
				<img src="/img/S7-logo.svg" alt="логотип компании" />
			</div>
			<div className={classes.description}>
				<div>
					<p className={classes["description-title"]}>MOW – HKT</p>
					<p className={classes["description-text"]}>10:45 – 08:00</p>
				</div>
				<div>
					<p className={classes["description-title"]}>В пути</p>
					<p className={classes["description-text"]}>21ч 15м</p>
				</div>
				<div>
					<p className={classes["description-title"]}>2 пересадки</p>
					<p className={classes["description-text"]}>HKG, JNB</p>
				</div>
			</div>
			<div className={classes.description}>
				<div>
					<p className={classes["description-title"]}>MOW – HKT</p>
					<p className={classes["description-text"]}>11:20 – 00:50</p>
				</div>
				<div>
					<p className={classes["description-title"]}>В пути</p>
					<p className={classes["description-text"]}>13ч 30м</p>
				</div>
				<div>
					<p className={classes["description-title"]}>1 пересадка</p>
					<p className={classes["description-text"]}>HKG</p>
				</div>
			</div>
		</div>
	);
}

export default TicketItem;
