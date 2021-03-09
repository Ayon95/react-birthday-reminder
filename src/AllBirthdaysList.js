import { ReactComponent as IconPerson } from './img/user.svg';
import { ReactComponent as IconCake } from './img/birthday-cake.svg';
import { ReactComponent as IconDelete } from './img/rubbish-bin.svg';
import { ReactComponent as IconEdit } from './img/edit.svg';

function AllBirthdaysList({ currentPeople, handleDelete }) {
	const template = currentPeople.map((person) => {
		return (
			<div key={person.id} className="person">
				<IconPerson className="icon" />
				<h4 className="person__name">{person.name}</h4>

				<IconCake className="icon" />
				<p className="person__birthday">{`${person.month} ${person.date}, ${person.year}`} </p>

				<IconEdit className="icon icon--action" />
				<IconDelete className="icon icon--action" onClick={() => handleDelete(person.id)} />
			</div>
		);
	});

	return <div className="persons">{template}</div>;
}

export default AllBirthdaysList;
