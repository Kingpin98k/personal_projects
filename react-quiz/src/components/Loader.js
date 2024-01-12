export default function Loader() {
	//This is the loader component that is rendered when the status is loading
	return (
		<div className="loader-container">
			<div className="loader"></div>
			<p>Loading questions...</p>
		</div>
	);
}
