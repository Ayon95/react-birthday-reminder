import { useRef, useState, useEffect } from 'react';
import { ReactComponent as IconSearch } from './img/magnifying-glass.svg';

function Search() {
	const [name, setName] = useState('');
	const searchbar = useRef(null);
	useEffect(() => searchbar.current.focus());
	return (
		<div className="container">
			<h3 className="container__title">Search</h3>
			<div className="searchbar-container">
				<input
					type="text"
					className="searchbar"
					value={name}
					required
					onChange={(event) => setName(event.target.value)}
					placeholder="Enter name"
					ref={searchbar}
				/>
				<IconSearch className="icon icon--searchbar" />
			</div>
		</div>
	);
}

export default Search;
