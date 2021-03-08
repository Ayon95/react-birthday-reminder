import { ReactComponent as IconPerson } from './img/user.svg';
import { ReactComponent as IconCake } from './img/birthday-cake.svg';

function BirthdaysTodayList({ people }) {
	const today = String(new Date().getDate());
	const currentMonth = new Date().toLocaleString('default', { month: 'short' });

	// generating filtered template (includes people who have birthdays today)
	const template = people
		.filter((person) => person.date === today && person.month === currentMonth)
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
				<h3 className="container__title">No Birthdays Today</h3>
			) : (
				<h3 className="container__title">
					{template.length} Birthday{template.length > 1 ? 's' : ''} Today
				</h3>
			)}

			<div className="persons">{template}</div>
		</>
	);
}

export default BirthdaysTodayList;
