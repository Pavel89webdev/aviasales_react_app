import React from "react";
import { connect } from "react-redux";
import actions from "../../services/actions";

import classes from "./FilterBar.module.sass";
import filters from "../filters";

function Filters({ filters, activeFilterId, changeFilterId }) {
	return filters.map((filter) => (
		<li className={classes["list-item"]} key={filter.id}>
			<input
				checked={activeFilterId.includes(filter.id) ? true : false}
				type="checkbox"
				id={filter.id}
				className={classes.checkbox}
				onChange={() => {
					changeFilterId(filter.id);
				}}
			/>
			<label htmlFor={filter.id} className={classes.label}>
				{filter.label}
			</label>
		</li>
	));
}

function FilterBar({ activeFilterId, changeFilterId }) {
	return (
		<div className={classes.wrapper}>
			<div className={classes["filter-bar"]}>
				<div className={classes.title}>Количество пересадок</div>
				<form action="#" className={classes["filter-form"]}>
					<ul className={classes.list}>
						<Filters
							filters={filters}
							activeFilterId={activeFilterId}
							changeFilterId={changeFilterId}
						/>
					</ul>
				</form>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		activeFilterId: state.activeFilterId,
	};
};

export default connect(mapStateToProps, actions)(FilterBar);
