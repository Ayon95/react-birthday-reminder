import List from './List';
import Pagination from './Pagination.js';
import { useState, useEffect } from 'react';
import useFetch from './useFetch.js';
import { ReactComponent as LoadingSpinner } from './img/reload.svg';

function AllBirthdays() {
	// loading data
	const { data: people, isPending, error } = useFetch('http://localhost:8000/people');
	// state variables
	const [currentPage, setCurrentPage] = useState(1);
	const [peoplePerPage] = useState(6);
	const [peopleList, setPeopleList] = useState(people);

	/* update peopleList whenever the value of people prop changes
	Initially when this component will first mount, people will be null. When the data is loaded from the API, people will no longer be null.
	useEffect will call setPeopleList and peopleList will be updated with the value of people.
	We are using the people prop as a dependency here */
	useEffect(() => setPeopleList(people), [people]);
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

	// this function will handle deleting a person
	async function handleDelete(id) {
		// making the DELETE request
		await fetch(`http://localhost:8000/people/${id}`, { method: 'DELETE' });
		// updating peopleList state variable; remove the deleted person from the list
		setPeopleList(people.filter((person) => person.id !== id));
	}

	// we need to make sure that people data is loaded before we use it

	// start and end indices
	const endIndex = currentPage * peoplePerPage;
	const startIndex = endIndex - peoplePerPage;

	// getting current people (only the items of the current page)
	const currentPeople = peopleList.slice(startIndex, endIndex);

	// paginate function will set the current page; it will change page
	function paginate(pageNumber) {
		setCurrentPage(pageNumber);
	}
	return (
		<div className="container">
			{peopleList && (
				<>
					<h3 className="container__title">You have {peopleList.length} birthdays saved</h3>
					<List currentPeople={currentPeople} needAllBirthdays={true} handleDelete={handleDelete} />
					<Pagination peoplePerPage={peoplePerPage} totalNumPeople={peopleList.length} paginate={paginate} />
				</>
			)}
		</div>
	);
}

export default AllBirthdays;
