export default function Item({ item, handleDeleteItem, handleToggleItem }) {
	return (
		<li>
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => handleToggleItem(item.id)}
			/>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button
				//we cannot directly do { handleDeleteItem } since react will automatically pass event object instead of the id as an argument
				//we cannot do handleDeleteItem(item.id) since this will directly call the function
				onClick={() => {
					handleDeleteItem(item.id);
				}}
			>
				❌
			</button>
		</li>
	);
}
