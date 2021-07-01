import AllBirthdaysList from './AllBirthdaysList.js';
import Pagination from '../Pagination.js';
import { useState, useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import LoadingSpinner from '../LoadingSpinner.js';

function AllBirthdays() {
	// loading data
	const { people, isPending, error } = useContext(GlobalContext);
	// state variables
	const [currentPage, setCurrentPage] = useState(1);
	const [peoplePerPage] = useState(8);

	// start and end indices
	const endIndex = currentPage * peoplePerPage;
	const startIndex = endIndex - peoplePerPage;

	// getting current people (only the items of the current page)
	const currentPeople = people?.slice(startIndex, endIndex);

	// paginate function will set the current page; it will change page
	function paginate(pageNumber) {
		setCurrentPage(pageNumber);
	}
	return (
		<div className="container">
			{error && <p className="message message--error">{error}</p>}

			{isPending && (
				<div className="spinner-container">
					<LoadingSpinner className="icon-spinner" />
				</div>
			)}

			{people && (
				<>
					<h3 className="container__title">
						You have {people.length === 0 ? 'No' : people.length} birthday
						{people.length === 1 ? '' : 's'} saved
					</h3>
					<AllBirthdaysList currentPeople={currentPeople} />
					<Pagination
						peoplePerPage={peoplePerPage}
						totalNumPeople={people.length}
						paginate={paginate}
					/>
				</>
			)}
		</div>
	);
}

export default AllBirthdays;
