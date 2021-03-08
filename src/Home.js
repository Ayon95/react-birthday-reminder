import List from './List';
import useFetch from './useFetch.js';

function Home() {
	const { data: people, isPending, error } = useFetch('http://localhost:8000/people');
	return (
		<div className="container">
			{error && <p>{error}</p>}
			{isPending && <p>Loading...</p>}
			{people && <List people={people} needAllBirthdays={false} />}
		</div>
	);
}

export default Home;
