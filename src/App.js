import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home.js';
import Navbar from './Navbar.js';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />

				<main>
					<Switch>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
