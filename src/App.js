import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Form from './Form.js';
import AllBirthdays from './AllBirthdays.js';
import UpcomingBirthdays from './UpcomingBirthdays.js';
import UpcomingBirthdaysContextProvider from './UpcomingBirthdaysContext';

function App() {
	return (
		<Router>
			<div className="App">
				<UpcomingBirthdaysContextProvider>
					<Navbar />
				</UpcomingBirthdaysContextProvider>

				<main>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>

						<Route path="/add-birthday">
							<Form />
						</Route>

						<Route path="/all-birthdays">
							<AllBirthdays />
						</Route>

						<Route path="/upcoming-birthdays">
							<UpcomingBirthdaysContextProvider>
								<UpcomingBirthdays />
							</UpcomingBirthdaysContextProvider>
						</Route>
					</Switch>
				</main>
				<Redirect to="/" />
			</div>
		</Router>
	);
}

export default App;
