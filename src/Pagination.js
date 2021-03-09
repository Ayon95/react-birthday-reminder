function Pagination({ peoplePerPage, totalNumPeople, paginate }) {
	const pageNumbers = [];
	const totalPages = Math.ceil(totalNumPeople / peoplePerPage);

	for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

	return (
		<ul className="pg-buttons">
			{pageNumbers.map((pageNumber) => {
				return (
					<li key={pageNumber} className="pg-buttons__button" onClick={() => paginate(pageNumber)}>
						{pageNumber}
					</li>
				);
			})}
		</ul>
	);
}

export default Pagination;
