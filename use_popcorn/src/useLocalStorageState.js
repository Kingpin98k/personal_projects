import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
	const [value, setValue] = useState(function () {
		const storedValue = localStorage.getItem(key);
		if (storedValue) return JSON.parse(storedValue);
		else return initialState;
	});
	useEffect(
		function () {
			//watched has alredady been updated
			localStorage.setItem(key, JSON.stringify(value));
		},
		[value, key]
	);
	return [value, setValue];
}
