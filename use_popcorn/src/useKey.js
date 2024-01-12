import { useEffect } from "react";

export function useKey(key, action) {
	useEffect(
		function () {
			function callback(e) {
				if (e.code === key) {
					action();
				}
			}
			document.addEventListener("keydown", callback);
			//Each time the component unmouts we need to clean the old event listners
			return function () {
				document.removeEventListener("keydown", callback);
			};
		},
		[action, key]
	);
}
