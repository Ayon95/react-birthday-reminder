import { ReactComponent as IconPerson } from './img/user.svg';
import { ReactComponent as IconCake } from './img/birthday-cake.svg';

function UpcomingBirthdaysList({ people }) {
	const today = new Date().getDate();
	const currentMonth = new Date().toLocaleString('default', { month: 'short' });

	// generating filtered template (includes people who have birthdays coming up in 7 days)
	/* The filtering condition for upcoming birthdays is:
    1) the month has to be the same first of all
    2) then the difference between the current date and the person's birth date has to be greater than 0
    3) and the difference cannot be greater than 7 */
	const template = people
		.filter(
			(person) =>
				person.month === currentMonth &&
				Number.parseFloat(person.date) - today > 0 &&
				Number.parseFloat(person.date) - today <= 7
		)
		.map((person) => {
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
