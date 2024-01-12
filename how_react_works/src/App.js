import React, { useState, useEffect } from "react";

const ChildComponent = ({ count }) => {
	useEffect(() => {
		console.log("ChildComponent rendered.");
		return () => {
			console.log("ChildComponent will unmount.");
		};
	}, [count]);

	console.log("ChildComponent is re-rendered.");

	return <p>ChildComponent</p>;
};

const SiblingComponent1 = ({ count }) => {
	useEffect(() => {
		console.log("SiblingComponent1 rendered.");
		return () => {
			console.log("SiblingComponent1 will unmount.");
		};
	}, [count]);

	console.log("SiblingComponent1 is re-rendered.");

	return <p>SiblingComponent1</p>;
};

const SiblingComponent2 = ({ count }) => {
	useEffect(() => {
		console.log("SiblingComponent2 rendered.");
		return () => {
			console.log("SiblingComponent2 will unmount.");
		};
	}, [count]);

	console.log("SiblingComponent2 is re-rendered.");

	return <p>SiblingComponent2</p>;
};

const App = () => {
	const [count, setCount] = useState(0);

	const increment = () => setCount(count + 1);

	return (
		<div>
			<h1>Render Tracking App</h1>
			<button onClick={increment}>Increment Count</button>
			<ChildComponent count={count} />
			<SiblingComponent1 count={count} />
			<SiblingComponent2 count={count} />
		</div>
	);
};

export default App;
