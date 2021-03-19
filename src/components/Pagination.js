import { manageActivePgButtonStyling } from '../helpers.js';

function Pagination({ peoplePerPage, totalNumPeople, paginate }) {
	const pageNumbers = [];
	const totalPages = Math.ceil(totalNumPeople / peoplePerPage);

	// setting page numbers
	for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

	function managePagination(event, pageNumber) {
		manageActivePgButtonStyling(event);
		paginate(pageNumber);
	}

	return (
		<ul className="pg-buttons">
			{pageNumbers.map((pageNumber, i) => {
				return (
					<li
						key={pageNumber}
						className={`pg-buttons__button ${i === 0 ? 'current-pg-button' : ''}`}
						onClick={(event) => managePagination(event, pageNumber)}
						tabIndex="0"
					>
						{pageNumber}
					</li>
				);
			})}
		</ul>
	);
}

export default Pagination;
