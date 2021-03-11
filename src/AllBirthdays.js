import List from './List';
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
	console.log(currentPeople);

	// paginate function will set the current page; it will change page
	function paginate(pageNumber) {
		setCurrentPage(pageNumber);
	}
	return (
		<div className="container">
			{error && (
				<div className="container">
					<p className="error-message">{error}</p>
				</div>
			)}

			{isPending && (
				<div className="container">
					<div className="spinner-container">
						<LoadingSpinner className="icon-spinner" />
					</div>
				</div>
			)}

			{people && (
				<>
					<h3 className="container__title">You have {people.length} birthdays saved</h3>
					<List currentPeople={currentPeople} needAllBirthdays={true} handleDelete={handleDelete} />
					<Pagination peoplePerPage={peoplePerPage} totalNumPeople={people.length} paginate={paginate} />
				</>
			)}
		</div>
	);
}

export default AllBirthdays;
