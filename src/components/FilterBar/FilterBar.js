import React from "react";

import classes from "./FilterBar.module.sass";
import filters from "../filters";

function Filters({ filters }) {
	return filters.map((filter) => (
		<li className={classes["list-item"]} key={filter.id}>
			<input
				type="checkbox"
				id={filter.id}
				className={classes.checkbox}
			/>
			<label htmlFor={filter.id} className={classes.label}>
				{filter.label}
			</label>
		</li>
	));
}

function FilterBar() {
	return (
		<div className={classes.wrapper}>
			<div className={classes["filter-bar"]}>
				<div className={classes.title}>Количество пересадок</div>
				<form action="#" className={classes["filter-form"]}>
					<ul className={classes.list}>
						<Filters filters={filters} />
					</ul>
				</form>
			</div>
		</div>
	);
}

export default FilterBar;
