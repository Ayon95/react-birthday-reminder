import { ReactComponent as IconPerson } from './img/user.svg';
import { ReactComponent as IconCake } from './img/birthday-cake.svg';

function AllBirthdaysList({ currentPeople }) {
	const template = currentPeople.map((person) => {
		return (
			<div key={person.id} className="person">
				<IconPerson className="icon" />
				<h4 className="person__name">{person.name}</h4>
				<IconCake className="icon" />
				<p className="person__birthday">{`${person.month} ${person.date}, ${person.year}`} </p>
			</div>
		);
	});

	return <div className="persons">{template}</div>;
}

export default AllBirthdaysList;
