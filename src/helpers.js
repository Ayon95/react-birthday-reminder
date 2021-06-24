// no longer need this - using useLocation instead
export function manageActiveLinkStyling() {
	const allLinks = [...document.querySelectorAll('.navbar__link')];
	// find the link that contains current-link class, and remove the class from that link
	// if there is no link with current-link class, then don't do anything (optional chaining)
	// this link is now the previous link so we have to remove the current-link class from it
	allLinks.find((link) => link.classList.contains('current-link'))?.classList.remove('current-link');

	const currentLink = allLinks.find((link) => link.getAttribute('href') === window.location.pathname);
	if (!currentLink) return;
	currentLink.classList.add('current-link');
}

// this function will remove the styling of the current pagination button
function removeActivePgButtonStyling() {
	const allButtons = [...document.querySelectorAll('.pg-buttons__button')];
	allButtons.find((button) => button.classList.contains('current-pg-button'))?.classList.remove('current-pg-button');
}

export function manageActivePgButtonStyling(event) {
	const button = event.target;
	removeActivePgButtonStyling();
	if (!button.classList.contains('current-pg-button')) button.classList.add('current-pg-button');
}

export function capitalize(str) {
	return `${str[0].toUpperCase()}${str.slice(1)}`;
}
