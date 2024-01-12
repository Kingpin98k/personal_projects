import { useQuiz } from "../contexts/QuizContext";

function FinishedScreen() {
	//Everywhere we use the custom-context-hook to get the context values
	const { points, maxPossiblePoints, highScore, dispatch } = useQuiz();

	const percentage = (points / maxPossiblePoints) * 100;
	return (
		<>
			<p className="result">
				You Scored <strong>{points}</strong> out of {maxPossiblePoints} (
				{Math.ceil(percentage)}%)
			</p>
			<p className="highscore">(Highscore: {highScore} points)</p>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "reset" })}
			>
				Restart
			</button>
		</>
	);
}

export default FinishedScreen;
