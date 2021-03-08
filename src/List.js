import React from 'react';
import { ReactComponent as IconPerson } from './img/user.svg';
import { ReactComponent as IconCake } from './img/birthday-cake.svg';
import BirthdaysTodayList from './BirthdaysTodayList.js';
import AllBirthdaysList from './AllBirthdaysList.js';

const List = ({ people, needAllBirthdays }) => {
	// return filtered list component if we don't all birthdays (when displaying the list on the home page)
	return <>{needAllBirthdays ? <AllBirthdaysList people={people} /> : <BirthdaysTodayList people={people} />}</>;
};

export default List;
