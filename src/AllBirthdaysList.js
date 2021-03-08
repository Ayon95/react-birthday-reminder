import { ReactComponent as IconPerson } from './img/user.svg';
import { ReactComponent as IconCake } from './img/birthday-cake.svg';

function AllBirthdaysList({ people }) {
	const template = people.map((person) => {
		return (
			<div key={person.id} className="person">
				<IconPerson className="icon" />
				<h4 className="person__name">{person.name}</h4>
				<IconCake className="icon" />
				<p className="person__birthday">{`${person.month} ${person.date}, ${person.year}`} </p>
			</div>
		);
	});

	return (
		<>
			<h3 className="container__title">You have {template.length} birthdays saved</h3>
			<div className="persons">{template}</div>
		</>
	);
}

export default AllBirthdaysList;
