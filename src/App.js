import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Form from './Form.js';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />

				<main>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>

						<Route path="/add-birthday">
							<Form />
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
