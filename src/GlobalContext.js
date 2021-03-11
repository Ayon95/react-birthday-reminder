import React from 'react';
import useFetch from './useFetch.js';
import { useState, useEffect } from 'react';

export const GlobalContext = React.createContext();
function GlobalContextProvider(props) {
	const { data, isPending, error } = useFetch('http://localhost:8000/people');
	const [people, setPeople] = useState(data);

	const today = new Date().getDate();
	const currentMonth = new Date().toLocaleString('default', { month: 'short' });

	/* update people whenever the value of people prop changes Initially the value of people will be null.
    When the data is loaded from the API, people will no longer be null.
	useEffect will call setPeople and people data will be updated with the data that was loaded.
	We are using data as a dependency here, so that whenever data changes, people state variable will be updated */
	useEffect(() => setPeople(data), [data]);
	console.log(people);

	function addPerson(person) {
		setPeople([...people, person]);
	}

	function deletePerson(id) {
		setPeople(people.filter((person) => person.id !== id));
	}

	// generating filtered list if people is not null (includes people who have birthdays coming up in 7 days)
	/* The filtering condition for upcoming birthdays is:
    1) the month has to be the same first of all
    2) then the difference between the current date and the person's birth date has to be greater than 0
    3) and the difference cannot be greater than 7 */
	const peopleUpcomingBirthdays = people?.filter(
		(person) =>
			person.month === currentMonth &&
			Number.parseFloat(person.date) - today > 0 &&
			Number.parseFloat(person.date) - today <= 7
	);

	const value = { people, isPending, error, addPerson, deletePerson, peopleUpcomingBirthdays };

	return <GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>;
}

export default GlobalContextProvider;
