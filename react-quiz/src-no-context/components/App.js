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

const SECS_PER_QUESTION = 30;

//This is the initial state which will be altered based on the action type dispatched by diapatcher
//All the state variables are stored in one object
//Initially the status will be loading
const initialState = {
	questions: [],
	//'loading','error','redy','active','finished'
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
	secondsRemaining: null,
};

//This is the reducer function which will be called by the dispatcher to update the state
//The state is always the previous state
//action =>object {type: ,payload: }
function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			// initially there were no questions
			// on receiving questions status is updated to ready and questions are stored in the state
			// we need to use destructutring to update the state object
			return { ...state, status: "ready", questions: action.payload };
		case "dataFailed":
			// if there is an error in fetching the questions status is updated to error
			return { ...state, status: "error" };
		case "start":
			// when the quiz is started status is updated to active and the secondsRemaining is set to the total time
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		//A complex state updating logic
		//This is called when the user clicks on ny one of the options
		case "newAnswer":
			//This is needed to update points
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		//Every timme we go to the next question the answer resets to null
		case "nextQuestion":
			return { ...state, index: state.index + 1, answer: null };
		case "finish":
			return {
				...state,
				status: "finished",
				highScore:
					state.points > state.highScore ? state.points : state.highScore,
			};
		case "reset":
			return { ...state, index: 0, answer: null, points: 0, status: "ready" };

		//This is the timer it automatically updates the status to finished when the time is up
		case "tick":
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining <= 0 ? "finished" : state.status,
			};
		default:
			throw new Error("No matching state type !");
	}
}

function App() {
	//the useReducer hook returns the initial state and the dispatcher function
	const [
		//destructuring the initial state
		{ questions, status, index, answer, points, highScore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState);
	//on calling 'dispatcher' 'reducer' is called with the (current state object and the action object)

	//calculating the number of questions
	const numQuestions = questions.length;

	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0
	);

	useEffect(function () {
		fetch("http://localhost:9999/questions")
			.then((res) => res.json())
			//Change the state to ready and store the questions in the state
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			//Change the state to error
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);

	return (
		<div className="app">
			<Header />
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{/* Too much props passing going on... */}
				{status === "active" && (
					<>
						<Progress
							index={index + 1}
							numQuestions={numQuestions}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						/>
						<Footer>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
							<NextButton
								dispatch={dispatch}
								answer={answer}
								index={index}
								numQuestions={numQuestions}
							/>
						</Footer>
					</>
				)}
				{/* Too much props passing going on... */}
				{status === "finished" && (
					<FinishedScreen
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highScore={highScore}
						dispatch={dispatch}
					/>
				)}

				{/* Everything has been taken care of by Reducer now we need to fix prop drilling */}
			</Main>
		</div>
	);
}

export default App;
