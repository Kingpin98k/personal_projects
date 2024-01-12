import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import "./App.css";

function App() {
	//List of items
	const [items, setItems] = useState([]);

	//Add item to list
	function handleAddItem(item) {
		setItems((items) => [...items, item]); //spread operator
	}

	//Delete item from list
	function handleDeleteItem(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	//Toggle item from list
	function handleToggleItem(id) {
		setItems((items) =>
			items.map((item) =>
				//if item.id === id, then return item, else return item
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}

	function clearAll() {
		setItems([]);
	}

	return (
		<div className="app">
			<Logo />
			<Form onAddItem={handleAddItem} />
			<PackingList
				itemList={items}
				handleDeleteItem={handleDeleteItem}
				handleToggleItem={handleToggleItem}
				clearAll={clearAll}
			/>
			<Stats items={items} />
		</div>
	);
}

export default App;
