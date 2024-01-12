function FinishedScreen({ points, maxPossiblePoints, highScore, dispatch }) {
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
