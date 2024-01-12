import { useState } from "react";
import Item from "./Item";
export default function PackingList({
	itemList,
	handleDeleteItem,
	handleToggleItem,
	clearAll,
}) {
	const [sortBy, setSortBy] = useState("");

	function setValue(e) {
		setSortBy((sb) => e.target.value);
	}

	let newList = itemList;

	if (sortBy === "input") {
		newList = itemList.sort((a, b) => (a.id > b.id ? 1 : -1));
	} else if (sortBy === "description") {
		newList = itemList.sort((a, b) => (a.description > b.description ? 1 : -1));
	} else if (sortBy === "packed") {
		newList = itemList.sort((a, b) => (a.packed ? -1 : 1));
	}

	return (
		<div className="list">
			<ul>
				{newList.map((item) => {
					return (
						<Item
							item={item}
							key={item.id}
							handleDeleteItem={handleDeleteItem}
							handleToggleItem={handleToggleItem}
						/>
					);
				})}
			</ul>
			<div className="actions">
				<select onChange={setValue}>
					<option value="input">Sort by input order</option>
					<option value="description">Sort by description</option>
					<option value="packed">Sort by packed status</option>
				</select>
				<button onClick={clearAll}>Clear List</button>
			</div>
		</div>
	);
}
