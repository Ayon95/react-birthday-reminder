import List from './List';
import useFetch from './useFetch.js';

function Home() {
	const { data: people, isPending, error } = useFetch('http://localhost:8000/people');
	console.log(people);
	return (
		<section className="container">
			{error && <p>{error}</p>}
			{isPending && <p>Loading...</p>}
			{people && <List people={people} needAllBirthdays={false} />}
		</section>
	);
}

export default Home;
