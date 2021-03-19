import Birthday from './Birthday.js';

function BirthdaysTodayList({ peopleBirthdaysToday }) {
	const template = peopleBirthdaysToday.map((person) => {
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
