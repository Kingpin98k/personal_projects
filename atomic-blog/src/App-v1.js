import { createContext, useContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
	//A post is an object containing a title and a body field
	return {
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body: faker.hacker.phrase(),
	};
}

const PostContext = createContext();
const SearchContext = createContext();

function App() {
	//Posts is an array of post objects
	const [posts, setPosts] = useState(() =>
		//Nice way of creating an array in js Arrray.from({object},callback());
		Array.from({ length: 30 }, createRandomPost)
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [isFakeDark, setIsFakeDark] = useState(false);

	// Derived state. These are the posts that will actually be displayed
	const searchedPosts =
		searchQuery.length > 0
			? posts.filter((post) =>
					//Combining post title and body to make a string
					`${post.title} ${post.body}`
						.toLowerCase()
						//Searching for the query string inside the post string
						.includes(searchQuery.toLowerCase())
			  )
			: posts;

	function handleAddPost(post) {
		//Adding the new post to previous posts, and adding it in the beginning....
		setPosts((posts) => [post, ...posts]);
	}

	function handleClearPosts() {
		//Deleting all the posts
		setPosts([]);
	}

	// Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
	useEffect(
		//This is placed inside use effect since it tampers with outside world(D.O.M)
		function () {
			document.documentElement.classList.toggle("fake-dark-mode");
		},
		[isFakeDark]
	);

	return (
		<PostContext.Provider
			value={{
				posts: searchedPosts,
				onClearPosts: handleClearPosts,
				onAddPost: handleAddPost,
			}}
		>
			<section>
				<button
					onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
					className="btn-fake-dark-mode"
				>
					{isFakeDark ? "☀️" : "🌙"}
				</button>
				<SearchContext.Provider
					value={{
						searchQuery,
						setSearchQuery,
					}}
				>
					<Header />
				</SearchContext.Provider>
				<Main />
				<Archive />
				<Footer />
			</section>
		</PostContext.Provider>
	);
}

function Header() {
	const { onClearPosts } = useContext(PostContext);

	return (
		<header>
			<h1>
				<span>⚛️</span>The Atomic Blog
			</h1>
			<div>
				<Results />
				<SearchPosts />
				<button onClick={onClearPosts}>Clear posts</button>
			</div>
		</header>
	);
}

function SearchPosts() {
	const { searchQuery, setSearchQuery } = useContext(SearchContext);

	return (
		<input
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			placeholder="Search posts..."
		/>
	);
}

function Results() {
	const { posts } = useContext(PostContext);

	return <p>🚀 {posts.length} atomic posts found</p>;
}

function Main() {
	return (
		<main>
			<FormAddPost />
			<Posts />
		</main>
	);
}

function Posts() {
	return (
		<section>
			<List />
		</section>
	);
}

function FormAddPost() {
	const { onAddPost } = useContext(PostContext);

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const handleSubmit = function (e) {
		e.preventDefault();
		if (!body || !title) return;
		onAddPost({ title, body });
		setTitle("");
		setBody("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Post title"
			/>
			<textarea
				value={body}
				onChange={(e) => setBody(e.target.value)}
				placeholder="Post body"
			/>
			<button>Add post</button>
		</form>
	);
}

function List() {
	const { posts } = useContext(PostContext);

	return (
		<ul>
			{posts.map((post, i) => (
				<li key={i}>
					<h3>{post.title}</h3>
					<p>{post.body}</p>
				</li>
			))}
		</ul>
	);
}

function Archive() {
	const { onAddPost } = useContext(PostContext);

	// Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
	const [posts] = useState(() =>
		// 💥 WARNING: This might make your computer slow! Try a smaller `length` first
		Array.from({ length: 20 }, () => createRandomPost())
	);

	const [showArchive, setShowArchive] = useState(false);

	return (
		<aside>
			<h2>Post archive</h2>
			<button onClick={() => setShowArchive((s) => !s)}>
				{showArchive ? "Hide archive posts" : "Show archive posts"}
			</button>

			{showArchive && (
				<ul>
					{posts.map((post, i) => (
						<li key={i}>
							<p>
								<strong>{post.title}:</strong> {post.body}
							</p>
							<button onClick={() => onAddPost(post)}>Add as new post</button>
						</li>
					))}
				</ul>
			)}
		</aside>
	);
}

function Footer() {
	return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
