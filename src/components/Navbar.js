import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';
import NavLinks from './NavLinks';

function Navbar() {
	const [error, setError] = useState(null);
	const { currentUser, currentUserDoc, logOut } = useContext(AuthContext);

	async function handleLogout() {
		try {
			setError(null);
			await logOut();
		} catch {
			setError('Cannot log out. Please check your internet connection.');
			alert(error);
		}
	}

	return (
		<nav className="navbar">
			<h1>{currentUserDoc ? `Hello, ${currentUserDoc.username}` : 'Birthday Reminder'}</h1>
			<div className="navbar__links">{currentUser && <NavLinks handleLogout={handleLogout} />}</div>
		</nav>
	);
}

export default Navbar;
