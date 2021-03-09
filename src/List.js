import BirthdaysTodayList from './BirthdaysTodayList.js';
import AllBirthdaysList from './AllBirthdaysList.js';

const List = ({ people, currentPeople, needAllBirthdays }) => {
	// return filtered list component if we don't all birthdays (when displaying the list on the home page)
	return (
		<>
			{needAllBirthdays ? <AllBirthdaysList currentPeople={currentPeople} /> : <BirthdaysTodayList people={people} />}
		</>
	);
};

export default List;
