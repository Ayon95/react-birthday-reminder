import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import { manageActiveLinkStyling } from './helpers.js';
import { useEffect } from 'react';
import { ReactComponent as IconCake } from './img/birthday-cake.svg';

function Navbar() {
	const { peopleUpcomingBirthdays } = useContext(GlobalContext);
	const currentLocation = useLocation();
	// want to call this function whenever the current location changes
	useEffect(manageActiveLinkStyling, [currentLocation]);
	return (
		<nav className="navbar">
			<h1>Birthday Reminder</h1>
			<div className="navbar__links">
				<Link className="navbar__link current-link" to="/">
					Home
				</Link>

				<Link className="navbar__link" to="/upcoming-birthdays">
					Upcoming <IconCake className="icon icon--navbar" />
					{peopleUpcomingBirthdays?.length === 0 ? (
						''
					) : (
						<span className="notification">{peopleUpcomingBirthdays?.length}</span>
					)}
				</Link>

				<Link className="navbar__link" to="/all-birthdays">
					All <IconCake className="icon icon--navbar" />
				</Link>

				<Link className="navbar__link" to="/search">
					Search
				</Link>

				<span className="separator">|</span>

				<Link className="navbar__link" to="/add-birthday">
					Add <IconCake className="icon icon--navbar" />
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
