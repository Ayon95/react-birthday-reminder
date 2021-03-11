import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Form from './Form.js';
import AllBirthdays from './AllBirthdays.js';
import UpcomingBirthdays from './UpcomingBirthdays.js';
import GlobalContextProvider from './GlobalContext.js';

function App() {
	return (
		<Router>
			<GlobalContextProvider>
				<div className="App">
					<Navbar />

					<main>
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>

							<Route path="/add-birthday">
								<Form formType="add" formTitle="Add birthday" />
							</Route>

							<Route path="/edit-birthday/:id">
								<Form formType="edit" formTitle="Edit birthday" />
							</Route>

							<Route path="/all-birthdays">
								<AllBirthdays />
							</Route>

							<Route path="/upcoming-birthdays">
								<UpcomingBirthdays />
							</Route>
						</Switch>
					</main>
					<Redirect to="/" />
				</div>
			</GlobalContextProvider>
		</Router>
	);
}

export default App;
