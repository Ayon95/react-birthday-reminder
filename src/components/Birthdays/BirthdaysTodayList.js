import Birthday from './Birthday.js';

function BirthdaysTodayList({ peopleBirthdaysToday }) {
	const birthdays = peopleBirthdaysToday.map((person) => {
		return <Birthday key={person.id} person={person} addedFunctionality={false} />;
	});

	return (
		<>
			{birthdays.length === 0 ? (
				<h3 className="container__title">No Birthdays Today</h3>
			) : (
				<h3 className="container__title">
					{birthdays.length} Birthday{birthdays.length > 1 ? 's' : ''} Today
				</h3>
			)}

			{birthdays.length > 0 && <div className="persons">{birthdays}</div>}
		</>
	);
}

export default BirthdaysTodayList;
