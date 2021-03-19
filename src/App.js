import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import FormComponent from './components/Form.js';
import AllBirthdays from './components/AllBirthdays.js';
import UpcomingBirthdays from './components/UpcomingBirthdays.js';
import Search from './components/Search.js';
import PageNotFound from './components/PageNotFound.js';
import GlobalContextProvider from './contexts/GlobalContext.js';
import AuthContextProvider from './contexts/AuthContext.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import ResetPassword from './components/ResetPassword.js';

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
