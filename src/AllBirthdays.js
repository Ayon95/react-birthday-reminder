import List from './List';
import Pagination from './Pagination.js';
import { useState } from 'react';
import { ReactComponent as LoadingSpinner } from './img/reload.svg';

function AllBirthdays({ people, isPending, error }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [peoplePerPage] = useState(6);

	// show error message if there was a problem fetching data
	if (error) {
		return (
			<div className="container">
				<p className="error-message">{error}</p>
			</div>
		);
	}

	// show loading spinner while fetching data
	if (isPending) {
		return (
			<div className="container">
				<div className="spinner-container">
					<LoadingSpinner className="icon-spinner" />
				</div>
			</div>
		);
	}

	// Need to make sure that we get people data before we use it

	// start and end indices
	const endIndex = currentPage * peoplePerPage;
	const startIndex = endIndex - peoplePerPage;

	// getting current people (only the items of the current page)
	const currentPeople = people.slice(startIndex, endIndex);

	// paginate function will set the current page; it will change page
	function paginate(pageNumber) {
		setCurrentPage(pageNumber);
	}
	return (
		<div className="container">
			{people && (
				<>
					<h3 className="container__title">You have {people.length} birthdays saved</h3>
					<List currentPeople={currentPeople} needAllBirthdays={true} />
					<Pagination peoplePerPage={peoplePerPage} totalNumPeople={people.length} paginate={paginate} />
				</>
			)}
		</div>
	);
}

export default AllBirthdays;
