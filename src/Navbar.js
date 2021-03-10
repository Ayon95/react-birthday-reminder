import { Link } from 'react-router-dom';

function Navbar() {
	function removeActiveLinkStyling() {
		const allLinks = Array.from(document.querySelectorAll('.navbar__link'));
		// find the link that contains current-link class, and remove the class from that link
		allLinks.find((link) => link.classList.contains('current-link')).classList.remove('current-link');
	}
	function manageActiveLinkStyling(event) {
		// using event-bubbling to make sure to do something only if the click happened on a link
		if (!event.target.classList.contains('navbar__link')) return;
		const link = event.target;
		// remove current-link class from the current link before adding that class to the clicked link
		removeActiveLinkStyling();
		// if the clicked link doesn't contain current-link class, then add that class to it
		if (!link.classList.contains('current-link')) link.classList.add('current-link');
	}
	return (
		<nav className="navbar">
			<h1>Birthday Reminder</h1>
			<div className="navbar__links" onClick={manageActiveLinkStyling}>
				<Link className="navbar__link current-link" to="/">
					Home
				</Link>

				<Link className="navbar__link" to="/upcoming-birthdays">
					Upcoming birthdays
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
