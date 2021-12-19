import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar.js';
import GlobalContextProvider from './contexts/GlobalContext.js';
import AuthContextProvider from './contexts/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import LoadingSpinner from './components/LoadingSpinner.js';
// Dynamically importing components when they are required by the user (for code-splitting)
const Signup = React.lazy(() => import('./components/Forms/Signup.js'));
const Login = React.lazy(() => import('./components/Forms/Login.js'));
const ResetPassword = React.lazy(() => import('./components/Forms/ResetPassword.js'));
const Home = React.lazy(() => import('./components/Home.js'));
const AllBirthdays = React.lazy(() => import('./components/Birthdays/AllBirthdays.js'));
const UpcomingBirthdays = React.lazy(() => import('./components/Birthdays/UpcomingBirthdays.js'));
const AddForm = React.lazy(() => import('./components/Forms/AddForm.js'));
const EditForm = React.lazy(() => import('./components/Forms/EditForm.js'));
const Search = React.lazy(() => import('./components/Search.js'));
const PageNotFound = React.lazy(() => import('./components/PageNotFound.js'));

function App() {
	return (
		<Router>
			<AuthContextProvider>
				<GlobalContextProvider>
					<div className="App">
						<Navbar />

						<main>
							{/* we want to perform code splitting at each route */}
							<Suspense fallback={<LoadingSpinner />}>
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
									<ProtectedRoute exact path="/all-birthdays" component={AllBirthdays} />
									<ProtectedRoute exact path="/add-birthday" component={AddForm} />
									<ProtectedRoute
										exact
										path="/edit-birthday/:id"
										component={EditForm}
									></ProtectedRoute>
									<ProtectedRoute exact path="/search" component={Search} />
									<ProtectedRoute exact path="/upcoming-birthdays" component={UpcomingBirthdays} />
									<Route path="*">
										<PageNotFound />
									</Route>
								</Switch>
							</Suspense>
						</main>
					</div>
				</GlobalContextProvider>
			</AuthContextProvider>
		</Router>
	);
}

export default App;
