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

	function addPerson(person) {
		setPeople([...people, person]);
	}

	function deletePerson(id) {
		setPeople(people.filter((person) => person.id !== id));
	}

	/* this function will take the id of the person that we want to replace, and the person (with edited data) to replace with
	The new person will replace the old person. The new person will have the same id as the old person, since
	it will basically occupy the same spot in the database as the old person */
	function editPerson(id, newPerson) {
		const personToReplace = people.find((person) => person.id === id);
		const newPeopleList = [
			...people.slice(0, people.indexOf(personToReplace)),
			newPerson,
			...people.slice(people.indexOf(personToReplace) + 1),
		];
		setPeople(newPeopleList);
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

	// filtered list with people who have birthdays today
	const peopleBirthdaysToday = people?.filter(
		(person) => person.date === String(today) && person.month === currentMonth
	);
	console.log(peopleBirthdaysToday);

	const value = {
		people,
		isPending,
		error,
		addPerson,
		deletePerson,
		editPerson,
		peopleUpcomingBirthdays,
		peopleBirthdaysToday,
	};

	return <GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>;
}

export default GlobalContextProvider;
