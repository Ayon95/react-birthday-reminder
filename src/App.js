import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar.js';
import Home from './components/Home.js';
import AllBirthdays from './components/Birthdays/AllBirthdays.js';
import UpcomingBirthdays from './components/Birthdays/UpcomingBirthdays.js';
import Search from './components/Search.js';
import PageNotFound from './components/PageNotFound.js';
import GlobalContextProvider from './contexts/GlobalContext.js';
import AuthContextProvider from './contexts/AuthContext.js';
import Signup from './components/Forms/Signup.js';
import Login from './components/Forms/Login.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import ResetPassword from './components/Forms/ResetPassword.js';
import EditForm from './components/Forms/EditForm.js';
import AddForm from './components/Forms/AddForm.js';

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

								<ProtectedRoute exact path="/" component={Home} />
								<ProtectedRoute
									exact
									path="/all-birthdays"
									component={AllBirthdays}
								/>

								<ProtectedRoute exact path="/add-birthday" component={AddForm} />

								<ProtectedRoute
									exact
									path="/edit-birthday/:id"
									component={EditForm}
								></ProtectedRoute>

								<ProtectedRoute exact path="/search" component={Search} />
								<ProtectedRoute
									exact
									path="/upcoming-birthdays"
									component={UpcomingBirthdays}
								/>

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
