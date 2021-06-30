import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationLink({ title, path, handleClick, children }) {
	return (
		<NavLink
			to={path}
			className="navbar__link"
			activeClassName="current-link"
			exact={true}
			onClick={handleClick}
		>
			{title}
			{children}
		</NavLink>
	);
}

export default NavigationLink;
