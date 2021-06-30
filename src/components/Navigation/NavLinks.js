import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import NavigationLink from './NavigationLink';

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
					<NavigationLink
						key={link.title}
						title={link.title}
						path={link.path}
						handleClick={link.title === 'Log Out' ? handleLogout : closeMenu}
					>
						{link.title === 'Upcoming' && peopleUpcomingBirthdays?.length > 0 && (
							<span className="notification">{peopleUpcomingBirthdays.length}</span>
						)}
					</NavigationLink>
				);
			})}
		</div>
	);
}

export default NavLinks;
