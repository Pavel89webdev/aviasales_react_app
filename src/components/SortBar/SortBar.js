import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import actionsCreators from "../../services/actionsCreators";
import sortTabs from "../sortTabs";

import classes from "./SortBar.module.sass";

function SortBar({ activeTab, changeSortId }) {
	const tabs = () => {
		return sortTabs.map((tab) => {
			const currentClass = classNames(
				classes.tab,
				activeTab === tab.id && classes.active
			);

			return (
				<button
					className={currentClass}
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
