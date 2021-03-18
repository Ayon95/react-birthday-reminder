import { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext.js';
import { manageActiveLinkStyling } from './helpers.js';
import { useEffect } from 'react';

function Navbar() {
	const [error, setError] = useState(null);
	const { peopleUpcomingBirthdays } = useContext(GlobalContext);
	const currentLocation = useLocation();
	const history = useHistory();
	const { currentUser, currentUserDoc, logOut } = useContext(AuthContext);
	// want to call this function whenever the current location changes
	useEffect(manageActiveLinkStyling, [currentLocation]);

	async function handleLogout() {
		try {
			setError(null);
			await logOut();
			history.push('/login');
		} catch {
			setError('Cannot log out. Please check your internet connection.');
			alert(error);
		}
	}
	return (
		<nav className="navbar">
			<h1>{currentUserDoc ? `Hello, ${currentUserDoc.username}` : 'Birthday Reminder'}</h1>
			<div className="navbar__links">
				{currentUser ? (
					<>
						<Link className="navbar__link current-link" to="/">
							Home
						</Link>

						<Link className="navbar__link" to="/upcoming-birthdays">
							Upcoming
							{peopleUpcomingBirthdays?.length === 0 ? (
								''
							) : (
								<span className="notification">{peopleUpcomingBirthdays?.length}</span>
							)}
						</Link>

						<Link className="navbar__link" to="/all-birthdays">
							All
						</Link>

						<Link className="navbar__link" to="/search">
							Search
						</Link>

						<span className="separator">|</span>

						<Link className="navbar__link" to="/add-birthday">
							Add
						</Link>
					</>
				) : (
					''
				)}

				{currentUser && (
					<Link className="navbar__link" to="/signup" onClick={handleLogout}>
						Log Out
					</Link>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
