function removeActiveLinkStyling() {
	const allLinks = Array.from(document.querySelectorAll('.navbar__link'));
	// find the link that contains current-link class, and remove the class from that link
	allLinks.find((link) => link.classList.contains('current-link')).classList.remove('current-link');
}
export function manageActiveLinkStyling(event) {
	// using event-bubbling to make sure to do something only if the click happened on a link
	if (!event.target.classList.contains('navbar__link')) return;
	const link = event.target;
	// remove current-link class from the current link before adding that class to the clicked link
	removeActiveLinkStyling();
	// if the clicked link doesn't contain current-link class, then add that class to it
	if (!link.classList.contains('current-link')) link.classList.add('current-link');
}
