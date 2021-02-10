import React from "react";
import { connect } from "react-redux";

import actionsCreators from "../../services/actionsCreators";
import sortTabs from "../sortTabs";

import classes from "./SortBar.module.sass";

function SortBar({ activeTab, changeSortId }) {
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
						changeSortId(tab.id);
					}}
					key={tab.id}>
					{tab.label}
				</button>
			);
		});
	};

	return <div className={classes.wrapper}>{tabs()}</div>;
}

const mapStateToProps = (state) => {
	return {
		activeTab: state.sortById,
	};
};

export default connect(mapStateToProps, actionsCreators)(SortBar);
