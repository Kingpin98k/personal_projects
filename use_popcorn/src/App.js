import { useEffect, useRef, useState } from "react";
import StraRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";
const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

//-----------------------------------------------------------------------------------------
function Logo() {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function Search({ query, setQuery }) {
	const inputEl = useRef(null);

	useKey("Enter", function () {
		//Checking if the input field is currently actve
		if (document.activeElement === inputEl.current) return;

		inputEl.current.focus();
		setQuery("");
	});

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			//Connecting the variable to element in a declarative way
			ref={inputEl}
		/>
	);
}

function Results({ movies }) {
	return (
		<p className="num-results">
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

function Navbar({ children }) {
	return (
		<nav className="nav-bar">
			<Logo />
			{children}
		</nav>
	);
}

//-----------------------------------------------------------------------------------------

function Main({ children }) {
	return <main className="main">{children}</main>;
}

//------------------------------------------------------------------------------
function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<div className="box">
			<button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
				{isOpen ? "-" : "+"}
			</button>
			{isOpen && children}
		</div>
	);
}

//------------------------------------------------------------------------------

function Movie({ movie, onSelectMovie }) {
	return (
		<li
			key={movie.imdbID}
			onClick={() => {
				onSelectMovie(movie.imdbID);
			}}
		>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}

function MovieList({ movies, onSelectMovie }) {
	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<Movie movie={movie} key={movie.id} onSelectMovie={onSelectMovie} />
			))}
		</ul>
	);
}

//No need due to Component Composition

// function Listbox({ children }) {
// 	return <Box>{children}</Box>;
// }

//-----------------------------------------------------------------------------------------------

function WatchedSummary({ watched }) {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));
	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating.toFixed(2)}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating.toFixed(2)}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime.toFixed(2)} min</span>
				</p>
			</div>
		</div>
	);
}

function WatchedMovie({ movie, onDeleteWatched }) {
	return (
		<li key={movie.imdbID}>
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<h3>{movie.title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
				<button
					className="btn-delete"
					onClick={() => onDeleteWatched(movie.imdbID)}
				>
					X
				</button>
			</div>
		</li>
	);
}

function WatchedList({ watched, onDeleteWatched }) {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovie
					movie={movie}
					key={movie.imdbID}
					onDeleteWatched={onDeleteWatched}
				/>
			))}
		</ul>
	);
}

// function WatchedBox() {
// 	return (
// 		<Box>
// 			<>
// 				<WatchedSummary watched={watched} />
// 				<WatchedList watched={watched} />
// 			</>
// 		</Box>
// 	);
// }

//---------------------------------------------------------------------------------------
const KEY = "b044c3f9";
//We are using component composition in the app function to fix prop drilling
export default function App() {
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState(null);
	//----------------------------------------------------------------------------------------
	//This causes the component to be stuck in an infinite loop of requests and renders
	// fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
	// 	.then((res) => res.json())
	// 	.then((data) => setMovies(data.Search));
	//----------------------------------------------------------------------------------------

	//this function needs to be a pure function i.e. no arguments
	//watched is an array of objects
	const [watched, setWatched] = useLocalStorageState([], "watched");

	function handleSelectMovie(id) {
		//This ensures that double clicking also closes the movie
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatched((watched) => [...watched, movie]);

		//Storing the movies in the loclstorage
		//localStorage.setItem("watched", JSON.stringify([...watched, movie]));
	}

	function handleDeleteWatched(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}

	//We used useEffect since we neded the moviesList to be filled with dat when the component renders ofr the first time
	const { movies, isLoading, error } = useMovies(query);
	return (
		<>
			<Navbar>
				<Search query={query} setQuery={setQuery} />
				<Results movies={movies} />
			</Navbar>
			<Main>
				<Box>
					{/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
					{isLoading && <Loader />}
					{error && <ErrorMessage message={error} />}
					{!isLoading && !error && (
						<MovieList movies={movies} onSelectMovie={handleSelectMovie} />
					)}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							handleCloseMovie={handleCloseMovie}
							selectedId={selectedId}
							onAddWatched={handleAddWatched}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedList
								watched={watched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function Loader() {
	return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
	return (
		<p className="error">
			<span>😬</span>
			{message}
		</p>
	);
}

function MovieDetails({ selectedId, handleCloseMovie, onAddWatched, watched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState("");
	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	useKey("Escape", handleCloseMovie);

	//Function to change the page title on Mount
	useEffect(
		function () {
			if (!title) return;
			document.title = `Movie: ${title}`;

			//This is the cleanup function
			return function () {
				document.title = "usePopcorn";
				//This here shows the closure property of JS as the function though unmounted still remembers its variales
				console.log(`Clean up effect for movie ${title}`);
			};
		},
		[title]
	);

	//Checking internally if the se;ected movie is watched
	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

	//Using optional chaining to get userRating out of the watched list
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId
	)?.userRating;

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(" ").at(0)),
			userRating,
		};
		onAddWatched(newWatchedMovie);
	}
	useEffect(
		function () {
			async function getMovieDetails() {
				setIsLoading(true);
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
				);
				const data = await res.json();
				setMovie(data);
				setIsLoading(false);
			}
			getMovieDetails();
		},
		[selectedId]
	);
	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className="btn-back" onClick={handleCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movie} movie`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>🌟</span>
								{imdbRating} imdbRating
							</p>
						</div>
					</header>
					<section>
						<div className="rating">
							{!isWatched ? (
								<>
									<StraRating
										maxRating={10}
										size={24}
										onSetRating={setUserRating}
									/>
									{userRating > 0 && (
										<button
											className="btn-add"
											onClick={() => {
												handleAdd();
												handleCloseMovie();
											}}
										>
											+Add To List
										</button>
									)}
								</>
							) : (
								<p>You already rated this movie {watchedUserRating}⭐ !</p>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
}
