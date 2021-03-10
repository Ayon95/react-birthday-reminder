import React from 'react';
import useFetch from './useFetch.js';
import { useState } from 'react';

const UpcomingBirthdaysContext = React.createContext();

function UpcomingBirthdaysContextProvider(props) {
	// loading data
	const { data, isPending, error } = useFetch('http://localhost:8000/people');

	const peopleUpcomingBirthdays = data.filter(
		(person) =>
			person.month === currentMonth &&
			Number.parseFloat(person.date) - today > 0 &&
			Number.parseFloat(person.date) - today <= 7
	);

	const value = { peopleUpcomingBirthdays, isPending, error };

	return <UpcomingBirthdaysContext.Provider value={value}>{props.children}</UpcomingBirthdaysContext.Provider>;
}
