import { createContext, useContext, useEffect, useReducer } from "react";

//THis is the quizcontext
const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

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

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...state, status: "ready", questions: action.payload };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		//A complex state updating logic
		case "newAnswer":
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
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

//This is the context values provider component
//Or the parent component which will provide the context values to all the children
function QuizProvider({ children }) {
	//Since we are using reducer we will be getting our state from the reducer
	const [
		{ questions, status, index, answer, points, highScore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState);
	const numQuestions = questions.length;

	//calculating the max possible points
	//This is also an indirect state value
	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0
	);

	//This is to fetch the data when the app loads
	useEffect(function () {
		fetch("http://localhost:9999/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);

	return (
		//THis is where we will be providing the context values(states)
		<QuizContext.Provider
			value={{
				questions,
				numQuestions,
				maxPossiblePoints,
				status,
				index,
				answer,
				points,
				highScore,
				secondsRemaining,
				dispatch,
			}}
			//These values will be available to subscribing components to use throughout the app
		>
			{children}
		</QuizContext.Provider>
	);
}

//This is a custom hook that fetches the context values from the contextApi and gives back to the element to use
//This also will not work if used in a children component outside the context provider
function useQuiz() {
	const context = useContext(QuizContext);
	if (!context) throw new Error("Context being used outside of scope...");
	return context;
}

export { QuizProvider, useQuiz };
