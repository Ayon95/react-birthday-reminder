import Birthday from './Birthday.js';

function BirthdaysTodayList({ people }) {
	const today = String(new Date().getDate());
	const currentMonth = new Date().toLocaleString('default', { month: 'short' });

	// generating filtered template (includes people who have birthdays today)
	const template = people
		.filter((person) => person.date === today && person.month === currentMonth)
		.map((person) => {
			return <Birthday key={person.id} person={person} addedFunctionality={false} />;
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

			{template.length === 0 ? '' : <div className="persons">{template}</div>}
		</>
	);
}

export default BirthdaysTodayList;
