import BirthdaysTodayList from './BirthdaysTodayList.js';
import AllBirthdaysList from './AllBirthdaysList.js';

const List = ({ people, currentPeople, needAllBirthdays, handleDelete }) => {
	console.log('list is rendered');
	// return filtered list component if we don't all birthdays (when displaying the list on the home page)
	return (
		<>
			{needAllBirthdays ? (
				<AllBirthdaysList currentPeople={currentPeople} handleDelete={handleDelete} />
			) : (
				<BirthdaysTodayList people={people} />
			)}
		</>
	);
};

export default List;
