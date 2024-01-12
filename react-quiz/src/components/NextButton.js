import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
	const { dispatch, answer, index, numQuestions } = useQuiz();

	if (answer === null) return null;

	console.log(answer);
	//This is to render the 'next' and the 'finish' buttons seperately
	if (index < numQuestions - 1)
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "nextQuestion" })}
			>
				Next
			</button>
		);
	if (index === numQuestions - 1)
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "finish" })}
			>
				Finish
			</button>
		);
}

export default NextButton;
