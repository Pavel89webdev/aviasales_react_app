import React, { useState } from "react";

import sortTabs from "../sortTabs";

import classes from "./SortBar.module.sass";

function SortBar() {
	const [activeTab, setActiveTab] = useState(1);

	const tabs = () => {
		return sortTabs.map((tab) => {
			const classNames =
				activeTab === tab.id
					? [classes.tab, classes.active].join(" ")
					: classes.tab;

			return (
				<button
					className={classNames}
					onClick={() => {
						setActiveTab(tab.id);
					}}
					key={tab.id}>
					{tab.label}
				</button>
			);
		});
	};

	return <div className={classes.wrapper}>{tabs()}</div>;
}

export default SortBar;
