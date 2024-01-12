import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizContext";

function App() {
	//Here we are using the quiz context to get the status of the quiz
	const { status } = useQuiz();

	//THis is the main component that renders the whole app
	return (
		<div className="app">
			{/* The header will not change throughout the app */}
			<Header />
			<Main>
				{/* status has 4-states and each state renders a different component */}
				{status === "loading" && <Loader />} {/* This is the loader */}
				{status === "error" && <Error />} {/* This is the error */}
				{status === "ready" && <StartScreen />} {/* This is the start screen */}
				{status === "active" && (
					//The prop drilling problem has been taken care of by the context
					//Whenever a conntext changes the all the consumers are rerendered
					<>
						<Progress />
						<Question />
						<Footer>
							<Timer />
							<NextButton />
						</Footer>
					</>
				)}
				{status === "finished" && <FinishedScreen />}
			</Main>
		</div>
	);
}

export default App;
