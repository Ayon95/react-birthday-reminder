import { useState } from 'react';
import List from './List';
import data from './data';

function Home() {
	const [people, setPeople] = useState(data);
	return (
		<section className="container">
			<h3>{people.length} Birthdays Today</h3>
			<List people={people} />
			<button onClick={() => setPeople([])}>Clear All</button>
		</section>
	);
}

export default Home;
