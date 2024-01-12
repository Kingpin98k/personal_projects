function StartScreen({ numQuestions, dispatch }) {
	function handelStart() {
		dispatch({ type: "start" });
	}
	return (
		<div className="start">
			<h2>Welcome to the React Quiz!</h2>
			<h3>{numQuestions} questions to test your React mastry</h3>
			<button className="btn btn-ui" onClick={handelStart}>
				Let's Start
			</button>
		</div>
	);
}

export default StartScreen;
