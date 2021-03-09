import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useFetch from './useFetch.js';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Form from './Form.js';
import AllBirthdays from './AllBirthdays.js';

function App() {
	// loading data
	const { data: people, isPending, error } = useFetch('http://localhost:8000/people');
	return (
		<Router>
			<div className="App">
				<Navbar />

				<main>
					<Switch>
						<Route exact path="/">
							<Home people={people} isPending={isPending} error={error} />
						</Route>

						<Route path="/add-birthday">
							<Form />
						</Route>

						<Route path="/all-birthdays">
							<AllBirthdays people={people} isPending={isPending} error={error} />
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
