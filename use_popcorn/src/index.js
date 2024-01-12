import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
		{/* <Test /> */}
	</React.StrictMode>
);

// function Test() {
// 	const [rating, setRating] = useState(0);
// 	//We are passing the setRating function as a prop to the star component
// 	return (
// 		<div>
// 			<StarRating
// 				onSetRating={setRating}
// 				size="60"
// 				maxRating={5}
// 				messages={["Terrible", "Bad", "Ok", "Good", "Amazing"]}
// 				defaultRating={3}
// 			/>
// 			<p>The Current movie is rated {rating}</p>
// 		</div>
// 	);
// }
