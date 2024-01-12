import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//Creating the main component
function App() {
	return (
		<div className="card">
			<Avatar img="/author_image.jpeg" name="Developer" />
			<div className="data">
				<Intro name="MERN Stack Developer" />
				<SkillList
					skills={[
						"Java/1",
						"Javascript/1",
						"C++/1",
						"Node.js/1",
						"MongoDB/1",
						"React.js/2",
						"Next.js/2",
					]}
				/>
			</div>
		</div>
	);
}

function Avatar(props) {
	return <img src={props.img} alt={props.name} />;
}

function Intro(props) {
	return (
		<div>
			<h1>{props.name}</h1>
			<p>
				Full-stack web developer and teacher at Harvard. When not coding or
				preparing a cours, I like to play badminton, to cook and eat, or to just
				enjoy the Indian sun at the horizon.
			</p>
		</div>
	);
}

function SkillList(props) {
	return (
		<ul>
			{props.skills.map((element) => {
				return (
					<li key={element} style={{ backgroundColor: getRandomColor() }}>
						{element.split("/")[0]}{" "}
						{parseInt(element.split("/")[1], 10) === 1 ? "💪" : "😑"}
					</li>
				);
			})}
		</ul>
	);
}

function getRandomColor() {
	const letters = "0123456789ABCDEF"; // Hexadecimal characters
	let color = "#"; // Initialize with a "#" for a valid hex color

	// Generate random values for the red, green, and blue components
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]; // Randomly select a character
	}

	return color; // Return the random color in hex format (e.g., "#RRGGBB")
}

//Rendering the app component to the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));

//Before react 18
//ReactDOM.render(<App />, getElementByID..)

//This is the JSX way <App /> of rendering
root.render(
	//THe react "strict mode" does 2 jobs
	//1. Renders acomponents twice to find bugs
	//2. Check for any outdated react api
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
