import { faker } from "@faker-js/faker";
import { createContext, useContext, useMemo, useState } from "react";

// Assuming the necessary imports are the same as provided in your original code

const PostContext = createContext();

function createRandomPost() {
	return {
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body: faker.hacker.phrase(),
	};
}

//PostProvider is a component that provides the value to the PostContext
function PostProvider({ children }) {
	const [posts, setPosts] = useState(() =>
		Array.from({ length: 30 }, createRandomPost)
	);
	//This is the query string that will be used to search the posts
	const [searchQuery, setSearchQuery] = useState("");

	// Derived state. These are the posts that will actually be displayed
	const searchedPosts =
		searchQuery.length > 0
			? posts.filter((post) =>
					`${post.title} ${post.body}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
			  )
			: posts;

	function handleAddPost(post) {
		setPosts((prevPosts) => [post, ...prevPosts]);
	}

	function handleClearPosts() {
		setPosts([]);
	}

	//Here we are memoizing the value object so that it is not created again and again
	//And this object contains the values of the PostContext
	//The PostContext has only two states, the posts and the searchQuery
	const value = useMemo(() => {
		return {
			posts: searchedPosts,
			onClearPosts: handleClearPosts,
			onAddPost: handleAddPost,
			searchQuery,
			setSearchQuery,
		};
	}, [searchedPosts, searchQuery]);
	//This will only be updated when the searchedPosts or searchQuery changes

	return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

//This is the hook that will be used to get the value of the PostContext
function usePosts() {
	const context = useContext(PostContext);
	if (context === undefined)
		throw new Error("Postcontext was used outside of the PostProvider");
	return context;
}

export { PostProvider, PostContext, usePosts };
