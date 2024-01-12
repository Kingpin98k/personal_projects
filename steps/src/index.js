import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import data from "./data.js";

function App() {
	return (
		<>
			<Card />
			<Card />
		</>
	);
}

function Card() {
	const [step, setStep] = useState(0);
	const [open, setOpen] = useState(true);
	function handleForward() {
		setStep((s) => {
			return (s + 1) % 4;
		});
	}

	function handlePrevious() {
		setStep((s) => {
			return (s - 1 + 4) % 4;
		});
	}
	return (
		<div className="card_container">
			<button className="close" onClick={() => setOpen((o) => !o)}>
				&times;
			</button>
			{open && (
				<div class="carousel">
					<Testimonial dataObj={data[step]} />
				</div>
			)}
		</div>
	);
}

function Testimonial({ dataObj }) {
	return (
		<>
			<img src="author_image.jpeg" alt="My" />
			<blockquote class="testimonial">
				<p class="testimonial-text">{dataObj.testimonial.text}</p>
				<p class="testimonial-author">{dataObj.testimonial.author}</p>
				<p class="testimmonial-job">{dataObj.testimonial.job}</p>
			</blockquote>
		</>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
