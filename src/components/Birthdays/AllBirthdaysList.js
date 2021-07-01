import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext.js';
import Birthday from './Birthday.js';

function AllBirthdaysList({ currentPeople }) {
	const { handleDelete } = useContext(GlobalContext);
	const template = currentPeople.map((person) => {
		return (
			<Birthday
				key={person.id}
				person={person}
				addedFunctionality={true}
				handleDelete={handleDelete}
			/>
		);
	});

	return <div className="persons">{template}</div>;
}

export default AllBirthdaysList;
