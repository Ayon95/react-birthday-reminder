import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UpcomingBirthdaysContext } from './UpcomingBirthdaysContext';
import { manageActiveLinkStyling } from './helpers.js';

function Navbar() {
	const { peopleFiltered } = useContext(UpcomingBirthdaysContext);
	return (
		<nav className="navbar">
			<h1>Birthday Reminder</h1>
			<div className="navbar__links" onClick={manageActiveLinkStyling}>
				<Link className="navbar__link current-link" to="/">
					Home
				</Link>

				<Link className="navbar__link" to="/upcoming-birthdays">
					Upcoming birthdays
					<span className="notification">{peopleFiltered?.length}</span>
				</Link>

				<Link className="navbar__link" to="/all-birthdays">
					All birthdays
				</Link>

				<span className="separator">|</span>

				<Link className="navbar__link" to="/add-birthday">
					Add birthday
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
