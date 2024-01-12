import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
	const mins = Math.floor(secondsRemaining / 60);
	const seconds = secondsRemaining % 60;

	//This is setInterval whict will change the state every second
	useEffect(
		function () {
			const id = setInterval(function () {
				dispatch({ type: "tick" });
			}, 1000);
			return () => clearInterval(id);
		},
		[dispatch]
	);

	//This component will rerender again and again since the secondsRemaining is changing every second
	return (
		<div className="timer">
			{mins < 10 && "0"}
			{mins}:{seconds < 10 && "0"}
			{seconds}
		</div>
	);
}

export default Timer;
