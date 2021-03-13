import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './Home.js';
import FormComponent from './Form.js';
import AllBirthdays from './AllBirthdays.js';
import UpcomingBirthdays from './UpcomingBirthdays.js';
import Search from './Search.js';
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
								<FormComponent formType="add" formTitle="Add birthday" />
							</Route>

							<Route path="/edit-birthday/:id">
								<FormComponent formType="edit" formTitle="Edit birthday" />
							</Route>

							<Route path="/all-birthdays">
								<AllBirthdays />
							</Route>

							<Route path="/search">
								<Search />
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
