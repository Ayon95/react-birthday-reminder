import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import NavLink from './NavLink';

const links = [
	{ title: 'Home', path: '/' },
	{ title: 'Upcoming', path: '/upcoming-birthdays' },
	{ title: 'All', path: '/all-birthdays' },
	{ title: 'Search', path: '/search' },
	{ title: 'Add', path: '/add-birthday' },
	{ title: 'Log Out', path: '/login' },
];

function NavLinks({ handleLogout, menuIsOpen, closeMenu }) {
	const { peopleUpcomingBirthdays } = useContext(GlobalContext);

	function insertStylesToOpenMenu() {
		return { transform: 'translateX(0)', opacity: 1 };
	}
	return (
		<div className="navbar__links" style={menuIsOpen ? insertStylesToOpenMenu() : null}>
			{links.map((link) => {
				return (
					<NavLink
						key={link.title}
						title={link.title}
						path={link.path}
						onClick={closeMenu}
						{...(link.title === 'Log Out' && { onClick: handleLogout })}
					>
						{link.title === 'Upcoming' && peopleUpcomingBirthdays?.length > 0 && (
							<span className="notification">{peopleUpcomingBirthdays.length}</span>
						)}
					</NavLink>
				);
			})}
		</div>
	);
}

export default NavLinks;
