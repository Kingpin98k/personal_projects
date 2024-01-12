import { useEffect, useState } from "react";
const KEY = "b044c3f9";
export function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	useEffect(
		function () {
			const controller = new AbortController();

			async function fetchMovies() {
				try {
					setError("");
					setIsLoading(true);
					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
						//This
						{ signal: controller.signal }
					);

					if (!res.ok) {
						throw new Error("Something went wrong while fetching");
					}

					const data = await res.json();
					if (data.Response === "False") throw new Error("Movie Not Found");
					setMovies(data.Search);
					// //Stale state as the movies will only be updated after component render
					// console.log(data);
					// //Updated info
					// console.log(data.Search);
					setError("");
				} catch (err) {
					if (err.name !== "AbortError") {
						setError(err.message);
					}
				} finally {
					setIsLoading(false);
				}
			}
			if (query.length < 3) {
				setMovies([]);
				setError("");
				return;
			}
			fetchMovies();

			//Cleanup function to clean feth requests
			return function () {
				controller.abort();
			};
		},
		[query]
	);

	return { movies, isLoading, error };
}
