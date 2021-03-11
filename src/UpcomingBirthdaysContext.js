import React from 'react';
import useFetch from './useFetch.js';
import { useState, useEffect } from 'react';

export const UpcomingBirthdaysContext = React.createContext();

function UpcomingBirthdaysContextProvider(props) {
	const today = new Date().getDate();
	const currentMonth = new Date().toLocaleString('default', { month: 'short' });
	// loading data
	const { data, isPending, error } = useFetch('http://localhost:8000/people');

	// generating filtered list if peopleList is not null (includes people who have birthdays coming up in 7 days)
	/* The filtering condition for upcoming birthdays is:
    1) the month has to be the same first of all
    2) then the difference between the current date and the person's birth date has to be greater than 0
    3) and the difference cannot be greater than 7 */
	// const [peopleFiltered, setPeopleFiltered] = useState(null);
	const peopleFiltered = data?.filter(
		(person) =>
			person.month === currentMonth &&
			Number.parseFloat(person.date) - today > 0 &&
			Number.parseFloat(person.date) - today <= 7
	);

	const value = { peopleFiltered, isPending, error };

	return <UpcomingBirthdaysContext.Provider value={value}>{props.children}</UpcomingBirthdaysContext.Provider>;
}

export default UpcomingBirthdaysContextProvider;
