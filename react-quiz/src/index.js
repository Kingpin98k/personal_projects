import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { QuizProvider } from "./contexts/QuizContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
//This is where it all starts
root.render(
	<QuizProvider>
		<React.StrictMode>
			{/* This is the entry component */}
			<App />
		</React.StrictMode>
	</QuizProvider>
);
