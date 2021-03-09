import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav className="navbar">
			<h1>Birthday Reminder</h1>
			<div className="navbar__links">
				<Link className="navbar__link" to="/">
					Home
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
