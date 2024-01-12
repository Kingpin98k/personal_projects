import { useState } from "react";

export default function Form({ onAddItem }) {
	//State for the input field
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	//Function to handle the submit event
	function handleSubmit(e) {
		e.preventDefault();
		if (!description) return;
		const newItem = { description, quantity, package: false, id: Date.now() };
		//Passing the newItem to the onAddItem function
		onAddItem(newItem);
		setDescription("");
		setQuantity(1);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your 😎 trip ?</h3>
			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))} //Number() converts the string to a number
			>
				{/* Array.from() creates an array from an array-like object */}
				{/* This is to show the numbers from 1 to 20 in the dropdown */}
				{/* The map function is used to iterate over the array and return a new array */}
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={description}
				//Each time that we type anything we are changing the state of description which in turn is changing the state of the input field
				onChange={(e) => setDescription(e.target.value)}
			></input>
			<button>Add</button>
		</form>
	);
}
