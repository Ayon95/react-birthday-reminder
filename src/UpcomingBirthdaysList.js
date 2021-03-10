import { ReactComponent as IconPerson } from './img/user.svg';
import { ReactComponent as IconCake } from './img/birthday-cake.svg';

function UpcomingBirthdaysList({ peopleFiltered }) {
	const template = peopleFiltered.map((person) => {
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
			{template.length === 0 ? (
				<h3 className="container__title">No Upcoming Birthdays</h3>
			) : (
				<h3 className="container__title">
					{template.length} Upcoming Birthday{template.length > 1 ? 's' : ''}
				</h3>
			)}

			{template.length === 0 ? '' : <div className="persons">{template}</div>}
		</>
	);
}

export default UpcomingBirthdaysList;
