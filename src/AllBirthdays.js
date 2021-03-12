import AllBirthdaysList from './AllBirthdaysList';
import Pagination from './Pagination.js';
import { useState, useContext } from 'react';
import { ReactComponent as LoadingSpinner } from './img/reload.svg';
import { GlobalContext } from './GlobalContext.js';

function AllBirthdays() {
	// loading data
	const { people, isPending, error, deletePerson } = useContext(GlobalContext);
	// state variables
	const [currentPage, setCurrentPage] = useState(1);
	const [peoplePerPage] = useState(6);

	// this function will handle deleting a person
	async function handleDelete(id) {
		// making the DELETE request
		await fetch(`http://localhost:8000/people/${id}`, { method: 'DELETE' });
		// updating people list; remove the deleted person from the list
		deletePerson(id);
	}

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
			{error && <p className="error-message">{error}</p>}

			{isPending && (
				<div className="spinner-container">
					<LoadingSpinner className="icon-spinner" />
				</div>
			)}

			{people && (
				<>
					<h3 className="container__title">You have {people.length} birthdays saved</h3>
					<AllBirthdaysList currentPeople={currentPeople} handleDelete={handleDelete} />
					<Pagination peoplePerPage={peoplePerPage} totalNumPeople={people.length} paginate={paginate} />
				</>
			)}
		</div>
	);
}

export default AllBirthdays;
