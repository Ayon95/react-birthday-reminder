import Birthday from './Birthday.js';

function UpcomingBirthdaysList({ peopleUpcomingBirthdays }) {
	const template = peopleUpcomingBirthdays.map((person) => {
		return <Birthday key={person.id} person={person} addedFunctionality={false} />;
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
