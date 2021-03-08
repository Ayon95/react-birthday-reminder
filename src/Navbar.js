import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav className="navbar">
			<h1>Birthday Reminder</h1>
			<div className="navbar__links">
				<Link className="navbar__link" to="/">
					Home
				</Link>
				<Link className="navbar__link" to="/create">
					Add birthday
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
