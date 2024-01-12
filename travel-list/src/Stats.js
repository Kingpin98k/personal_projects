export default function Stats({ items }) {
	if (!items.length)
		return (
			<p className="stats">
				<em>Start adding some items to your list !🎒🛍️</em>
			</p>
		);

	//variable depend on the prop state
	const numItems = items.length;
	const numPacked = items.filter((item) => item.packed).length;
	const precentagePacked = Math.round((numPacked / numItems) * 100);
	return (
		<footer className="stats">
			<em>
				{precentagePacked === 100
					? "You got everything ready to go ✈️"
					: `🎒 You have ${numItems} items on your list, and you already packed ${numPacked}
				      (${precentagePacked}%)`}
			</em>
		</footer>
	);
}
