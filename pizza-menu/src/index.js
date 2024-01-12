//Importing required modules
import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import pizzaData from "./data.js";
import ReactSwipeButton from "react-swipe-button";

//Creatinng the App component
function App() {
	return (
		//Wrapping into div since react components can only return a single element

		// !!We hould always use className instead of class in JSX as class is already a reserved keyword in JS
		<div className="container">
			<Header />
			<Menu />
			<Footer />
			<ReactSwipeButton text="SWIPE TO UNLOCK" color="#f00" />
		</div>
	);
}
//------------------------------------------------------------------
//Creating a new Component

function Header() {
	return (
		<header className="header">
			<h1>My Pizza Co.</h1>
		</header>
	);
}

function Footer() {
	//we can freely write js inside of functions and use these inside jsx
	const hour = new Date().getHours();
	const is_open = hour >= 0 && hour <= 22;

	return (
		//We are doing conditional rendering here using short_circuiting
		//So the order button wiil only be visible during open hours
		<footer className="footer">{is_open && <Order />}</footer>
	);
}

function Order() {
	return (
		<div className="order">
			<p>We're open until 22:00. Come visit us or order online.</p>
			<button className="btn">Order</button>
		</div>
	);
}

function Menu() {
	return (
		<main className="menu">
			<h2>Our Menu</h2>

			<p>
				Authentic Italian cusine. 6 creative dishes to choose from. All from out
				stone oven, all organic, all delicious.
			</p>

			{/*This is how we define props for the pizza element*/}
			<ul className="pizzas">
				{pizzaData.map((pizza) => {
					return <Pizza pizzaObj={pizza} key={pizza.name} />;
				})}
			</ul>
		</main>
	);
}

//The component function should start with Capital letter
//The function must return a markup
function Pizza(props) {
	return (
		//The public folder is usually the root folder for static components in react app
		<li className={`pizza ${props.pizzaObj.soldOut ? "sold-out" : ""}`}>
			<img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
			<div>
				<h3>{props.pizzaObj.name}</h3>
				<p>{props.pizzaObj.ingredients}</p>
				<span>{props.pizzaObj.price}</span>
			</div>
		</li>
	);
}

//------------------------------------------------------------------

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
