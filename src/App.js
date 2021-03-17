import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './Home.js';
import FormComponent from './Form.js';
import AllBirthdays from './AllBirthdays.js';
import UpcomingBirthdays from './UpcomingBirthdays.js';
import Search from './Search.js';
import PageNotFound from './PageNotFound.js';
import GlobalContextProvider from './GlobalContext.js';
import AuthContextProvider from './AuthContext.js';
import Signup from './Signup.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import ResetPassword from './ResetPassword.js';

function App() {
	return (
		<Router>
			<AuthContextProvider>
				<GlobalContextProvider>
					<div className="App">
						<Navbar />

						<main>
							<Switch>
								<Route path="/signup">
									<Signup />
								</Route>

								<Route path="/login">
									<Login />
								</Route>

								<Route path="/reset-password">
									<ResetPassword />
								</Route>

								<ProtectedRoute exact path="/" component={Home}></ProtectedRoute>
								<ProtectedRoute exact path="/all-birthdays" component={AllBirthdays}></ProtectedRoute>

								<ProtectedRoute
									exact
									path="/add-birthday"
									data={{ formType: 'add', formTitle: 'Add birthday' }}
									component={FormComponent}
								></ProtectedRoute>

								<ProtectedRoute
									exact
									path="/edit-birthday/:id"
									data={{ formType: 'edit', formTitle: 'Edit birthday' }}
									component={FormComponent}
								></ProtectedRoute>

								<ProtectedRoute exact path="/search" component={Search}></ProtectedRoute>
								<ProtectedRoute exact path="/upcoming-birthdays" component={UpcomingBirthdays}></ProtectedRoute>

								<Route path="*">
									<PageNotFound />
								</Route>
							</Switch>
						</main>
					</div>
				</GlobalContextProvider>
			</AuthContextProvider>
		</Router>
	);
}

export default App;
