import { useRef, useState, useEffect, useContext } from 'react';
import { ReactComponent as IconSearch } from '../img/magnifying-glass.svg';
import { GlobalContext } from '../contexts/GlobalContext.js';
import Birthday from './Birthdays/Birthday';

function Search() {
	const { people, handleDelete } = useContext(GlobalContext);
	const [searchInput, setSearchInput] = useState('');
	const [searchResults, setSearchResults] = useState(null);
	const searchbar = useRef(null);
	useEffect(() => searchbar.current.focus());

	// whenever search input or the main people data will change, the people list will be filtered and search results will be updated
	useEffect(() => {
		function filterPeople() {
			if (!searchInput) return []; // this will ensure that initially no search results are shown (when searchInput = '')
			return people?.filter((person) => person.name.toLowerCase().includes(searchInput.toLowerCase()));
		}
		setSearchResults(filterPeople());
	}, [searchInput, people]);

	return (
		<div className="container">
			<h3 className="container__title">Search</h3>
			<div className="searchbar-container">
				<input
					type="text"
					className="searchbar"
					value={searchInput}
					required
					onChange={(event) => setSearchInput(event.target.value)}
					placeholder="Enter name"
					ref={searchbar}
				/>
				<IconSearch className="icon icon--searchbar" />
			</div>
			<div className="persons">
				{searchResults?.map((person) => {
					return <Birthday key={person.id} person={person} addedFunctionality={true} handleDelete={handleDelete} />;
				})}
			</div>
		</div>
	);
}

export default Search;
