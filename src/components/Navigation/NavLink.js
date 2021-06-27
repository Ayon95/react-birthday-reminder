import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavLink({ title, path, children, ...rest }) {
	const location = useLocation();
	const classes = `navbar__link ${location.pathname === path && 'current-link'}`;
	return (
		<Link to={path} className={classes} {...rest}>
			{title}
			{children}
		</Link>
	);
}

export default NavLink;
