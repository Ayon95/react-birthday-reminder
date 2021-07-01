import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext.js';
import NavLinks from './NavLinks';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
	const [error, setError] = useState(null);
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const { currentUser, currentUserDoc, logOut } = useContext(AuthContext);

	function toggleMenu() {
		setMenuIsOpen((menuIsOpen) => !menuIsOpen);
	}

	function closeMenu() {
		setMenuIsOpen(false);
	}

	async function handleLogout() {
		try {
			setError(null);
			closeMenu();
			await logOut();
		} catch {
			setError('Cannot log out. Please check your internet connection.');
			alert(error);
		}
	}

	return (
		<nav className="navbar">
			<h2>{currentUserDoc ? `Hello, ${currentUserDoc.username}` : 'Birthday Reminder'}</h2>
			{currentUser && (
				<>
					<NavLinks handleLogout={handleLogout} menuIsOpen={menuIsOpen} closeMenu={closeMenu} />
					<button className="navbar__hamburger-btn" onClick={toggleMenu}>
						{menuIsOpen ? <FaTimes /> : <FaBars />}
					</button>
				</>
			)}
		</nav>
	);
}

export default Navbar;
