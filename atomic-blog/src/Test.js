import { useState } from "react";

function SlowComponent() {
	// If this is too slow on your maching, reduce the `length`
	const words = Array.from({ length: 100_000 }, () => "WORD");
	return (
		<ul>
			{words.map((word, i) => (
				<li key={i}>
					{i}: {word}
				</li>
			))}
		</ul>
	);
}

//Original Code - that rerenders the whole children
// export default function Test() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <h1>Slow counter?!?</h1>
//       <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
//       <SlowComponent />
//     </div>
//   );
// }

function Counter({ children }) {
	const [count, setCount] = useState(0);
	return (
		<div>
			<h1>Slow counter?!?</h1>
			<button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
			{/*Now react will no longer re-render the children */}
			{children}
		</div>
	);
}

export default function Test() {
	return (
		<Counter>
			{/*React will first create the SlowComponent and then pass it as a children to the Counter
			 */}
			<SlowComponent />
		</Counter>
	);
}
