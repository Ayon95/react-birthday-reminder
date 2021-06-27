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

function NavLinks({ handleLogout }) {
	const { peopleUpcomingBirthdays } = useContext(GlobalContext);
	return (
		<>
			{links.map((link) => {
				return (
					<NavLink
						key={link.title}
						title={link.title}
						path={link.path}
						{...(link.title === 'Log Out' && { onClick: handleLogout })}
					>
						{link.title === 'Upcoming' && peopleUpcomingBirthdays?.length > 0 && (
							<span className="notification">{peopleUpcomingBirthdays.length}</span>
						)}
					</NavLink>
				);
			})}
		</>
	);
}

export default NavLinks;
