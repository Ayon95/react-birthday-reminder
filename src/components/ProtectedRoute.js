import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function ProtectedRoute({ component: Component, data, ...rest }) {
	const { currentUser } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				// render the component only if there is a current user, i.e. authenticated user
				// if there is no authenticated user, then redirect to the login page
				// the data object contains additional props that may be sent to the component
				return currentUser ? <Component {...props} {...data} /> : <Redirect to="/login" />;
			}}
		></Route>
	);
}

export default ProtectedRoute;
